/**
 * Created by dmeeus1 on 10-3-2017.
 */

'use strict';

goog.provide('Blockly.Blocks.html');

goog.require('Blockly.Blocks');

Blockly.Blocks.html.HUE = "#0011AA"; // define the colour for all HTML blocks.


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
