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
 * @fileoverview Generating Dcg for list blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Dcg.lists');

goog.require('Blockly.Dcg');


Blockly.Dcg['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Dcg.ORDER_ATOMIC];
};

Blockly.Dcg['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Dcg.valueToCode(block, 'ADD' + i,
        Blockly.Dcg.ORDER_NONE) || 'None';
  }
  var code = '[' + elements.join(', ') + ']';
  return [code, Blockly.Dcg.ORDER_ATOMIC];
};

Blockly.Dcg['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var item = Blockly.Dcg.valueToCode(block, 'ITEM',
      Blockly.Dcg.ORDER_NONE) || 'None';
  var times = Blockly.Dcg.valueToCode(block, 'NUM',
      Blockly.Dcg.ORDER_MULTIPLICATIVE) || '0';
  var code = '[' + item + '] * ' + times;
  return [code, Blockly.Dcg.ORDER_MULTIPLICATIVE];
};

Blockly.Dcg['lists_length'] = function(block) {
  // String or array length.
  var list = Blockly.Dcg.valueToCode(block, 'VALUE',
      Blockly.Dcg.ORDER_NONE) || '[]';
  return ['len(' + list + ')', Blockly.Dcg.ORDER_FUNCTION_CALL];
};

Blockly.Dcg['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var list = Blockly.Dcg.valueToCode(block, 'VALUE',
      Blockly.Dcg.ORDER_NONE) || '[]';
  var code = 'not len(' + list + ')';
  return [code, Blockly.Dcg.ORDER_LOGICAL_NOT];
};

/**
 * Generator for the 'in'-operator.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['variable_in_list'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
    var argument0 = Blockly.Dcg.valueToCode(block, 'A', Blockly.Dcg.ORDER_NONE);
    var argument1 = Blockly.Dcg.valueToCode(block, 'B', Blockly.Dcg.ORDER_NONE);

    var code = argument0 + ' in ' + argument1;

    return [code,Blockly.Dcg.ORDER_NONE];
};


/**
 * Generator for the '~'-operator.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['list_contains_variable'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
    var argument0 = Blockly.Dcg.valueToCode(block, 'A', Blockly.Dcg.ORDER_NONE);
    var argument1 = Blockly.Dcg.valueToCode(block, 'B', Blockly.Dcg.ORDER_NONE);

    var code = argument0 + ' ~ ' + argument1;

    return [code,Blockly.Dcg.ORDER_NONE];
};



