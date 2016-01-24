// -------------------------- //
//                            //
//   Scale Patterns to 100%   //
//         Vesion 1.0         //
//                            //
// -------------------------- //
// 
// A Photoshop script to change all Pattern Layer scales and Layer Style Pattern Overlay scales to 100%.
// Code from Mike Hale, Paul MR and Jacobolus, combined by David Jensen.
// 
// More discussion can be found on PS-Scripts:
// http://www.ps-scripts.com/bb/viewtopic.php?f=9&t=4875&start=0&sid=d5080e18cad91d90287d4a5c2a27657d
// 
// Place in your /Adobe Photoshop CS6/Presets/Scripts/ folder and restart Photoshop
// for the script to appear in Scripts under the File menu. 
// 

#target photoshop
app.bringToFront();

var $s, duplicateDescriptor, executeSet, getTargetLayerEffects, setPatternFillScale;

$s = function(string) {
  return app.stringIDToTypeID(string);
};

duplicateDescriptor = function(descriptor) {
  var descriptorStream, newDescriptor;
  descriptorStream = descriptor.toStream();
  newDescriptor = new ActionDescriptor;
  newDescriptor.fromStream(descriptorStream);
  return newDescriptor;
};

getTargetLayerEffects = function() {
  var containerDesc, targetLayerRef;
  targetLayerRef = new ActionReference;
  targetLayerRef.putProperty($s('property'), $s('layerEffects'));
  targetLayerRef.putEnumerated($s('layer'), $s('ordinal'), $s('targetEnum'));
  containerDesc = app.executeActionGet(targetLayerRef);
  return containerDesc.getObjectValue($s('layerEffects'));
};

executeSet = function(target, to, type) {
  var action;
  action = new ActionDescriptor;
  action.putObject($s('to'), type, to);
  action.putReference($s('target'), target);
  app.executeAction($s('set'), action, DialogModes.NO);
};

setPatternFillScale = function(scale) {
  var currentPatternFill, layer, layerEffects, newLayerEffects, newPatternFill, target;
  layerEffects = getTargetLayerEffects();
  newLayerEffects = duplicateDescriptor(layerEffects);
  currentPatternFill = layerEffects.getObjectValue($s('patternFill'));
  newPatternFill = duplicateDescriptor(currentPatternFill);
  newPatternFill.putUnitDouble($s('scale'), $s('percentUnit'), scale);
  newLayerEffects.putObject($s('patternFill'), $s('patternFill'), newPatternFill);
  layer = new ActionDescriptor;
  layer.putObject($s('layerEffects'), $s('layerFXVisible'), newLayerEffects);
  target = new ActionReference;
  target.putEnumerated($s('layer'), $s('ordinal'), $s('targetEnum'));
  executeSet(target, layer, $s('layer'));
};



app.activeDocument.suspendHistory('Set texture scale to 100%', 'main()');


 function main(){
if(documents.length == 0 || ( app.activeDocument.layers.length == 1 && app.activeDocument.activeLayer.isBackgroundLayer ) ) return;
 selectAllLayers();
 var selLayers = getSelectedLayersIdx();
for(var a in selLayers){
 setPatternTo100(Number(selLayers[a]));
     }
 }

function setPatternTo100(idx){
// get pattern overly style from active layer
var ref = new ActionReference();
makeActiveByIndex( idx );
ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );

var desc = executeActionGet(ref);

