//ALNITAK cover 1 labeled as "alnitak" must open first. located on COMM port 3
//CoverState is an ASCOM Enum, the values are
// NotPresent 0 
// Closed 1 
// Moving 2 
// Open 3 
// Unknown 4 
// Error 5 

var COVER_CLOSED = 1;
var COVER_OPEN = 3;
var COVER_ERROR = 5;

function open_one_cover(cover) {
    cover.OpenCover();
    while(cover.CoverState != COVER_OPEN){
        Util.WaitForMilliseconds(1000);
        Util.Console.PrintLine('    Still opening');
        if(cover.CoverState == COVER_ERROR){
            Util.Console.PrintLine("-----> Cover did not open");
            throw new Error("Cover failed to open");
        }
    }
}

function open_both_covers() {
    //Connect to first cover located on COM3
    var outerCover = new ActiveXObject("ASCOM.OptecAlnitak.CoverCalibrator");
    outerCover.Connected = true;
    
    //Conect to the second cover located on COM4
    var innerCover = new ActiveXObject("ASCOM.OptecAlnitak1.CoverCalibrator");
    innerCover.Connected = true;
    
    //Open the  first cover
    Util.Console.PrintLine("Opening Cover 1.");
    open_one_cover(outerCover);
 
    Util.Console.PrintLine("Cover 1 has opened.");
    
    //Opening Cover 2
    Util.Console.PrintLine("Opening Cover 2.");
    open_one_cover(innerCover);
    Util.Console.PrintLine("Cover 2 has opened.");
}

function main() {
    open_both_covers();
}