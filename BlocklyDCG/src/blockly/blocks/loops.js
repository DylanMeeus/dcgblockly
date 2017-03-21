/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Loop blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.loops');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.loops.HUE = "#708090";

/**
 * Block for the DCG-loop
 * @type {{init: Blockly.Blocks.controls_switch_case.init}}
 */
Blockly.Blocks['loops_for'] = {
    init: function() {
        this.setColour(Blockly.Blocks.loops.HUE);
        this.appendDummyInput()
            .appendField("");
        this.setInputsInline(true);
        this.appendValueInput("LST").appendField("Voor alle"); // input variable
        this.appendValueInput("RLE").appendField("voer uit"); // the output that needs to happen
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
};
