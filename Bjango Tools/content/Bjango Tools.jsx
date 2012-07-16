var log = getLogFile();
var assetsPath = null;

//---------------------------
function onPanelInit(){}

//---------------------------
function onPanelClose(){}

//---------------------------
function onPanelHide(){}

//---------------------------
function onPanelShow(){}

function supportSwfInHtml() 
{
	var appBitMode = 64;
  	try { 
           var ref = new ActionReference();
           ref.putProperty( charIDToTypeID( 'Prpr' ), charIDToTypeID( 'Sz  ' ) );
           ref.putEnumerated( charIDToTypeID( 'capp' ),  charIDToTypeID( 'Ordn' ), charIDToTypeID( 'Trgt' ) );
           var desc = executeActionGet( ref );
           appBitMode = desc.getDouble( charIDToTypeID( 'Sz  ' ) );
  	}
  	catch(e) {
           // older versions like CS4 will not have this key
           // running this on CS4 in 64 bit mode will be wrong for example
  	}
  	var xml = "<object>";
  	xml += PropertyToXML(appBitMode==32?"true":"false", "support");
  	xml += "</object>"
  	return xml;
}

//---------------------------
function getShowToolTips()
{
    var s = '<object>';
    var result = 'true';
    if (!app.preferences.showToolTips)
    {
        result = 'false';
    }
    s += PropertyToXML(result, 'showToolTips');
    s += '</object>';
    writelog('getShowToolTips -' + s);
    return s;
}
//---------------------------
function ps_invoke_chc(url)
{
    var ad = new ActionDescriptor();
    ad.putString(stringIDToTypeID("helpID"), url); 
    executeAction(stringIDToTypeID("helpLauncher"), ad, DialogModes.NO);
}

//---------------------------
function invoke_script_file(filepath) {
  	  var strXMLResult = '<object><property id="bSuccess">';

	try {
		strXMLResult += '<true/></property>';
		strXMLResult += '<property id="strError"><string></string></property>';
        var scriptFile =  decode (filepath);
        scriptFile = translatePath (scriptFile);
        writelog("invoke script file " + scriptFile);
		var f = new File(scriptFile);
	    if (f.exists) {
			$.evalFile(f, 300000);
	    } else {
	  	alert("File does not exist: " + scriptFile);
	    }
	}catch(err){
		alert(err);
		strXMLResult = '<object><property id="bSuccess">';
		strXMLResult += '<false/></property>';
		strXMlResult += '<property id="strError"><string></string></property>';
	}
	strXMLResult += '</object>';
	return strXMLResult;
};

//---------------------------
function invoke_script(script)
{
    var strXMLResult = '<object><property id="bSuccess">';
    try
    {  
        strXMLResult += '<true/></property>';
        strXMLResult += '<property id="strError"><string></string></property>';
        writelog("-----------------------");
        var code = decode(script);
        writelog(code);
        writelog("-----------------------");        
        eval(code);
    }
    catch(err)
    {
        alert(err);
        strXMLResult = '<object><property id="bSuccess">';
        strXMLResult += '<false/></property>';
        strXMlResult += '<property id="strError"><string></string></property>';
    }
    strXMLResult += '</object>';
    return strXMLResult;
}


//---------------------------
function ps_invoke_script(script)
{
    //Call invoke_script will cause problem, so have to copy it here
    var strXMLResult = '<object><property id="bSuccess">';
    try
    {  
        strXMLResult += '<true/></property>';
        strXMLResult += '<property id="strError"><string></string></property>';
        writelog("-----------------------");
        var code = decode(script);
        writelog(code);
        writelog("-----------------------");        
        eval(code);
    }
    catch(err)
    {
        alert(err);
        strXMLResult = '<object><property id="bSuccess">';
        strXMLResult += '<false/></property>';
        strXMlResult += '<property id="strError"><string></string></property>';
    }
    strXMLResult += '</object>';
    return strXMLResult;
}

//---------------------------
function ps_invoke_action(actionSet, actionName)
{
    var action = decode(actionName);
    var group = decode(actionSet);
    writelog("invoke action " + action + " " + group);
    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation"); 
    try 
    {
        app.doAction(action, group);
    } 
    catch(e)
    {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;} 
        else
        {
            alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));
        }    
    }
}
//---------------------------
function ps_invoke_scritps_menu_item(item)
{
    var idAdobeScriptAutomationScripts = stringIDToTypeID( "AdobeScriptAutomation Scripts" );
    var desc2 = new ActionDescriptor();
    var idjsNm = charIDToTypeID( "jsNm" );
    desc2.putString( idjsNm, item ); // string for name of script in menu
    var idjsMs = charIDToTypeID( "jsMs" );
    desc2.putString( idjsMs, "undefined" );
    executeAction( idAdobeScriptAutomationScripts, desc2, DialogModes.NO );
}

