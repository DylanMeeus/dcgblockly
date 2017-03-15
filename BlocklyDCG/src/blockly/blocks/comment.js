Blockly.Blocks['singleComment'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('commentaar: ');
        this.setColour("#888888");
        this.setTooltip('Commentaar, wordt niet geinterpreteerd in de code.');
        this.setHelpUrl('wiki');
        this.setNextStatement(true);
        this.setPreviousStatement(true);
    }
};

/*

Blockly.Blocks['blockComment'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('eval regel: ');
        this.setColour(160);
        this.setTooltip('Laad een andere DCG regel.');
        this.setHelpUrl('wiki');
        this.setNextStatement(true);
    }
};

*/
