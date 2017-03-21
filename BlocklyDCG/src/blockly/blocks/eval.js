/**
 * @fileoverview Eval blocks for Blockly.
 * @author Dylan Meeus
 */


goog.provide('Blockly.Blocks.eval');

goog.require('Blockly.Blocks');

/**
 * Block for an eval line in DCG
 * @type {{init: Blockly.Blocks.singleComment.init}}
 */
Blockly.Blocks['eval'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('eval regel: ');
        this.setColour("#a25d6a"); // todo: make top-level variable
        this.setTooltip('Laad een andere DCG regel.');
        this.setHelpUrl('wiki');
        this.setNextStatement(true);
    }
};