//---------------------------
function invoke_script(code)
{
    ps_invoke_script(code);
}

//---------------------------
function invoke_feature_by_id(id)
{
    //alert("invoke feature by id " + id);
    $.evalFile(assetsPath + "/bundles/PHSP-13/feature.jsx");
    eval(id + "()");
}

//---------------------------
function getHostLocale()
{ 
    writelog("get host locale " + $.locale);
    return '<object><property id="result"><string>' + $.locale + '</string></property></object>';
}

//---------------------------
function getHostPath()
{ 
    var f = new File(app.path);
    var path = f.fsName;
    writelog("get host path " + path);
    return '<object><property id="result"><string>' + path + '</string></property></object>';
}

//---------------------------
function translatePath(path)
{
   //handle relative path
    var f = new File(path)
    {
        if (!f.exists)
        {
            if (assetsPath == null)
            {
                assetsPath = getAssetsPath();
             }
            f = new File(assetsPath + "/" + path);
            if (f.exists)
            {
                return f.fsName;
             }
        }
    }
    return path;
}

//---------------------------
function setExtensionID(id)
{
    extensionID = id;
}

//---------------------------
function setAssetsPath(path)
{
    assetsPath = path;
}

//---------------------------
function getAssetsPath()
{
    var mypath = $.fileName;
    writelog("my path =" + mypath);
    var myfile = new File(mypath);
    var folder = myfile.parent;
    var name = myfile.name;
    var index = name.lastIndexOf(".jsx");
    var name = name.substr(0, index);
    return folder.fsName + "/" + name + ".assets";
}

