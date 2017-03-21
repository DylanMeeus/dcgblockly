
/**
 * @fileoverview Generating Dcg for variable blocks.
 * @author Dylan Meeus
 */
'use strict';

goog.provide('Blockly.Dcg.variables');

goog.require('Blockly.Dcg');

Blockly.Dcg['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Dcg.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return ['_' + code, Blockly.Dcg.ORDER_ATOMIC];
};

Blockly.Dcg['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Dcg.valueToCode(block, 'VALUE',
      Blockly.Dcg.ORDER_NONE) || '0';
  var varName = Blockly.Dcg.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return '_' + varName + ' = ' + argument0 + '\n';
};
