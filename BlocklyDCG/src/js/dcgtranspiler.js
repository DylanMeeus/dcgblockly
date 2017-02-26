/**
 * Created by dylan on 26.02.17.
 * The purpose of this file is to translate DCG to valid XML code
 *
 * This is a test to write is as a huge pattern-matching machine.
 *
 * Suggest: TypeScript, make objects, print objects to XML?
 */


// Regex for pattern matching
var REGEX_COMMENT = new RegExp("^@.*@$");
var REGEX_PRINTLINE = new RegExp("^\\|.*\\|$");
var REGEX_VARIABLE_DECLARATION = new RegExp("")


// Strings that represent "blocks"
var XML_START = '<xml xmlns="http://www.w3.org/1999/xhtml">';
var COMMENT_BLOCK_XML = '<block type="singleComment" id="{id}" x="{x}" y="{y}"><value name="VALUE"><block type="text" id="{valueid}"><field name="TEXT">{input}</field></block></value></block>'


// input: dcg, output: xml
function transpileDcgToXML(dcg){

    // split the DCG in separate lines
    var xml = [XML_START]; // array of XML strings. We can join them in the end.
    var lines = dcg.split("\n");
    console.log(lines);
    lines.forEach(line => {
        switch(true){
            case REGEX_COMMENT.test(line): // double logical-not. Convert the "null" value to true if the array is empty, then turn it to false because it is empty
                xml.push(commentLineToBlock(line));
                break;

            case REGEX_PRINTLINE.test(line) :
                console.log("printline");
                break;


            default: console.log(line);
        }
    });
    xml.push('</xml>');
    console.log(xml.join("\n"));

    return xml;
}


/**
 * input: line
 * output: XML block
 */
function commentLineToBlock(line){
    var input = line.substr(1, line.length - 2);
    var xmlBlock = COMMENT_BLOCK_XML;
    xmlBlock = xmlBlock.replace('{id}',"tempId")
    xmlBlock = xmlBlock.replace('{x}','50')
    xmlBlock = xmlBlock.replace('{y}','50')
    xmlBlock = xmlBlock.replace('{valueId}','valueId2')
    xmlBlock = xmlBlock.replace('{input}',input)
    return xmlBlock;
}
