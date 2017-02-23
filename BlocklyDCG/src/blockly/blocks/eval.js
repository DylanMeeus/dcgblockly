Blockly.Blocks['eval'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('eval regel: ');
        this.setOutput(true, 'Number');
        this.setColour(160);
        this.setTooltip('Laad een andere DCG regel.');
        this.setHelpUrl('wiki');
    }
};
