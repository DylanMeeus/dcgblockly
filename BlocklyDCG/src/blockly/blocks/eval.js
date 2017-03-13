Blockly.Blocks['eval'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('eval regel: ');
        this.setColour("#ff0000");
        this.setTooltip('Laad een andere DCG regel.');
        this.setHelpUrl('wiki');
        this.setNextStatement(true);
    }
};

