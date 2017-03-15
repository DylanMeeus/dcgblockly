/**
 * Created by dmeeus1 on 10-3-2017.
 */

'use strict';

goog.provide('Blockly.Blocks.html');

goog.require('Blockly.Blocks');

Blockly.Blocks.html.HUE = "#62A9FF"; // define the colour for all HTML blocks.


// We need some elements for general HTML structure
// This includes : HTML, P, H1..H4.
// These are not layout per-se, but more structure.


/**
 * Container for the elements in the mutator.
 * @type {{init: Blockly.Blocks.html_blocks_container.init}}
 */
Blockly.Blocks['html_blocks_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.html.HUE);
        this.appendDummyInput()
            .appendField("Layout-element");
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

/**
 * Single HTML-component container. This can be any HTML element (or text)
 * @type {{init: Blockly.Blocks.html_block.init}}
 */
Blockly.Blocks['html_block'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.html.HUE);
        this.appendDummyInput()
            .appendField("element");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

/**
 * Code for HTML block.
 * @type {{init: Blockly.Blocks.lists_create_with.init, mutationToDom: Blockly.Blocks.lists_create_with.mutationToDom, domToMutation: Blockly.Blocks.lists_create_with.domToMutation, decompose: Blockly.Blocks.lists_create_with.decompose, compose: Blockly.Blocks.lists_create_with.compose, saveConnections: Blockly.Blocks.lists_create_with.saveConnections, updateShape_: Blockly.Blocks.lists_create_with.updateShape_}}
 */
Blockly.Blocks['html_start'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
        this.setColour(Blockly.Blocks.html.HUE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['html_block']));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
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
        var containerBlock = workspace.newBlock('html_blocks_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('html_block');
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
                .appendField("Voeg een layout-element toe.");
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField("Tekst met layout");
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
 * Block for generating the BOLD html tag <b>
 * @type {{init: Blockly.Blocks.html_bold.init}}
 */
Blockly.Blocks['html_bold'] = {
    init: function() {
        this.jsonInit({
            "message0": "maak %1 vet", // We need to define %1, this is the location where the input needs to appear.
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT",
                }
            ],
            "colour": Blockly.Blocks.html.HUE,
            "tooltip": "Zet tekst in het vet",
            "helpUrl": "Zet tekst in the vet.", // should actually be a URL.,
            "output" : "String",
        });
    }
};

/**
 * Create ITALIC-styled text
 * @type {{init: Blockly.Blocks.html_bold.init}}
 */
Blockly.Blocks['html_italic'] = {
    init: function() {
        this.jsonInit({
            "message0": "maak %1 cursief", // We need to define %1, this is the location where the input needs to appear.
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT",
                }
            ],
            "colour": Blockly.Blocks.html.HUE,
            "tooltip": "Zet tekst in cursief.",
            "helpUrl": "Zet tekst in the vet.", // should actually be a URL.,
            "output" : "String",
        });
    }
};

/**
 * Create UNDERLINED text
 * @type {{init: Blockly.Blocks.html_bold.init}}
 */
Blockly.Blocks['html_underline'] = {
    init: function() {
        this.jsonInit({
            "message0": "maak %1 onderlijnt", // We need to define %1, this is the location where the input needs to appear.
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT",
                }
            ],
            "colour": Blockly.Blocks.html.HUE,
            "tooltip": "Onderlijnt de tekst..",
            "helpUrl": "Zet tekst in the vet.", // should actually be a URL.,
            "output" : "String",
        });
    }
};



Blockly.Blocks['html_header'] = {
    /**
     * Block for comparison operator.
     * @this Blockly.Block
     */
    init: function() {

        var HEADER_LEVEL = [ // supported header levels (h1,h2,h3,..)
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
        ];
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Blockly.Blocks.html.HUE);
        this.setOutput(true, 'String');
        this.appendDummyInput()
            .appendField("Hoofding");
        this.appendValueInput('A') // first input section
            .appendField(new Blockly.FieldDropdown(HEADER_LEVEL), 'LVL');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip("tooltip")
        this.prevBlocks_ = [null, null];
    }
};


Blockly.Blocks['html_list_numbered'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
        this.setColour(Blockly.Blocks.html.HUE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['html_block']));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
    },
    /**
     * Create XML to represent list inputs.
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
        var containerBlock = workspace.newBlock('html_blocks_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('html_block');
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
                .appendField("Voeg een element toe.");
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField("Genummerde Lijst");
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
 * Block for unordered lists in HTML
 * @type {{init: Blockly.Blocks.html_list_numbered.init, mutationToDom: Blockly.Blocks.html_list_numbered.mutationToDom, domToMutation: Blockly.Blocks.html_list_numbered.domToMutation, decompose: Blockly.Blocks.html_list_numbered.decompose, compose: Blockly.Blocks.html_list_numbered.compose, saveConnections: Blockly.Blocks.html_list_numbered.saveConnections, updateShape_: Blockly.Blocks.html_list_numbered.updateShape_}}
 */
Blockly.Blocks['html_list_unnumbered'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
        this.setColour(Blockly.Blocks.html.HUE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['html_block']));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
    },
    /**
     * Create XML to represent list inputs.
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
        var containerBlock = workspace.newBlock('html_blocks_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('html_block');
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
                .appendField("Voeg een element toe.");
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField("Ongenummerde Lijst");
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
 * HTML-linebreak
 * @type {{init: Blockly.Blocks.html_break.init}}
 */
Blockly.Blocks['html_break'] = {
    init: function() {
        this.jsonInit({
            "message0": "nieuwe lijn", // We need to define %1, this is the location where the input needs to appear.
            "colour": Blockly.Blocks.html.HUE,
            "tooltip": "Nieuwe lijn in HTML output",
            "helpUrl": "Zet tekst in the vet.", // should actually be a URL.,
            "output" : "String",
        });
    }
};


