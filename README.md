# ACP and other scripts for Feder Observatory

This repository contains scripts used as part of running Feder Observatory. The place where each goes on the observatory computer is listed, along with the file name and purpose, below.

## Files

### ACP-related files

+ `CloserCover.js`
    + **Purpose**: This script closes both dust flaps on the end of telescope. The flaps need to be closed in a specific order because there is a lip on one flap that is  meant to cover the edge of the other flap.
    + **Where to put it on the control computer**: It belongs in the folder `C:\Program Files (x86)\ACP Obs Control\Scripts` (though check the ACP documentation if things are not working).
+ `OpenCover.js`
    + **Purpose**: This script opens both dust flaps on the end of telescope. The flaps need to be opened in a specific order because there is a lip on one flap that is  meant to cover the edge of the other flap.
    + **Where to put it on the control computer**: It belongs in the folder `C:\Program Files (x86)\ACP Obs Control\Scripts` (though check the ACP documentation if things are not working).
+ `UserActions.wcs`
    + **Purpose**: This is the means by which ACP actions can be customized. We have not customized most things. The added/modified items are listed below.
        + *Added items*: Unfortunately, the stuff for opening and closing the covers must be copy/pasted into this. There is no way to "import" files like you can in Python. Look for this line for the start of these functions: `// OUR EXTRA BONUS STUFF, COPIED FROM OTHER FILES INTO HERE`
            + `open_one_cover`
            + `open_both_covers`
            + `close_one_cover`
            + `close_both_covers`

        + *Modified items*: The items are below are functions called by ACP, e.g. before acquiring an image or before shutting down. Custom content here allows adding steps to set up/shut down, etc.
            + `Shutdown`: We close both covers and slew to (roughly) zenith.
            + `TargetStart`: For dawn/dusk flats or lights we open the flaps (which does nothing if they are already open) and we also open the dome.
            + `TargetEnd`: Not sure what was intended here, but out current modifications are clearly a debugging effort.
    + **Where to put it on the control computer**: It belongs in the folder `C:\Program Files (x86)\ACP Obs Control` (though check the ACP documentation if things are not working).
+ `CommonTasks.tiddler`
    + **Purpose**: This "tiddler" adds links to the ACP web page for opening and closing the cover and for slewing to zenith. A "tiddler" is the ACP author's name for these little HTML code snippets that get embedded into the ACP web site.
    + **Where to put it on the control computer**: Really the only way to get this into the right place is to run ACP (double-click on the desktop icon) and click the "Use Web Browser" button. When the web page opens, open up the "Toolbox" area in the left column, then click on "Authoring System". Make a new tiddler; this one was called "Common Tasks." Paste the content of `CommonTasks.tiddler` in and save it. Then click "save to web" in the upper right column for it to actually be available.
        + To add it to the default landing page for everyone, edit the "StartupItems" tiddler (may have to search for it on the right?) and add `[[CommonTasks]]`. Again, save it and "save to web" for the changes to take effect.

### Other

At the moment there is only one other script used for running things, and it is really only useful when the temperature is within 10F or so of 32F. The current dome encoder stops working completely below about 20F, and works only intermittently until it gets up to roughly 40F. The file below tries to handle that.

+ `dome_wrangler.py`
    + **Purpose**: Check the dome encoder reading every 1/4 second or so and, if the reading suddenly jumps to 342 (the home position) then set it back to whatever it was before it jumped. Not bullet-proof, but works adequately.
    + **Where to put it on the control computer**: Anywhere, though it currently lives in the `Documents` folder so it is easy to navigate to.
    + **How to run it**: You must have Remote Desktop access to the observatory computer to run this. Open the miniforge command prompt, cd into `Documents` and type `python dome_wrangler.py`. Don't forget to stop it running at the end of the run (hitting Ctrl-C should stop it or just close the window).
