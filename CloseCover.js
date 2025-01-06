//ALNITAK cover 1 labeled as "alnitak" must open first. located on COMM port 3
//CoverState is and ASCOM Enum, the values are
// NotPresent 0 
// Closed 1 
// Moving 2 
// Open 3 
// Unknown 4 
// Error 5 

var COVER_CLOSED = 1;
var COVER_OPEN = 3;
var COVER_ERROR = 5;

function close_one_cover(cover) {
    cover.CloseCover();
    while(cover.CoverState != COVER_CLOSED){
        Util.WaitForMilliseconds(1000);
        Util.Console.PrintLine('    Still closing');
        if(cover.CoverState == COVER_ERROR){
            Util.Console.PrintLine("-----> Cover did not close");
            throw new Error("Cover failed to close");
        }
    }
}

function close_both_covers()
{
    //Connect to first cover located on COM3
    var outerCover = new ActiveXObject("ASCOM.OptecAlnitak.CoverCalibrator");
    outerCover.Connected = true;
    
    //Conect to the second cover located on COM4
    var innerCover = new ActiveXObject("ASCOM.OptecAlnitak1.CoverCalibrator");
    innerCover.Connected = true;
    
    //Close the  second (inner) cover... this one must be closed first.
    Util.Console.PrintLine("Closing Cover 2.");
    close_one_cover(innerCover);

    Util.Console.PrintLine("Cover 2 has closed.");
    
    //Closing Cover 1
    Util.Console.PrintLine("Closing Cover 1.");
    close_one_cover(outerCover);

    Util.Console.PrintLine("Cover 1 has closed.");
}

function main() {
    close_both_covers();
}