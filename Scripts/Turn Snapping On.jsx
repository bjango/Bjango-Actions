// -------------------------- //
//                            //
//      Turn Snapping On      //
//         Vesion 1.0         //
//                            //
// -------------------------- //
// 
// A Photoshop script to turn on Snap Vector Tools and Transforms to Pixel Grid,
// letting you assign a keyboard shortcut to snapping on.
// Works well with the Turn Snapping Off script. Written by @marcedwards.
// 
// Place in your /Adobe Photoshop CS6/Presets/Scripts/ folder and restart Photoshop
// for the script to appear in Scripts under the File menu. 
// 

#target photoshop
app.bringToFront();

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idGnrP = charIDToTypeID( "GnrP" );
        ref2.putProperty( idPrpr, idGnrP );
        var idcapp = charIDToTypeID( "capp" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref2.putEnumerated( idcapp, idOrdn, idTrgt );
    desc3.putReference( idnull, ref2 );
    var idT = charIDToTypeID( "T   " );
        var desc4 = new ActionDescriptor();
        var idtransformsSnapToPixels = stringIDToTypeID( "transformsSnapToPixels" );
        desc4.putBoolean( idtransformsSnapToPixels, true );
        var idvectorSelectionModifiesLayerSelection = stringIDToTypeID( "vectorSelectionModifiesLayerSelection" );
        desc4.putBoolean( idvectorSelectionModifiesLayerSelection, true );
    var idGnrP = charIDToTypeID( "GnrP" );
    desc3.putObject( idT, idGnrP, desc4 );
executeAction( idsetd, desc3, DialogModes.NO );
