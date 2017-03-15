Blockly.Blocks['eval'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('eval regel: ');
        this.setColour("#FF4848"); // todo: make top-level variable
        this.setTooltip('Laad een andere DCG regel.');
        this.setHelpUrl('wiki');
        this.setNextStatement(true);
    }
};

