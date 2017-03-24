


var xmlStart = '<xml xmlns="http://www.w3.org/1999/xhtml">';

var multilineBlockXML = '<block type="multi_text" id="[multiLineBlockID]" x="15" y="20"><mutation items="[#]"></mutation>';
var textBlock = '<value name="ADD[#]"><block type="text" id="[blockID]"><field name="TEXT">[value]</field></block></value>'
var itemBlock = '<value name="ADD[#]"><block type="variables_get" id="[blockID]"><field name="VAR">[value]</field></block></value>'
var newlineBlock = '<value name="ADD[#]"><block type="text_newline" id="[blockID]"></block></value>';
// Generate a multiline block, depending on the text being entered.
function generateMultiLineBlockXML(text){

    var xml = xmlStart;

    var parts = splitInVariableChunks(text).filter(p => p != null && p != "");
    xml += multilineBlockXML.replace("[multiLineBlockID]","1").replace("[#]",parts.length);
    for(var i = 0; i < parts.length; i++){
        // figure out which block type we need.
        var token = parts[i];
        var partXML = "";
        if(token.startsWith("_")){ // variable
            partXML = itemBlock;
        } else if(token.match(/[\n\r]/)){ // newline
            partXML = newlineBlock;
        } else { // normal text
            partXML = textBlock;
        }
        var value = parts[i].startsWith("_") ? parts[i].substring(1) : parts[i];
        partXML = partXML.replace("[#]",i).replace("[blockID]",Blockly.utils.genUid()).replace("[value]",value);
        xml += partXML;
    }

    xml += '</block></xml>';
    return xml;
}

/**
 * Edit a multiline text block. We have the parent ID (multilineblock) as well as the text to be entered here.
 * @param parentBlockID
 * @param text
 */
function editMultiLineTextXML(currentWorkspaceXML, parentBlockID, text){
    // need to find out how to replace the correct XML part.

    var multiLineBlockXML = generateMultiLineBlockXML(text);
    // now find out which part to replace..

    Blockly.utils.genUid();


}

// method to split the text in chunks, based on DCG variables, e.g: How is _name doing? -> [How is,_name, doing]
function splitInVariableChunks(text){
    var chunks = text.split(/(_[aA-zZ|0-9]*)|([\n\r])/); // split on DCG variables.
    return chunks;
}

