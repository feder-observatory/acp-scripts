import math
import re
import telnetlib
from time import sleep
from datetime import datetime


HOME_POS = 342.00
LOG_TO = "dome_wrangle_log.txt"


def print_and_log(message):
    print(message)
    with open(LOG_TO, "a") as f:
        f.write(message + "\n")


def wrangle_dome():
    tn = telnetlib.Telnet("199.17.126.17", 2902)
    last_position = -999
    current_pos = -999
    at_home = False
    while True:
        alf = "?\n"
        tn.write(alf.encode())
        sleep(0.25)
        moo = tn.read_very_eager()
        # print(moo)
        foo = re.search(r"([A-Za-z]+) (.+)\r\n", moo.decode())
        if foo:
            current_pos = float(foo.group(2))
            at_home = foo.group(1) == "Home"
        else:
            message = f"{datetime.now().isoformat()}\tNO MATCH"
            print_and_log(message)
            continue
        # print(f"{current_pos=}")
        if current_pos == HOME_POS and not at_home and math.fabs(last_position - current_pos) > 3:
            print_and_log(f"{datetime.now().isoformat()} =======> RESETTING ENCODER TO {last_position}")
            reset_command = f"{last_position:.2f} RE\n"
            # print(reset_command)
            tn.write(reset_command.encode())
            sleep(0.25)
            # Now make sure the rest actually sticks
            response = ""
            last_good = f"{last_position:.2f}"
            while last_good not in response:
                print_and_log(f"{datetime.now().isoformat()}\t ====> Checking dome reset")
                tn.write(alf.encode())
                sleep(0.25)
                response = tn.read_until(b"D2 SHUT\r\n>").decode()
                print_and_log(f"{datetime.now().isoformat()}\t\t{response=}")
           
            # Reset current position to actual current position
            current_pos = last_position
            #break
        # elif at_home:
        #     print_and_log(f"{datetime.now().isoformat()}\t at Home position is {current_pos}")

        last_position = current_pos

if __name__ == "__main__":
    while True:
        try:
            wrangle_dome()
        except EOFError as err:
            print_and_log(str(err))