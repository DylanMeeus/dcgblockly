
/**
 * @fileoverview Comment blocks for Blockly.
 * @author Dylan Meeus
 */

goog.provide('Blockly.Blocks.comment');

goog.require('Blockly.Blocks');

Blockly.Blocks.comment.HUE = "#888888"; // define the colour for all HTML blocks.


/**
 * Block for a single comment in DCG
 * @type {{init: Blockly.Blocks.singleComment.init}}
 */
Blockly.Blocks['singleComment'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('commentaar: ');
        this.setColour(Blockly.Blocks.comment.HUE);
        this.setTooltip('Commentaar, wordt niet geinterpreteerd in de code.');
        this.setHelpUrl('wiki');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
    }
};
