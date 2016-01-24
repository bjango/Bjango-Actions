// -------------------------- //
//                            //
//      Turn Snapping Off     //
//         Vesion 1.0         //
//                            //
// -------------------------- //
// 
// A Photoshop script to turn on Snap Vector Tools and Transforms to Pixel Grid,
// letting you assign a keyboard shortcut to snapping on.
// Works well with the Turn Snapping On script. Written by @marcedwards.
// 
// Place in your /Adobe Photoshop CS6/Presets/Scripts/ folder and restart Photoshop
// for the script to appear in Scripts under the File menu. 
// 

#target photoshop
app.bringToFront();

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref1 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idGnrP = charIDToTypeID( "GnrP" );
        ref1.putProperty( idPrpr, idGnrP );
        var idcapp = charIDToTypeID( "capp" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref1.putEnumerated( idcapp, idOrdn, idTrgt );
    desc1.putReference( idnull, ref1 );
    var idT = charIDToTypeID( "T   " );
        var desc2 = new ActionDescriptor();
        var idtransformsSnapToPixels = stringIDToTypeID( "transformsSnapToPixels" );
        desc2.putBoolean( idtransformsSnapToPixels, false );
        var idvectorSelectionModifiesLayerSelection = stringIDToTypeID( "vectorSelectionModifiesLayerSelection" );
        desc2.putBoolean( idvectorSelectionModifiesLayerSelection, true );
    var idGnrP = charIDToTypeID( "GnrP" );
    desc1.putObject( idT, idGnrP, desc2 );
executeAction( idsetd, desc1, DialogModes.NO );
