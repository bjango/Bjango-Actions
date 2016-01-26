// ----------------------------- //
//                               //
//   Scale Mask Feather by 66.6% //
//           Vesion 1.0          //
//                               //
// ----------------------------- //
// 
// A Photoshop script to scale all Mask Feathering by 150%.
// By David Jensen.
// 
// Place in your /Applications/Adobe Photoshop CC 2015/Presets/Scripts/ folder and restart Photoshop
// for the script to appear in Scripts under the File menu. 
// 

#target photoshop
scaleFactor=0.6667
app.bringToFront();
docRef=activeDocument
if(docRef.layers.length>1 || docRef.activeLayer.isBackgroundLayer==false){
    docRef.suspendHistory('Scale Mask Feather 50%', 'main()');
}
//main();
 function main(){
 if(!documents.length) return;
 selectAllLayers();
 var selLayers = getSelectedLayersIdx();
for(var a in selLayers){
 maskFeather(Number(selLayers[a]));
     }
 }

function maskFeather(idx){
var ref = new ActionReference();
makeActiveByIndex( idx );
ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );

var desc = executeActionGet(ref);
    if (docRef.activeLayer.kind == undefined){
        try{
            var idMrgtwo = charIDToTypeID( "Mrg2" );
            var desc197 = new ActionDescriptor();
            var idAply = charIDToTypeID( "Aply" );
            desc197.putBoolean( idAply, true );
            executeAction( idMrgtwo, desc197, DialogModes.NO );
            
            vMF=parseFloat(activeDocument.activeLayer.vectorMaskFeather)
            lMF=parseFloat(activeDocument.activeLayer.layerMaskFeather)  
            
            executeAction( charIDToTypeID( "undo" ), undefined, DialogModes.NO );
            
            setVMF(vMF * scaleFactor)
            setLMF(lMF * scaleFactor)
        }catch(err){}
     
    }else{
        vMF=parseFloat(activeDocument.activeLayer.vectorMaskFeather)
        lMF=parseFloat(activeDocument.activeLayer.layerMaskFeather)
        
        setVMF(vMF * scaleFactor)
        setLMF(lMF * scaleFactor)
    }
}
function setVMF(featherSize){
    try{
        var idsetd = charIDToTypeID( "setd" );
        var desc219 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref198 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref198.putEnumerated( idLyr, idOrdn, idTrgt );
        desc219.putReference( idnull, ref198 );
        var idT = charIDToTypeID( "T   " );
        var desc220 = new ActionDescriptor();
        var idvectorMaskFeather = stringIDToTypeID( "vectorMaskFeather" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc220.putUnitDouble( idvectorMaskFeather, idPxl, featherSize );
        var idLyr = charIDToTypeID( "Lyr " );
        desc219.putObject( idT, idLyr, desc220 );
        executeAction( idsetd, desc219, DialogModes.NO );
    }catch(err){}
}
function setLMF(featherSize){
    try{
        var idsetd = charIDToTypeID( "setd" );
        var desc221 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref199 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref199.putEnumerated( idLyr, idOrdn, idTrgt );
        desc221.putReference( idnull, ref199 );
        var idT = charIDToTypeID( "T   " );
        var desc222 = new ActionDescriptor();
        var iduserMaskFeather = stringIDToTypeID( "userMaskFeather" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc222.putUnitDouble( iduserMaskFeather, idPxl, featherSize );
        var idLyr = charIDToTypeID( "Lyr " );
        desc221.putObject( idT, idLyr, desc222 );
        executeAction( idsetd, desc221, DialogModes.NO );
    }catch(err){}
}

function makeActiveByIndex( idx ){ 
    var desc = new ActionDescriptor(); 
      var ref = new ActionReference(); 
      ref.putIndex(charIDToTypeID( "Lyr " ), idx) 
      desc.putReference( charIDToTypeID( "null" ), ref ); 
      desc.putBoolean( charIDToTypeID( "MkVs" ), false ); 
   executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO ); 
}; 
function selectAllLayers() {
    var desc29 = new ActionDescriptor();
        var ref23 = new ActionReference();
        ref23.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc29.putReference( charIDToTypeID('null'), ref23 );
    executeAction( stringIDToTypeID('selectAllLayers'), desc29, DialogModes.NO );
}
function getSelectedLayersIdx(){
 	var selectedLayers = new Array;
 	var ref = new ActionReference();
 	ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
 	var desc = executeActionGet(ref);
 	if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){
 		desc = desc.getList( stringIDToTypeID( 'targetLayers' ));
 		 var c = desc.count 
 		 var selectedLayers = new Array();
 		 for(var i=0;i<c;i++){
 			try{ 
 				activeDocument.backgroundLayer;
 				selectedLayers.push(  desc.getReference( i ).getIndex() );
 			}catch(e){
 				selectedLayers.push(  desc.getReference( i ).getIndex()+1 );
 			}
 		 }
 	 }else{
 		var ref = new ActionReference(); 
 		ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); 
 		ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
 		try{ 
 			activeDocument.backgroundLayer;
 			selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);
 		}catch(e){
 			selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));
 		}
 	}
 	return selectedLayers;
};


