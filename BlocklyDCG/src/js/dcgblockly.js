


var xmlStart = '<xml xmlns="http://www.w3.org/1999/xhtml">';

var multilineBlockXML = '<block type="multi_text" id="[multiLineBlockID]" x="15" y="20"><mutation items="[#]"></mutation>';
var textBlock = '<value name="ADD[#]"><block type="text" id="[blockID]"><field name="TEXT">[value]</field></block></value>'
var itemBlock = '<value name="ADD[#]"><block type="variables_get" id="[blockID]"><field name="VAR">[value]</field></block></value>'
var newlineBlock = '<value name="ADD[#]"><block type="text_newline" id="[blockID]"></block></value>';

/**
 * wrapInXMLTags indicates wether or not we need an XMLStart + XMLEnd tag generated.
 * For example for altering existing blocks this is not needed.
 * @param text
 * @param wrapInXMLTags
 * @returns {string}
 */
function generateMultiLineBlockXML(text, wrapInXMLTags){

    if(wrapInXMLTags){
        var xml = xmlStart;
    }

    var parts = splitInVariableChunks(text).filter(p => p != null && p != "");
    xml += multilineBlockXML.replace("[multiLineBlockID]",Blockly.utils.genUid()).replace("[#]",parts.length);
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

    xml += '</block>';

    if(wrapInXMLTags){
        xml += '</xml>';
    }
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
    // find the index of the ID?
    var startAndEndPosition = findStartAndEndIndexOfBlock(currentWorkspaceXML,parentBlockID);



    var matchedString = currentWorkspaceXML.substring(startAndEndPosition[0],startAndEndPosition[1]);
    var newWorkspace = currentWorkspaceXML.replace(matchedString,multiLineBlockXML);
    console.log(multiLineBlockXML);
    return newWorkspace
}

// method to split the text in chunks, based on DCG variables, e.g: How is _name doing? -> [How is,_name, doing]
function splitInVariableChunks(text){
    var chunks = text.split(/(_[aA-zZ|0-9]*)|([\n\r])/); // split on DCG variables and newlines.
    return chunks;
}


/**
 * Finds the start and end index of a block given a certain block ID
 * Returns an Array of [beginPosition, endPosition]
 * @param blockID
 */
function findStartAndEndIndexOfBlock(text, blockID){
    // first find the index of the given ID
    var textAsCharArray = text.split("");
    var indexOfID = text.indexOf(blockID);

    pointer = indexOfID;
    while(textAsCharArray[pointer] != '<'){
        pointer--;
    }
    var beginPosition = pointer;

    var endPosition = -1;
    var openBlockCount = 0;
    while(endPosition == -1){
        console.log(openBlockCount);
        if(text.substring(pointer).startsWith("<block")){ // another block opened up
            openBlockCount++;
        }

        if(text.substring(pointer).startsWith("</block>")){ // block ended
            openBlockCount--;
        }
        if(openBlockCount==0){
            while(textAsCharArray[pointer] != ">"){ // find the last >
                pointer++;
            }
            endPosition = pointer+1; // include the >
            break;
        }
        pointer++;
    }

    return [beginPosition,endPosition];
}
