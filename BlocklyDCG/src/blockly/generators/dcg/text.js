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
 * @fileoverview Generating Dcg for text blocks.
 * @author Dylan Meeus (Adapted from the Python file)
 */
'use strict';

goog.provide('Blockly.Dcg.texts');

goog.require('Blockly.Dcg');

Blockly.Dcg['text'] = function(block) {
  // Text value.
  var code = Blockly.Dcg.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Dcg.ORDER_ATOMIC];
};


Blockly.Dcg['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Dcg.valueToCode(block, 'VALUE',
      Blockly.Dcg.ORDER_NONE) || '\'\'';
  var code =  text + ' = \"\"';
  return [code, Blockly.Dcg.ORDER_LOGICAL_NOT];
};


Blockly.Dcg['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Dcg.valueToCode(block, 'TEXT',
      Blockly.Dcg.ORDER_NONE) || '\'\'';
  msg = msg.replace(/'/g, "");
  return '|' + msg + '|\n';
};


/**
 * Generator for the multi-line text block.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['multi_text'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Dcg.valueToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';

    }
    var code = elements.map(x => x.charAt(0) === "'" ?  x.substr(1,x.length-2) : x).join(' '); // put the fields between pipes, and remove the ' marks from the text output. (from text blocks)
    return [code, Blockly.Dcg.ORDER_ATOMIC];
};

/**
 * Generator for a newline character (\n)
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['text_newline'] = function(block) {
    return ['\\n', Blockly.Dcg.ORDER_ATOMIC];
};


/**
 * Generator for the 'startsWith' operator
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['text_startsWith'] = function(block) {
    // Block for splitting text into a list, or joining a list into text.
    var argument0 = Blockly.Dcg.valueToCode(block, 'A', Blockly.Dcg.ORDER_NONE);
    var argument1 = Blockly.Dcg.valueToCode(block, 'B', Blockly.Dcg.ORDER_NONE);

    var code = argument0 + ' startsWith ' + argument1;

    return [code,Blockly.Dcg.ORDER_NONE];
};

/**
 *
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['text_endsWith'] = function(block) {
    // Block for splitting text into a list, or joining a list into text.
    var argument0 = Blockly.Dcg.valueToCode(block, 'A', Blockly.Dcg.ORDER_NONE);
    var argument1 = Blockly.Dcg.valueToCode(block, 'B', Blockly.Dcg.ORDER_NONE);

    var code = argument0 + ' endsWith ' + argument1;

    return [code,Blockly.Dcg.ORDER_NONE];
};
