/**
 * @fileoverview Generating Dcg for loop blocks.
 * @author Dylan Meeus
 */
'use strict';

goog.provide('Blockly.Dcg.loops');

goog.require('Blockly.Dcg');


/**
 * Generator for the DCG for loop
 * @param block
 * @returns {*}
 */
Blockly.Dcg['loops_for'] = function(block) {
    var list= Blockly.Dcg.valueToCode(block, 'LST', Blockly.Dcg.ORDER_NONE);
    var rule = Blockly.Dcg.valueToCode(block, 'RLE', Blockly.Dcg.ORDER_NONE);
    var code = "forall {" + list+ "," + rule + "}"; // forall {organen, ORGAANREGEL}
    return code;
};


