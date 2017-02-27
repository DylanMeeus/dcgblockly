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
var COMMENT_BLOCK_XML = '<block type="singleComment" id="{id}" x="{x}" y="{y}"><value name="VALUE"><block type="text" id="{valueid}"><field name="TEXT">{input}</field></block></value>{next}</block>'
var PRINTLINE_BLOCK_XML = '<block type="text_print" id="={id}" x="{x}" y="{y}"><value name="TEXT"><block type="text" id="{valuid}"><field name="TEXT">{input}</field></block></value>{next}</block>'

// input: dcg, output: xml
function transpileDcgToXML(dcg){

    // split the DCG in separate lines
    var xml = [XML_START]; // array of XML strings. We can join them in the end.
    var lines = dcg.split("\n");
    lines.forEach(line => {
        switch(true){
            case REGEX_COMMENT.test(line):
                xml.push(commentLineToBlock(line));
                break;

            case REGEX_PRINTLINE.test(line) :
                xml.push(printlineToBlock(line));
                break;

            case line.length == 0:
                console.log("matches regexp:" + line);
                xml.push("\n");
                break;

            default: console.log(line);
        }
    });

    xml = layoutBlocks(xml);
    // console.log(xml);
    xml = joinBlocks(xml);
    xml.push('</xml>');
    // console.log(xml.join("\n"));

    return xml;
}


/**
 * Join the blocks together. If there is a newline in the array, it means disjunct blocks. Otherwise we add them inside the "next" field.
 * @param blocks
 */
function joinBlocks(blocks){
    var newBlocks = [];
    newBlocks.push(blocks[0]);
    var i = 1;
    var k = 1;
    while(k < blocks.length){
        while (blocks[i+1] != "\n" && i < blocks.length && blocks[i+1] != null){
            if(blocks[k] != "\n"){ // maybe the current one is the newline.
                blocks[k] = blocks[k].replace("{next}",'<next>' + blocks[i+1] + '</next>');
            }
            else {
                blocks[k] = blocks[i+1];
            }
            i++;
        }
        console.log("pushing: " + blocks[k])
        newBlocks.push(blocks[k]);
        i++;
        k=i; // we want to use the next block, after all the ones we have passed.
    }

    // sweep, delete all the remaining 'next' blocks, because they are not filled in.

    newBlocks.filter(x => x != null && x != "").filter(x => x.replace("{next}",""));
    console.log(newBlocks);
    return newBlocks;

}

/**
 * Fill in the x-y coordinates for the blocks in the array.
 * input: array of blocks
 * output: array of blocks
 *
 */
function layoutBlocks(blocks){
    // xmlBlock = xmlBlock.replace('{x}','50')
    // xmlBlock = xmlBlock.replace('{y}','50')
    var y = 50; // start at 50
    for(var i = 1; i < blocks.length; i++){ // skip the first element which is not a block
        var block = blocks[i];
        if(block == "\n"){
            console.log("empty line");
        }
        blocks[i] = blocks[i].replace('{y}',y)
        blocks[i] = blocks[i].replace('{x}','50') // keep them at same horizontal place.
        y += 50;
    }
    console.log("done with the layout");
    console.log(blocks);
    return blocks;
}

/**
 * input: line
 * output: XML block
 */
function commentLineToBlock(line){
    var input = line.substr(1, line.length - 2);
    var xmlBlock = COMMENT_BLOCK_XML;
    xmlBlock = xmlBlock.replace('{id}',"tempId")
    xmlBlock = xmlBlock.replace('{valueId}','valueId2')
    xmlBlock = xmlBlock.replace('{input}',input)
    return xmlBlock;
}

function printlineToBlock(line){
    var input = line.substr(1, line.length - 2);
    var xmlBlock = PRINTLINE_BLOCK_XML;
    xmlBlock = xmlBlock.replace('{id}',"tempId")
    xmlBlock = xmlBlock.replace('{valueId}','valueId2')
    xmlBlock = xmlBlock.replace('{input}',input)
    return xmlBlock;
}
