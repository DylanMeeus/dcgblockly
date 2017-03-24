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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.texts');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.texts.HUE = "#536878";

Blockly.Blocks['text'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setOutput(true, 'String');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          Blockly.Msg.TEXT_TEXT_TOOLTIP;
    });
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};


Blockly.Blocks['text_isEmpty'] = {
  /**
   * Block for is the string null?
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_ISEMPTY_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ['String', 'Array']
        }
      ],
      "output": 'Boolean',
      "colour": Blockly.Blocks.texts.HUE,
      "tooltip": Blockly.Msg.TEXT_ISEMPTY_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_ISEMPTY_HELPURL
    });
  }
};


Blockly.Blocks['text_print'] = {
  /**
   * Block for print statement.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_PRINT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.texts.HUE,
      "tooltip": Blockly.Msg.TEXT_PRINT_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_PRINT_HELPURL
    });
  }
};

/**
 * Container for the elements in the mutator.
 */
Blockly.Blocks['text_blocks_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput()
            .appendField("Layout-element");
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

/**
 * Single text-element, for use in the mutator container.
 * @type {{init: Blockly.Blocks.html_block.init}}
 */
Blockly.Blocks['text_block'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput()
            .appendField("tekst");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};


/**
 * Code for a multi-text block. This can be used to split long pieces of text into multiple pieces, and add variables if necessary.
 * @type {{init: Blockly.Blocks.lists_create_with.init, mutationToDom: Blockly.Blocks.lists_create_with.mutationToDom, domToMutation: Blockly.Blocks.lists_create_with.domToMutation, decompose: Blockly.Blocks.lists_create_with.decompose, compose: Blockly.Blocks.lists_create_with.compose, saveConnections: Blockly.Blocks.lists_create_with.saveConnections, updateShape_: Blockly.Blocks.lists_create_with.updateShape_}}
 */
Blockly.Blocks['multi_text'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function() {
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['text_block']));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
        // add context menu to edit the text in the multiline block.
        this.customContextMenu = function(options){
            var helpOption = {enabled: true};
            helpOption.text = "Pas tekst aan";
            helpOption.callback = function() {
                editMultiLineText(thisBlock);
            };
            // we want to add the new option to the start of the list
            options = options.reverse();
            options.push(helpOption);
            options = options.reverse();
        }
    },

    /**
     * Create XML to represent the HTML-elements contained in this HTML block..
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('text_blocks_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('text_block');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField("Voeg een tekst-element toe.");
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField("Gecombineerde tekst");
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    }
};



/**
 * Represents a newline \n in DCG text
 */
Blockly.Blocks['text_newline'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput()
            .appendField("nieuwe lijn");
        this.setTooltip("Wat volgt wordt op een nieuwe lijn weergeven.");
        this.setOutput(true)
        this.contextMenu = false;
    }
};

/**
 * Block to represent the 'startsWith' syntax.
 * @type {{init: Blockly.Blocks.variable_in_list.init, onchange: Blockly.Blocks.variable_in_list.onchange}}
 */
Blockly.Blocks['text_startsWith'] = {
    /**
     * Block for comparison operator.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);

        this.setOutput(true, 'Boolean');
        this.appendValueInput('A');
        this.appendDummyInput().appendField("begint met")
        this.appendValueInput('B')
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip("Begint het linkerelement met de tekst uit het rechterelement.");
        //this.prevBlocks_ = [null, null];
        this.setNextStatement(false); // Because this block should only be put inside an if-block. The if-block has the connection to next.
    },

    /**
     * This is called for every change to the workspace.
     * Here I could verify that one of the parts of the blocks is a list, and the other a variable.
     * @param e
     */
    onchange: function(e) {
        var blockA = this.getInputTargetBlock('A');
        var blockB = this.getInputTargetBlock('B');

        // todo: write matching logic, and alerts.

        //this.prevBlocks_[0] = blockA;
        //this.prevBlocks_[1] = blockB;
    }
};

/**
 * Block to represent the 'endsWith' syntax.
 * @type {{init: Blockly.Blocks.text_startsWith.init, onchange: Blockly.Blocks.text_startsWith.onchange}}
 */
Blockly.Blocks['text_endsWith'] = {
    /**
     * Block for comparison operator.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);

        this.setOutput(true, 'Boolean');
        this.appendValueInput('A');
        this.appendDummyInput().appendField("eindigt met")
        this.appendValueInput('B')
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip("Eindigt het linkerelement met de tekst uit het rechterelement.");
        //this.prevBlocks_ = [null, null];
        this.setNextStatement(false); // Because this block should only be put inside an if-block. The if-block has the connection to next.
    },

    /**
     * This is called for every change to the workspace.
     * Here I could verify that one of the parts of the blocks is a list, and the other a variable.
     * @param e
     */
    onchange: function(e) {
        var blockA = this.getInputTargetBlock('A');
        var blockB = this.getInputTargetBlock('B');

        // todo: write matching logic, and alerts.

        //this.prevBlocks_[0] = blockA;
        //this.prevBlocks_[1] = blockB;
    }
};


function editMultiLineText(block){
    var blockID = block.id;

    var multiText = "";

    // Rebuild the text based on the input blocks.
    for (var i = 0; i < block.itemCount_; i++) {
        var output = Blockly.Dcg.valueToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';

        if(output != "None"){ // ignore this, this is an empty blog the user entered.
            multiText += output;
        }
    }
    showEditDialog(multiText,blockID)
}
