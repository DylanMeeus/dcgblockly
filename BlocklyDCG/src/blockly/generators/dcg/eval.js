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



goog.provide('Blockly.Dcg.eval');

goog.require('Blockly.Dcg');



Blockly.Dcg['eval'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.Dcg.valueToCode(block, 'VALUE',
            Blockly.Dcg.ORDER_NONE) || '0';
    var withoutQuotes = argument0.substr(1, argument0.length - 2);
    return 'eval(' + withoutQuotes + ')\n';
};
