

goog.provide('Blockly.Dcg.html');

goog.require('Blockly.Dcg');


/**
 * Generator for the general HTML block.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['html_start'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Dcg.valueToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';
    }
    var code = '<html>' + elements.join(' ') + '</html>';
    return [code, Blockly.Dcg.ORDER_ATOMIC];
};


/**
 * Generator for BOLD text.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['html_bold'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.Dcg.valueToCode(block, 'TEXT',
            Blockly.Dcg.ORDER_NONE) || '0';
    var withoutQuotes = argument0.substr(1, argument0.length - 2);
    return ['<b>' + withoutQuotes + '</b>',Blockly.Dcg.ORDER_NONE];
};


/**
 * Generator for ITALIC text.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['html_italic'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.Dcg.valueToCode(block, 'TEXT',
            Blockly.Dcg.ORDER_NONE) || '0';
    var withoutQuotes = argument0.substr(1, argument0.length - 2);
    return ['<i>' + withoutQuotes + '</i>',Blockly.Dcg.ORDER_NONE];
};

/**
 * Generator for UNDERLINED text.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['html_underline'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.Dcg.valueToCode(block, 'TEXT',
            Blockly.Dcg.ORDER_NONE) || '0';
    var withoutQuotes = argument0.substr(1, argument0.length - 2);
    return ['<u>' + withoutQuotes + '</u>',Blockly.Dcg.ORDER_NONE];
};


/**
 * Generator for the HTML header
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['html_header'] = function(block) {
    // Operations 'and', 'or'.
    var header_level = (block.getFieldValue('LVL'));
    var argument0 = Blockly.Dcg.valueToCode(block, 'A', Blockly.Dcg.ORDER_NONE);
    argument0 = argument0.replace(/'/g, "");
    var code = '<h' + header_level + '>' + argument0 + '</h' + header_level + '>'
    return [code, Blockly.Dcg.ORDER_NONE];
};


/**
 * Generator to make a numbered list.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['html_list_numbered'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Dcg.valueToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';
    }
    var liWrappedElements = elements.map(x => x = "<li>" + x + "</li>");
    var code = '<ol>' + liWrappedElements.join('') + '</ol>';
    return [code, Blockly.Dcg.ORDER_ATOMIC];
};
/**
 *
 * Generator to make an unnumbered list.
 * @param block
 * @returns {*[]}
 */
Blockly.Dcg['html_list_unnumbered'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Dcg.valueToCode(block, 'ADD' + i,
                Blockly.Dcg.ORDER_NONE) || 'None';
    }
    var liWrappedElements = elements.map(x => x = "<li>" + x + "</li>");
    var code = '<ul>' + liWrappedElements.join('') + '</ul>';
    return [code, Blockly.Dcg.ORDER_ATOMIC];
};


Blockly.Dcg['html_break'] = function(block) {
    return ['</br>',Blockly.Dcg.ORDER_NONE];
};
