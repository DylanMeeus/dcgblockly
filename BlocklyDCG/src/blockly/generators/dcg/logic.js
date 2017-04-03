/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Dcg for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Dcg.logic');

goog.require('Blockly.Dcg');


Blockly.Dcg['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Dcg.valueToCode(block, 'IF' + n,
      Blockly.Dcg.ORDER_NONE) || 'false';
    branchCode = Blockly.Dcg.statementToCode(block, 'DO' + n) ||
        Blockly.Dcg.PASS;
    code += (n == 0 ? 'if ' : 'else if ' ) + '(' + conditionCode + ') then\n{\n' + branchCode;

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Dcg.statementToCode(block, 'ELSE') ||
        Blockly.Dcg.PASS;
    code += '}\nelse \n{\n' + branchCode;
  }
    code += "}";
  return code;
};

Blockly.Dcg['controls_ifelse'] = Blockly.Dcg['controls_if'];

Blockly.Dcg['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '=',
    'NEQ': '\\=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.Dcg.ORDER_RELATIONAL;
  var argument0 = Blockly.Dcg.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Dcg.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Dcg['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.Dcg.ORDER_LOGICAL_AND :
      Blockly.Dcg.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Dcg.valueToCode(block, 'A', order);
  var argument1 = Blockly.Dcg.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'False';
    argument1 = 'False';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? 'True' : 'False';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Dcg['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Dcg.valueToCode(block, 'BOOL',
      Blockly.Dcg.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + argument0;
  return [code, Blockly.Dcg.ORDER_LOGICAL_NOT];
};

Blockly.Dcg['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Dcg.ORDER_ATOMIC];
};

Blockly.Dcg['logic_null'] = function(block) {
  // Null data type.
  return ['None', Blockly.Dcg.ORDER_ATOMIC];
};



/**
 * Generator for the general switch-block.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['controls_switch'] = function(block) {

    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Dcg.statementToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';
    }

    var variable = Blockly.Dcg.valueToCode(block, 'A', Blockly.Dcg.ORDER_NONE);

    console.log(variable);
    var code = "case " + variable + "\n";
    elements.forEach(x => code += x + "\n");

    return code;
};


/**
 * Block for individual case.
 * @param block
 * @returns {string}
 */
Blockly.Dcg['controls_switch_case'] = function(block) {
    var comparator = Blockly.Dcg.valueToCode(block, 'VAR', Blockly.Dcg.ORDER_NONE);
    var output = Blockly.Dcg.valueToCode(block, 'OUT', Blockly.Dcg.ORDER_NONE);
    output = output.substr(1,output.length-2);
    var code = "= " + comparator + "{ " + output + " }"; // { } as we can wrap another statement in here.
    return code;
};


/**
 * Generator for an AND-statement with multiple AND-predicates.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['multi_and'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Dcg.valueToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';

    }
    var code = '(' + elements.join(' and ') + ')'; // put the fields between pipes, and remove the ' marks from the text output. (from text blocks)
    return [code, Blockly.Dcg.ORDER_ATOMIC];
};

/**
 * Generator for an OR-statement with multiple OR-predicates.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['multi_or'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Dcg.valueToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';

    }
    var code = '(' + elements.join(' or ') + ')'; // put the fields between pipes, and remove the ' marks from the text output. (from text blocks)
    return [code, Blockly.Dcg.ORDER_ATOMIC];
};
