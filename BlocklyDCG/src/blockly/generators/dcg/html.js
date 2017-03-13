

goog.provide('Blockly.Dcg.html');

goog.require('Blockly.Dcg');


Blockly.Dcg['html_bold'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.Dcg.valueToCode(block, 'TEXT',
            Blockly.Dcg.ORDER_NONE) || '0';
    var withoutQuotes = argument0.substr(1, argument0.length - 2);
    return ['<b>' + withoutQuotes + '</b>',Blockly.Dcg.ORDER_NONE];
};