//---------------------------
function decode(s)
{
		var code = s.replace(/#0D;/g, "\n");
		code = code.replace(/#0A;/g, "\r");
		code = code.replace(/#22;/g, "\"");
		code = code.replace(/#27;/g, "'");
		code = code.replace(/#23;/g, "#");
        return code;
}


//---------------------------
function writelog(message)
{
	log.open("a");
	log.writeln(message);
	log.close();
}

//---------------------------
function getLogFile() {
		if (IsMacintoshOS ())
		{
			var f = new File("~/Library/Logs/Adobe/PS13_panel.log");
			return f;
		} else{
			var f = new File(Folder.userData + "/PS13_panel.log");
			return f;
		}
}

//---------------------------
function IsMacintoshOS() {
	if ( $.os.search(/macintosh/i) != -1 ) {
		return true;
	} else {
		return false;
	}
}

//---------------------------
function IsWindowsOS() {
	if ( $.os.search(/windows/i) != -1 ) {
		return true;
	} else {
		return false;
	}
}

//---------------------------
function addListeners()
{
    writelog("add listeners");
}

//---------------------------
function removeListeners()
{
    writelog("remove listeners");
}

//---------------------------
function resolveCfgFilePath()
{
	if (IsMacintoshOS ())
	{
		var f = "file://~/Library/Preferences/Macromedia/Flash Player/#Security/FlashPlayerTrust/Configurator.cfg";
		return f;
	} else {
		var f = "file://" + Folder.userData + "/Macromedia/Flash Player/#Security/FlashPlayerTrust/Configurator.cfg";
		return f;
	}
}

//---------------------------
function addSecurityEntry(path)
{
	writelog("call addSecuirytEntry");
	//Try to add this folder to flash player trusted cfg file
	var cfgpath = resolveCfgFilePath ();
	writelog("cfgpath = " + cfgpath);
	var f = new File(cfgpath);
	if (!f.exists)
		f.open("w");
	else 
		f.open("a");
	//var mypath = getMyPath();
	var mypath = path;
	writelog("resolve path is " + mypath);
	f.writeln("\r\n" + mypath);
	f.close();
}

//---------------------------
function checkSecurityEntry(path)
{
	writelog("call checkSecuirytEntry");
	//Try to add this folder to flash player trusted cfg file
	var cfgpath = resolveCfgFilePath ();
	writelog("cfgpath = " + cfgpath);
	var f = new File(cfgpath);
	var result = '<object><property id="result"><string>false</string></property></object>';
	if (f.exists)
	{
		f.open("r");
		while (!f.eof)
		{
			var s = f.readln();
			if (s!=null)
			{
				if (s == path)
				{
						result = '<object><property id="result"><string>true</string></property></object>';
						break;
				}
			}
		}
		f.close();
	}
	return result;
}

//---------------------------
var getFeatureFilePath = function() 
{
	var appFile = new File(app.path);
	var prefix = "file://";
	if (IsWindowsOS())
	{ prefix = "file:///"; }
	var path = prefix + appFile.fsName;
	path = path + "/Locales/";	
	path += $.locale + "/Support Files/Feature Help/featureSearch.xml";
	writelog ("getFeatureFilePath " + path);
	var str = '<object><property id="path"><string>' + 
				path + '</string></property></object>';
	return str;
}

//---------------------------
function whatTool() {
	var ref = new ActionReference();
	ref.putProperty( charIDToTypeID( 'Prpr' ), charIDToTypeID( 'Tool' ) );
	ref.putEnumerated( charIDToTypeID( 'capp' ),  charIDToTypeID( 'Ordn' ), charIDToTypeID( 'Trgt' ) );
	var desc = executeActionGet( ref );
	var theTool = desc.getEnumerationType( charIDToTypeID( 'Tool' ) );
	var s = '<object>';
	var result = typeIDToStringID( theTool );
	s += PropertyToXML(result, 'tool');
	s += '</object>';
	return s;
}

//---------------------------
function getToolID(descID)
{
    try {
        var xmlResult = '<object><property id="bSuccess">';
        try
        {  
            xmlResult += '<true/></property>';
            var charID  = getToolCharStringID(descID);
            xmlResult += '<property id="charID"><string>' + 
                charID + '</string></property>';
        }
        catch(err)
        {
            writelog ("error:" + err);
            xmlResult = '<object><property id="bSuccess">';
            xmlResult += '<false/></property>';
            xmlResult += '<property id="strError"><string>' + err + '</string></property>';
        }
        xmlResult += '</object>';
        writelog("result:" + xmlResult);
        return xmlResult;
    }catch(err){
        writelog ("error:" + err);
    }

}


//---------------------------
function getToolCharStringID(indescIDFromSWF)
{
    try {
        //convert the string from SWF to a number
        var id = Number(indescIDFromSWF); 
        writelog("id:" + id);
        var desc = new ActionDescriptor();
        desc.fromID(id);
        var idNull = charIDToTypeID('null');
        var ref = desc.getReference(idNull);
        var toolID = ref.getDesiredClass();
        writelog("toolID:" + toolID);
        //use this to compare against spotHealingBrushTool
        var stringID = typeIDToStringID(toolID); 
        writelog("stringID:" + stringID);
        //use this to compare against other tool codes
        var charID = typeIDToCharID(toolID); 
        writelog("charID:" + charID);
        return (charID!=null && charID.length > 0) ? charID : stringID;;
    }catch(err){
        writelog ("error:" + err);
    }
}

// convert a local type to something that can go back to SWF
function PropertyToXML(inProperty, inID) {
    var t = typeof inProperty;
    var s = '<property id="' + inID + '">';
    switch (t) {
        case "number":
            s += '<number>' + inProperty.toString() + '</number>';
            break;
        case "boolean":
            s += '<' + inProperty.toString() + '/>';
            break;
        case "string":
            s += '<string>' + inProperty.toString() + '</string>';
            break;
        // TODO figure this out
        case "object":
            //s += '<object>';
			//for (var i in inProperty) {
			//	s += PropertyToXML(inProperty[i], i.toString());
			//}
			//s += '</object>';
            break;
        case "undefined":
            s += '<string>undefined</string>';
            break;
        default:
            alert('unknown type not supported: ' + t);
            break;
    }
    s += '</property>';
    return s;
}

// WARNING: inString must be valid XML
// TODO: should I do that now, what about on the swf end ?
function StringToXML(inString) {
    var s = '<object>';
    s += PropertyToXML(0, "error");
    s += PropertyToXML(inString, "message");
    s += '</object>';
    return s;
}

// inError is a JSX error from a catch(e) 
function ErrorToXML(inError) {
    var s = '<object>';
    s += PropertyToXML(inError.number, "error");
    s += PropertyToXML(inError.message, "message");
    s += PropertyToXML(inError.line, "line");
    s += PropertyToXML(inError.fileName, "fileName");
    s += '</object>';
    return s;
}