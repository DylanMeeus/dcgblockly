/**
 * Created by dmeeus1 on 23-2-2017.
 */
/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Helper functions for generating Python for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Dcg');

goog.require('Blockly.Generator');


/**
 * Python code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Dcg = new Blockly.Generator('Dcg');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Dcg.addReservedWords(
    // import keyword
    // print ','.join(keyword.kwlist)
    // http://docs.python.org/reference/lexical_analysis.html#keywords
    'and,as,assert,break,class,continue,def,del,elif,else,except,exec,' +
    'finally,for,from,global,if,import,in,is,lambda,not,or,pass,print,raise,' +
    'return,try,while,with,yield,' +
    //http://docs.python.org/library/constants.html
    'True,False,None,NotImplemented,Ellipsis,__debug__,quit,exit,copyright,' +
    'license,credits,' +
    // http://docs.python.org/library/functions.html
    'abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,' +
    'isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,' +
    'iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,' +
    'raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,' +
    'long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,' +
    'reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,' +
    'min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,' +
    'coerce,dir,id,oct,sorted,intern'
);

/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Blockly.Dcg.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.Dcg.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.Dcg.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Dcg.ORDER_MEMBER = 2.1;          // . []
Blockly.Dcg.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.Dcg.ORDER_EXPONENTIATION = 3;    // **
Blockly.Dcg.ORDER_UNARY_SIGN = 4;        // + -
Blockly.Dcg.ORDER_BITWISE_NOT = 4;       // ~
Blockly.Dcg.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.Dcg.ORDER_ADDITIVE = 6;          // + -
Blockly.Dcg.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.Dcg.ORDER_BITWISE_AND = 8;       // &
Blockly.Dcg.ORDER_BITWISE_XOR = 9;       // ^
Blockly.Dcg.ORDER_BITWISE_OR = 10;       // |
Blockly.Dcg.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.Dcg.ORDER_LOGICAL_NOT = 12;      // not
Blockly.Dcg.ORDER_LOGICAL_AND = 13;      // and
Blockly.Dcg.ORDER_LOGICAL_OR = 14;       // or
Blockly.Dcg.ORDER_CONDITIONAL = 15;      // if else
Blockly.Dcg.ORDER_LAMBDA = 16;           // lambda
Blockly.Dcg.ORDER_NONE = 99;             // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Dcg.ORDER_OVERRIDES = [
    // (foo()).bar -> foo().bar
    // (foo())[0] -> foo()[0]
    [Blockly.Dcg.ORDER_FUNCTION_CALL, Blockly.Dcg.ORDER_MEMBER],
    // (foo())() -> foo()()
    [Blockly.Dcg.ORDER_FUNCTION_CALL, Blockly.Dcg.ORDER_FUNCTION_CALL],
    // (foo.bar).baz -> foo.bar.baz
    // (foo.bar)[0] -> foo.bar[0]
    // (foo[0]).bar -> foo[0].bar
    // (foo[0])[1] -> foo[0][1]
    [Blockly.Dcg.ORDER_MEMBER, Blockly.Dcg.ORDER_MEMBER],
    // (foo.bar)() -> foo.bar()
    // (foo[0])() -> foo[0]()
    [Blockly.Dcg.ORDER_MEMBER, Blockly.Dcg.ORDER_FUNCTION_CALL],

    // not (not foo) -> not not foo
    [Blockly.Dcg.ORDER_LOGICAL_NOT, Blockly.Dcg.ORDER_LOGICAL_NOT],
    // a and (b and c) -> a and b and c
    [Blockly.Dcg.ORDER_LOGICAL_AND, Blockly.Dcg.ORDER_LOGICAL_AND],
    // a or (b or c) -> a or b or c
    [Blockly.Dcg.ORDER_LOGICAL_OR, Blockly.Dcg.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Dcg.init = function(workspace) {
    /**
     * Empty loops or conditionals are not allowed in Python.
     */
    Blockly.Dcg.PASS = this.INDENT + 'pass\n';
    // Create a dictionary of definitions to be printed before the code.
    Blockly.Dcg.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.Dcg.functionNames_ = Object.create(null);

    if (!Blockly.Dcg.variableDB_) {
        Blockly.Dcg.variableDB_ =
            new Blockly.Names(Blockly.Dcg.RESERVED_WORDS_);
    } else {
        Blockly.Dcg.variableDB_.reset();
    }

    var defvars = [];
    var variables = workspace.variableList;
    for (var i = 0; i < variables.length; i++) {
        defvars[i] = Blockly.Dcg.variableDB_.getName(variables[i],
            Blockly.Variables.NAME_TYPE);
    }
    Blockly.Dcg.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Dcg.finish = function(code) {
    // Convert the definitions dictionary into a list.
    var definitions = [];
    for (var name in Blockly.Dcg.definitions_) {
        definitions.push(Blockly.Dcg.definitions_[name]);
    }
    // Clean up temporary data.
    delete Blockly.Dcg.definitions_;
    delete Blockly.Dcg.functionNames_;
    Blockly.Dcg.variableDB_.reset();
    return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Dcg.scrubNakedValue = function(line) {
    return line + '\n';
};

/**
 * Encode a string as a properly escaped Dcg string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Dcg string.
 * @private
 */
Blockly.Dcg.quote_ = function(string) {
    // DCG requires single quotes areound strings.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Dcg.scrub_ = function(block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.Dcg.COMMENT_WRAP - 3);
        if (comment) {
            if (block.getProcedureDef) {
                // Use a comment block for function comments.
                commentCode += '"""' + comment + '\n"""\n';
            } else {
                commentCode += Blockly.Dcg.prefixLines(comment + '\n', '# ');
            }
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.Dcg.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.Dcg.prefixLines(comment, '# ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.Dcg.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.Dcg.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
    var delta = opt_delta || 0;
    if (block.workspace.options.oneBasedIndex) {
        delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    var atOrder = delta ? Blockly.Dcg.ORDER_ADDITIVE :
        Blockly.Dcg.ORDER_NONE;
    var at = Blockly.Dcg.valueToCode(block, atId, atOrder) || defaultAtIndex;

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseInt(at, 10) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = 'int(' + at + ' + ' + delta + ')';
        } else if (delta < 0) {
            at = 'int(' + at + ' - ' + -delta + ')';
        } else {
            at = 'int(' + at + ')';
        }
        if (opt_negate) {
            at = '-' + at;
        }
    }
    return at;
};
