var xmlStart = '<xml xmlns="http://www.w3.org/1999/xhtml">';

var multilineBlockXML = '<block type="multi_text" id="[multiLineBlockID]" x="15" y="20"><mutation items="[#]"></mutation>';
var textBlock = '<value name="ADD[#]"><block type="text" id="[blockID]"><field name="TEXT">[value]</field></block></value>'
var itemBlock = '<value name="ADD[#]"><block type="variables_get" id="[blockID]"><field name="VAR">[value]</field></block></value>'

// Generate a multiline block, depending on the text being entered.
function generateMultiLineBlockXML(text){

    var xml = xmlStart;

    var parts = splitInVariableChunks(text);
    xml += multilineBlockXML.replace("[multiLineBlockID]","1").replace("[#]",parts.length);

    for(var i = 0; i < parts.length; i++){
        var partXML = parts[i].startsWith("_") ? itemBlock : textBlock;
        partXML = partXML.replace("[#]",i).replace("[blockID]",i).replace("[value]",parts[i]);
        xml += partXML;
    }

    xml += '</block></xml>';
    return xml;
}

// method to split the text in chunks, based on DCG variables, e.g: How is _name doing? -> [How is,_name, doing]
function splitInVariableChunks(text){
    var chunks = text.split(/(_[aA-zZ|0-9]*)/); // split on DCG variables.
    return chunks;
}

