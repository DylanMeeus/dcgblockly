
goog.provide('Blockly.Dcg.eval');

goog.require('Blockly.Dcg');

// Generator for an eval statement in DCG
Blockly.Dcg['eval'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.Dcg.valueToCode(block, 'VALUE',
            Blockly.Dcg.ORDER_NONE) || '0';
    var withoutQuotes = argument0.substr(1, argument0.length - 2);
    return 'eval(' + withoutQuotes + ')\n';
};