try{
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
var patternDesc = executeActionGet(ref).getList(charIDToTypeID('Adjs')).getObjectValue(0).getObjectValue(charIDToTypeID( "Ptrn"));
var patternName = patternDesc.getString(charIDToTypeID('Nm  '));
var patternID = patternDesc.getString(charIDToTypeID('Idnt'));
var desc0 = new ActionDescriptor();
var ref = new ActionReference();
ref.putEnumerated( stringIDToTypeID('contentLayer'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
desc0.putReference( charIDToTypeID('null'), ref );
var desc1 = new ActionDescriptor();
desc1.putUnitDouble( charIDToTypeID('Scl '), charIDToTypeID('#Prc'), 100 );
var desc2 = new ActionDescriptor();
desc2.putString( charIDToTypeID('Nm  '), patternName );
desc2.putString( charIDToTypeID('Idnt'), patternID );
desc1.putObject( charIDToTypeID('Ptrn'), charIDToTypeID('Ptrn'), desc2 );
desc0.putObject( charIDToTypeID('T   '), stringIDToTypeID('patternLayer'), desc1 );
executeAction( charIDToTypeID('setd'), desc0, DialogModes.NO );
}catch(err){}


try{
    setPatternFillScale(100)
}catch(err){
    try{
        backupMethod()
        }
    catch(err){}
}
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

function backupMethod(){
    if(desc.hasKey(charIDToTypeID('Lefx'))&&desc.getObjectValue(charIDToTypeID('Lefx')).hasKey(stringIDToTypeID("patternFill"))){
       var layerIndex = desc.getInteger(charIDToTypeID('ItmI'));
       desc = desc.getObjectValue(charIDToTypeID('Lefx')).getObjectValue(stringIDToTypeID("patternFill"));
       var patternStyleObject = {};
       patternStyleObject.enabled = desc.getBoolean(charIDToTypeID('enab'));
       patternStyleObject.mode = desc.getEnumerationValue(charIDToTypeID('Md  '));
       patternStyleObject.opacity = desc.getUnitDoubleValue(charIDToTypeID('Opct'));
       patternStyleObject.align = desc.getBoolean(charIDToTypeID('Algn'));
       patternStyleObject.name = desc.getObjectValue(charIDToTypeID('Ptrn')).getString(charIDToTypeID('Nm  '));
       patternStyleObject.id = desc.getObjectValue(charIDToTypeID('Ptrn')).getString(charIDToTypeID('Idnt'));
       patternStyleObject.offset = [desc.getObjectValue(stringIDToTypeID("phase")).getDouble(charIDToTypeID('Hrzn')),
                                  desc.getObjectValue(stringIDToTypeID("phase")).getDouble(charIDToTypeID('Vrtc'))];
       // delete existing pattern overlay style
       var desc = new ActionDescriptor();
       var ref = new ActionReference();
       ref.putClass( stringIDToTypeID('patternFill') );
       ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
       desc.putReference( charIDToTypeID('null'), ref );
       executeAction( charIDToTypeID('dsfx'), desc, DialogModes.NO );
       // create a new layer
       var tempLayer = app.activeDocument.artLayers.add();
       // create new style from data and reset scale to 100
       var desc = new ActionDescriptor()
       var ref = new ActionReference();
       ref.putProperty( charIDToTypeID('Prpr'), charIDToTypeID('Lefx') );
       ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
       desc.putReference( charIDToTypeID('null'), ref );
       var desc1 = new ActionDescriptor();
       desc1.putUnitDouble( charIDToTypeID('Scl '), charIDToTypeID('#Prc'), 416.666667 );
       var desc2 = new ActionDescriptor();
       desc2.putBoolean( charIDToTypeID('enab'), patternStyleObject.enabled );
       desc2.putEnumerated( charIDToTypeID('Md  '), charIDToTypeID('BlnM'), patternStyleObject.mode );
       desc2.putUnitDouble( charIDToTypeID('Opct'), charIDToTypeID('#Prc'), patternStyleObject.opacity );
       var desc3 = new ActionDescriptor();
       desc3.putString( charIDToTypeID('Nm  '), patternStyleObject.name );
       desc3.putString( charIDToTypeID('Idnt'), patternStyleObject.id );
       desc2.putObject( charIDToTypeID('Ptrn'), charIDToTypeID('Ptrn'), desc3 );
       desc2.putUnitDouble( charIDToTypeID('Scl '), charIDToTypeID('#Prc'), 100 );
       desc2.putBoolean( charIDToTypeID('Algn'), patternStyleObject.align );
       var desc4 = new ActionDescriptor();
       desc4.putDouble( charIDToTypeID('Hrzn'), patternStyleObject.offset[0] );
       desc4.putDouble( charIDToTypeID('Vrtc'), patternStyleObject.offset[1] );
       desc2.putObject( stringIDToTypeID('phase'), charIDToTypeID('Pnt '), desc4 );
       desc1.putObject( stringIDToTypeID('patternFill'), stringIDToTypeID('patternFill'), desc2 );
       desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lefx'), desc1 );
       executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
       // move edited style back to original layer
       var desc = new ActionDescriptor();//move
       var ref = new ActionReference();
       ref.putClass( stringIDToTypeID('patternFill') );
       ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
       desc.putReference( charIDToTypeID('null'), ref );
       var ref1 = new ActionReference();
       ref1.putIndex( charIDToTypeID('Lyr '), layerIndex-1 );
       desc.putReference( charIDToTypeID('T   '), ref1 );
       executeAction( charIDToTypeID('move'), desc, DialogModes.NO );
       // remove temp layer
       tempLayer.remove();
   }
}
