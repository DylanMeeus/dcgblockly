goog.provide('Blockly.Dcg.comment');

goog.require('Blockly.Dcg');


// Generator for a comment in DCG (Text between @..@)
Blockly.Dcg['singleComment'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.Dcg.valueToCode(block, 'VALUE',
            Blockly.Dcg.ORDER_NONE) || '0';
    var withoutQuotes = argument0.substr(1, argument0.length - 2);
    return '@ ' + withoutQuotes + ' @\n';
};
