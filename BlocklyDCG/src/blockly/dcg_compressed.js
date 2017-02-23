// Do not edit this file; automatically generated by build.py.
'use strict';


// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Dcg=new Blockly.Generator("Dcg");Blockly.Dcg.addReservedWords("and,as,assert,break,class,continue,def,del,elif,else,except,exec,finally,for,from,global,if,import,in,is,lambda,not,or,pass,print,raise,return,try,while,with,yield,True,False,None,NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,coerce,dir,id,oct,sorted,intern");
Blockly.Dcg.ORDER_ATOMIC=0;Blockly.Dcg.ORDER_COLLECTION=1;Blockly.Dcg.ORDER_STRING_CONVERSION=1;Blockly.Dcg.ORDER_MEMBER=2.1;Blockly.Dcg.ORDER_FUNCTION_CALL=2.2;Blockly.Dcg.ORDER_EXPONENTIATION=3;Blockly.Dcg.ORDER_UNARY_SIGN=4;Blockly.Dcg.ORDER_BITWISE_NOT=4;Blockly.Dcg.ORDER_MULTIPLICATIVE=5;Blockly.Dcg.ORDER_ADDITIVE=6;Blockly.Dcg.ORDER_BITWISE_SHIFT=7;Blockly.Dcg.ORDER_BITWISE_AND=8;Blockly.Dcg.ORDER_BITWISE_XOR=9;Blockly.Dcg.ORDER_BITWISE_OR=10;Blockly.Dcg.ORDER_RELATIONAL=11;
Blockly.Dcg.ORDER_LOGICAL_NOT=12;Blockly.Dcg.ORDER_LOGICAL_AND=13;Blockly.Dcg.ORDER_LOGICAL_OR=14;Blockly.Dcg.ORDER_CONDITIONAL=15;Blockly.Dcg.ORDER_LAMBDA=16;Blockly.Dcg.ORDER_NONE=99;
Blockly.Dcg.ORDER_OVERRIDES=[[Blockly.Dcg.ORDER_FUNCTION_CALL,Blockly.Dcg.ORDER_MEMBER],[Blockly.Dcg.ORDER_FUNCTION_CALL,Blockly.Dcg.ORDER_FUNCTION_CALL],[Blockly.Dcg.ORDER_MEMBER,Blockly.Dcg.ORDER_MEMBER],[Blockly.Dcg.ORDER_MEMBER,Blockly.Dcg.ORDER_FUNCTION_CALL],[Blockly.Dcg.ORDER_LOGICAL_NOT,Blockly.Dcg.ORDER_LOGICAL_NOT],[Blockly.Dcg.ORDER_LOGICAL_AND,Blockly.Dcg.ORDER_LOGICAL_AND],[Blockly.Dcg.ORDER_LOGICAL_OR,Blockly.Dcg.ORDER_LOGICAL_OR]];
Blockly.Dcg.init=function(a){Blockly.Dcg.PASS=this.INDENT+"pass\n";Blockly.Dcg.definitions_=Object.create(null);Blockly.Dcg.functionNames_=Object.create(null);Blockly.Dcg.variableDB_?Blockly.Dcg.variableDB_.reset():Blockly.Dcg.variableDB_=new Blockly.Names(Blockly.Dcg.RESERVED_WORDS_);var b=[];a=a.variableList;for(var c=0;c<a.length;c++)b[c]=Blockly.Dcg.variableDB_.getName(a[c],Blockly.Variables.NAME_TYPE)+" = None";Blockly.Dcg.definitions_.variables=b.join("\n")};
Blockly.Dcg.finish=function(a){var b=[],c=[],d;for(d in Blockly.Dcg.definitions_){var e=Blockly.Dcg.definitions_[d];e.match(/^(from\s+\S+\s+)?import\s+\S+/)?b.push(e):c.push(e)}delete Blockly.Dcg.definitions_;delete Blockly.Dcg.functionNames_;Blockly.Dcg.variableDB_.reset();return(b.join("\n")+"\n\n"+c.join("\n\n")).replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n\n")+a};Blockly.Dcg.scrubNakedValue=function(a){return a+"\n"};
Blockly.Dcg.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/'/g,"\\'");return"'"+a+"'"};
Blockly.Dcg.scrub_=function(a,b){var c="";if(!a.outputConnection||!a.outputConnection.targetConnection){var d=a.getCommentText();(d=Blockly.utils.wrap(d,Blockly.Dcg.COMMENT_WRAP-3))&&(c=a.getProcedureDef?c+('"""'+d+'\n"""\n'):c+Blockly.Dcg.prefixLines(d+"\n","# "));for(var e=0;e<a.inputList.length;e++)a.inputList[e].type==Blockly.INPUT_VALUE&&(d=a.inputList[e].connection.targetBlock())&&(d=Blockly.Dcg.allNestedComments(d))&&(c+=Blockly.Dcg.prefixLines(d,"# "))}e=a.nextConnection&&a.nextConnection.targetBlock();
e=Blockly.Dcg.blockToCode(e);return c+b+e};Blockly.Dcg.getAdjustedInt=function(a,b,c,d){c=c||0;a.workspace.options.oneBasedIndex&&c--;var e=a.workspace.options.oneBasedIndex?"1":"0";a=Blockly.Dcg.valueToCode(a,b,c?Blockly.Dcg.ORDER_ADDITIVE:Blockly.Dcg.ORDER_NONE)||e;Blockly.isNumber(a)?(a=parseInt(a,10)+c,d&&(a=-a)):(a=0<c?"int("+a+" + "+c+")":0>c?"int("+a+" - "+-c+")":"int("+a+")",d&&(a="-"+a));return a};Blockly.Dcg.math={};Blockly.Dcg.addReservedWords("math,random,Number");Blockly.Dcg.math_number=function(a){a=parseFloat(a.getFieldValue("NUM"));var b;Infinity==a?(a='float("inf")',b=Blockly.Dcg.ORDER_FUNCTION_CALL):-Infinity==a?(a='-float("inf")',b=Blockly.Dcg.ORDER_UNARY_SIGN):b=0>a?Blockly.Dcg.ORDER_UNARY_SIGN:Blockly.Dcg.ORDER_ATOMIC;return[a,b]};
Blockly.Dcg.math_arithmetic=function(a){var b={ADD:[" + ",Blockly.Dcg.ORDER_ADDITIVE],MINUS:[" - ",Blockly.Dcg.ORDER_ADDITIVE],MULTIPLY:[" * ",Blockly.Dcg.ORDER_MULTIPLICATIVE],DIVIDE:[" / ",Blockly.Dcg.ORDER_MULTIPLICATIVE],POWER:[" ** ",Blockly.Dcg.ORDER_EXPONENTIATION]}[a.getFieldValue("OP")],c=b[0],b=b[1],d=Blockly.Dcg.valueToCode(a,"A",b)||"0";a=Blockly.Dcg.valueToCode(a,"B",b)||"0";return[d+c+a,b]};
Blockly.Dcg.math_single=function(a){var b=a.getFieldValue("OP"),c;if("NEG"==b)return c=Blockly.Dcg.valueToCode(a,"NUM",Blockly.Dcg.ORDER_UNARY_SIGN)||"0",["-"+c,Blockly.Dcg.ORDER_UNARY_SIGN];Blockly.Dcg.definitions_.import_math="import math";a="SIN"==b||"COS"==b||"TAN"==b?Blockly.Dcg.valueToCode(a,"NUM",Blockly.Dcg.ORDER_MULTIPLICATIVE)||"0":Blockly.Dcg.valueToCode(a,"NUM",Blockly.Dcg.ORDER_NONE)||"0";switch(b){case "ABS":c="math.fabs("+a+")";break;case "ROOT":c="math.sqrt("+a+")";break;case "LN":c=
"math.log("+a+")";break;case "LOG10":c="math.log10("+a+")";break;case "EXP":c="math.exp("+a+")";break;case "POW10":c="math.pow(10,"+a+")";break;case "ROUND":c="round("+a+")";break;case "ROUNDUP":c="math.ceil("+a+")";break;case "ROUNDDOWN":c="math.floor("+a+")";break;case "SIN":c="math.sin("+a+" / 180.0 * math.pi)";break;case "COS":c="math.cos("+a+" / 180.0 * math.pi)";break;case "TAN":c="math.tan("+a+" / 180.0 * math.pi)"}if(c)return[c,Blockly.Dcg.ORDER_FUNCTION_CALL];switch(b){case "ASIN":c="math.asin("+
a+") / math.pi * 180";break;case "ACOS":c="math.acos("+a+") / math.pi * 180";break;case "ATAN":c="math.atan("+a+") / math.pi * 180";break;default:throw"Unknown math operator: "+b;}return[c,Blockly.Dcg.ORDER_MULTIPLICATIVE]};
Blockly.Dcg.math_constant=function(a){var b={PI:["math.pi",Blockly.Dcg.ORDER_MEMBER],E:["math.e",Blockly.Dcg.ORDER_MEMBER],GOLDEN_RATIO:["(1 + math.sqrt(5)) / 2",Blockly.Dcg.ORDER_MULTIPLICATIVE],SQRT2:["math.sqrt(2)",Blockly.Dcg.ORDER_MEMBER],SQRT1_2:["math.sqrt(1.0 / 2)",Blockly.Dcg.ORDER_MEMBER],INFINITY:["float('inf')",Blockly.Dcg.ORDER_ATOMIC]};a=a.getFieldValue("CONSTANT");"INFINITY"!=a&&(Blockly.Dcg.definitions_.import_math="import math");return b[a]};
Blockly.Dcg.math_number_property=function(a){var b=Blockly.Dcg.valueToCode(a,"NUMBER_TO_CHECK",Blockly.Dcg.ORDER_MULTIPLICATIVE)||"0",c=a.getFieldValue("PROPERTY"),d;if("PRIME"==c)return Blockly.Dcg.definitions_.import_math="import math",Blockly.Dcg.definitions_.from_numbers_import_Number="from numbers import Number",[Blockly.Dcg.provideFunction_("math_isPrime",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(n):","  # https://en.wikipedia.org/wiki/Primality_test#Naive_methods","  # If n is not a number but a string, try parsing it.",
"  if not isinstance(n, Number):","    try:","      n = float(n)","    except:","      return False","  if n == 2 or n == 3:","    return True","  # False if n is negative, is 1, or not whole, or if n is divisible by 2 or 3.","  if n <= 1 or n % 1 != 0 or n % 2 == 0 or n % 3 == 0:","    return False","  # Check all the numbers of form 6k +/- 1, up to sqrt(n).","  for x in range(6, int(math.sqrt(n)) + 2, 6):","    if n % (x - 1) == 0 or n % (x + 1) == 0:","      return False","  return True"])+"("+
b+")",Blockly.Dcg.ORDER_FUNCTION_CALL];switch(c){case "EVEN":d=b+" % 2 == 0";break;case "ODD":d=b+" % 2 == 1";break;case "WHOLE":d=b+" % 1 == 0";break;case "POSITIVE":d=b+" > 0";break;case "NEGATIVE":d=b+" < 0";break;case "DIVISIBLE_BY":a=Blockly.Dcg.valueToCode(a,"DIVISOR",Blockly.Dcg.ORDER_MULTIPLICATIVE);if(!a||"0"==a)return["False",Blockly.Dcg.ORDER_ATOMIC];d=b+" % "+a+" == 0"}return[d,Blockly.Dcg.ORDER_RELATIONAL]};
Blockly.Dcg.math_change=function(a){Blockly.Dcg.definitions_.from_numbers_import_Number="from numbers import Number";var b=Blockly.Dcg.valueToCode(a,"DELTA",Blockly.Dcg.ORDER_ADDITIVE)||"0";a=Blockly.Dcg.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);return a+" = ("+a+" if isinstance("+a+", Number) else 0) + "+b+"\n"};Blockly.Dcg.math_round=Blockly.Dcg.math_single;Blockly.Dcg.math_trig=Blockly.Dcg.math_single;
Blockly.Dcg.math_on_list=function(a){var b=a.getFieldValue("OP");a=Blockly.Dcg.valueToCode(a,"LIST",Blockly.Dcg.ORDER_NONE)||"[]";switch(b){case "SUM":b="sum("+a+")";break;case "MIN":b="min("+a+")";break;case "MAX":b="max("+a+")";break;case "AVERAGE":Blockly.Dcg.definitions_.from_numbers_import_Number="from numbers import Number";b=Blockly.Dcg.provideFunction_("math_mean",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(myList):","  localList = [e for e in myList if isinstance(e, Number)]","  if not localList: return",
"  return float(sum(localList)) / len(localList)"]);b=b+"("+a+")";break;case "MEDIAN":Blockly.Dcg.definitions_.from_numbers_import_Number="from numbers import Number";b=Blockly.Dcg.provideFunction_("math_median",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(myList):","  localList = sorted([e for e in myList if isinstance(e, Number)])","  if not localList: return","  if len(localList) % 2 == 0:","    return (localList[len(localList) // 2 - 1] + localList[len(localList) // 2]) / 2.0","  else:","    return localList[(len(localList) - 1) // 2]"]);
b=b+"("+a+")";break;case "MODE":b=Blockly.Dcg.provideFunction_("math_modes",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(some_list):","  modes = []","  # Using a lists of [item, count] to keep count rather than dict",'  # to avoid "unhashable" errors when the counted item is itself a list or dict.',"  counts = []","  maxCount = 1","  for item in some_list:","    found = False","    for count in counts:","      if count[0] == item:","        count[1] += 1","        maxCount = max(maxCount, count[1])",
"        found = True","    if not found:","      counts.append([item, 1])","  for counted_item, item_count in counts:","    if item_count == maxCount:","      modes.append(counted_item)","  return modes"]);b=b+"("+a+")";break;case "STD_DEV":Blockly.Dcg.definitions_.import_math="import math";b=Blockly.Dcg.provideFunction_("math_standard_deviation",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(numbers):","  n = len(numbers)","  if n == 0: return","  mean = float(sum(numbers)) / n","  variance = sum((x - mean) ** 2 for x in numbers) / n",
"  return math.sqrt(variance)"]);b=b+"("+a+")";break;case "RANDOM":Blockly.Dcg.definitions_.import_random="import random";b="random.choice("+a+")";break;default:throw"Unknown operator: "+b;}return[b,Blockly.Dcg.ORDER_FUNCTION_CALL]};Blockly.Dcg.math_modulo=function(a){var b=Blockly.Dcg.valueToCode(a,"DIVIDEND",Blockly.Dcg.ORDER_MULTIPLICATIVE)||"0";a=Blockly.Dcg.valueToCode(a,"DIVISOR",Blockly.Dcg.ORDER_MULTIPLICATIVE)||"0";return[b+" % "+a,Blockly.Dcg.ORDER_MULTIPLICATIVE]};
Blockly.Dcg.math_constrain=function(a){var b=Blockly.Dcg.valueToCode(a,"VALUE",Blockly.Dcg.ORDER_NONE)||"0",c=Blockly.Dcg.valueToCode(a,"LOW",Blockly.Dcg.ORDER_NONE)||"0";a=Blockly.Dcg.valueToCode(a,"HIGH",Blockly.Dcg.ORDER_NONE)||"float('inf')";return["min(max("+b+", "+c+"), "+a+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};
Blockly.Dcg.math_random_int=function(a){Blockly.Dcg.definitions_.import_random="import random";var b=Blockly.Dcg.valueToCode(a,"FROM",Blockly.Dcg.ORDER_NONE)||"0";a=Blockly.Dcg.valueToCode(a,"TO",Blockly.Dcg.ORDER_NONE)||"0";return["random.randint("+b+", "+a+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};Blockly.Dcg.math_random_float=function(a){Blockly.Dcg.definitions_.import_random="import random";return["random.random()",Blockly.Dcg.ORDER_FUNCTION_CALL]};Blockly.Dcg.logic={};Blockly.Dcg.controls_if=function(a){var b=0,c="",d,e;do e=Blockly.Dcg.valueToCode(a,"IF"+b,Blockly.Dcg.ORDER_NONE)||"false",d=Blockly.Dcg.statementToCode(a,"DO"+b)||Blockly.Dcg.PASS,c+=(0==b?"if ":"elif ")+e+":\n"+d,++b;while(a.getInput("IF"+b));a.getInput("ELSE")&&(d=Blockly.Dcg.statementToCode(a,"ELSE")||Blockly.Dcg.PASS,c+="else:\n"+d);return c};Blockly.Dcg.controls_ifelse=Blockly.Dcg.controls_if;
Blockly.Dcg.logic_compare=function(a){var b={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="}[a.getFieldValue("OP")],c=Blockly.Dcg.ORDER_RELATIONAL,d=Blockly.Dcg.valueToCode(a,"A",c)||"0";a=Blockly.Dcg.valueToCode(a,"B",c)||"0";return[d+" "+b+" "+a,c]};
Blockly.Dcg.logic_operation=function(a){var b="AND"==a.getFieldValue("OP")?"and":"or",c="and"==b?Blockly.Dcg.ORDER_LOGICAL_AND:Blockly.Dcg.ORDER_LOGICAL_OR,d=Blockly.Dcg.valueToCode(a,"A",c);a=Blockly.Dcg.valueToCode(a,"B",c);if(d||a){var e="and"==b?"True":"False";d||(d=e);a||(a=e)}else a=d="False";return[d+" "+b+" "+a,c]};Blockly.Dcg.logic_negate=function(a){return["not "+(Blockly.Dcg.valueToCode(a,"BOOL",Blockly.Dcg.ORDER_LOGICAL_NOT)||"True"),Blockly.Dcg.ORDER_LOGICAL_NOT]};
Blockly.Dcg.logic_boolean=function(a){return["TRUE"==a.getFieldValue("BOOL")?"True":"False",Blockly.Dcg.ORDER_ATOMIC]};Blockly.Dcg.logic_null=function(a){return["None",Blockly.Dcg.ORDER_ATOMIC]};Blockly.Dcg.logic_ternary=function(a){var b=Blockly.Dcg.valueToCode(a,"IF",Blockly.Dcg.ORDER_CONDITIONAL)||"False",c=Blockly.Dcg.valueToCode(a,"THEN",Blockly.Dcg.ORDER_CONDITIONAL)||"None";a=Blockly.Dcg.valueToCode(a,"ELSE",Blockly.Dcg.ORDER_CONDITIONAL)||"None";return[c+" if "+b+" else "+a,Blockly.Dcg.ORDER_CONDITIONAL]};Blockly.Dcg.colour={};Blockly.Dcg.colour_picker=function(a){return["'"+a.getFieldValue("COLOUR")+"'",Blockly.Dcg.ORDER_ATOMIC]};Blockly.Dcg.colour_random=function(a){Blockly.Dcg.definitions_.import_random="import random";return["'#%06x' % random.randint(0, 2**24 - 1)",Blockly.Dcg.ORDER_FUNCTION_CALL]};
Blockly.Dcg.colour_rgb=function(a){var b=Blockly.Dcg.provideFunction_("colour_rgb",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(r, g, b):","  r = round(min(100, max(0, r)) * 2.55)","  g = round(min(100, max(0, g)) * 2.55)","  b = round(min(100, max(0, b)) * 2.55)","  return '#%02x%02x%02x' % (r, g, b)"]),c=Blockly.Dcg.valueToCode(a,"RED",Blockly.Dcg.ORDER_NONE)||0,d=Blockly.Dcg.valueToCode(a,"GREEN",Blockly.Dcg.ORDER_NONE)||0;a=Blockly.Dcg.valueToCode(a,"BLUE",Blockly.Dcg.ORDER_NONE)||0;return[b+
"("+c+", "+d+", "+a+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};
Blockly.Dcg.colour_blend=function(a){var b=Blockly.Dcg.provideFunction_("colour_blend",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(colour1, colour2, ratio):","  r1, r2 = int(colour1[1:3], 16), int(colour2[1:3], 16)","  g1, g2 = int(colour1[3:5], 16), int(colour2[3:5], 16)","  b1, b2 = int(colour1[5:7], 16), int(colour2[5:7], 16)","  ratio = min(1, max(0, ratio))","  r = round(r1 * (1 - ratio) + r2 * ratio)","  g = round(g1 * (1 - ratio) + g2 * ratio)","  b = round(b1 * (1 - ratio) + b2 * ratio)",
"  return '#%02x%02x%02x' % (r, g, b)"]),c=Blockly.Dcg.valueToCode(a,"COLOUR1",Blockly.Dcg.ORDER_NONE)||"'#000000'",d=Blockly.Dcg.valueToCode(a,"COLOUR2",Blockly.Dcg.ORDER_NONE)||"'#000000'";a=Blockly.Dcg.valueToCode(a,"RATIO",Blockly.Dcg.ORDER_NONE)||0;return[b+"("+c+", "+d+", "+a+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};Blockly.Dcg.lists={};Blockly.Dcg.lists_create_empty=function(a){return["[]",Blockly.Dcg.ORDER_ATOMIC]};Blockly.Dcg.lists_create_with=function(a){for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)b[c]=Blockly.Dcg.valueToCode(a,"ADD"+c,Blockly.Dcg.ORDER_NONE)||"None";return["["+b.join(", ")+"]",Blockly.Dcg.ORDER_ATOMIC]};
Blockly.Dcg.lists_repeat=function(a){var b=Blockly.Dcg.valueToCode(a,"ITEM",Blockly.Dcg.ORDER_NONE)||"None";a=Blockly.Dcg.valueToCode(a,"NUM",Blockly.Dcg.ORDER_MULTIPLICATIVE)||"0";return["["+b+"] * "+a,Blockly.Dcg.ORDER_MULTIPLICATIVE]};Blockly.Dcg.lists_length=function(a){return["len("+(Blockly.Dcg.valueToCode(a,"VALUE",Blockly.Dcg.ORDER_NONE)||"[]")+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};
Blockly.Dcg.lists_isEmpty=function(a){return["not len("+(Blockly.Dcg.valueToCode(a,"VALUE",Blockly.Dcg.ORDER_NONE)||"[]")+")",Blockly.Dcg.ORDER_LOGICAL_NOT]};
Blockly.Dcg.lists_indexOf=function(a){var b=Blockly.Dcg.valueToCode(a,"FIND",Blockly.Dcg.ORDER_NONE)||"[]",c=Blockly.Dcg.valueToCode(a,"VALUE",Blockly.Dcg.ORDER_NONE)||"''";if(a.workspace.options.oneBasedIndex)var d=" 0",e=" + 1",f="";else d=" -1",e="",f=" - 1";if("FIRST"==a.getFieldValue("END"))return a=Blockly.Dcg.provideFunction_("first_index",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(my_list, elem):","  try: index = my_list.index(elem)"+e,"  except: index ="+d,"  return index"]),[a+"("+
c+", "+b+")",Blockly.Dcg.ORDER_FUNCTION_CALL];a=Blockly.Dcg.provideFunction_("last_index",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(my_list, elem):","  try: index = len(my_list) - my_list[::-1].index(elem)"+f,"  except: index ="+d,"  return index"]);return[a+"("+c+", "+b+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};
Blockly.Dcg.lists_getIndex=function(a){var b=a.getFieldValue("MODE")||"GET",c=a.getFieldValue("WHERE")||"FROM_START",d=Blockly.Dcg.valueToCode(a,"VALUE","RANDOM"==c?Blockly.Dcg.ORDER_NONE:Blockly.Dcg.ORDER_MEMBER)||"[]";switch(c){case "FIRST":if("GET"==b)return[d+"[0]",Blockly.Dcg.ORDER_MEMBER];if("GET_REMOVE"==b)return[d+".pop(0)",Blockly.Dcg.ORDER_FUNCTION_CALL];if("REMOVE"==b)return d+".pop(0)\n";break;case "LAST":if("GET"==b)return[d+"[-1]",Blockly.Dcg.ORDER_MEMBER];if("GET_REMOVE"==b)return[d+
".pop()",Blockly.Dcg.ORDER_FUNCTION_CALL];if("REMOVE"==b)return d+".pop()\n";break;case "FROM_START":a=Blockly.Dcg.getAdjustedInt(a,"AT");if("GET"==b)return[d+"["+a+"]",Blockly.Dcg.ORDER_MEMBER];if("GET_REMOVE"==b)return[d+".pop("+a+")",Blockly.Dcg.ORDER_FUNCTION_CALL];if("REMOVE"==b)return d+".pop("+a+")\n";break;case "FROM_END":a=Blockly.Dcg.getAdjustedInt(a,"AT",1,!0);if("GET"==b)return[d+"["+a+"]",Blockly.Dcg.ORDER_MEMBER];if("GET_REMOVE"==b)return[d+".pop("+a+")",Blockly.Dcg.ORDER_FUNCTION_CALL];
if("REMOVE"==b)return d+".pop("+a+")\n";break;case "RANDOM":Blockly.Dcg.definitions_.import_random="import random";if("GET"==b)return["random.choice("+d+")",Blockly.Dcg.ORDER_FUNCTION_CALL];d=Blockly.Dcg.provideFunction_("lists_remove_random_item",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(myList):","  x = int(random.random() * len(myList))","  return myList.pop(x)"])+"("+d+")";if("GET_REMOVE"==b)return[d,Blockly.Dcg.ORDER_FUNCTION_CALL];if("REMOVE"==b)return d+"\n"}throw"Unhandled combination (lists_getIndex).";
};
Blockly.Dcg.lists_setIndex=function(a){var b=Blockly.Dcg.valueToCode(a,"LIST",Blockly.Dcg.ORDER_MEMBER)||"[]",c=a.getFieldValue("MODE")||"GET",d=a.getFieldValue("WHERE")||"FROM_START",e=Blockly.Dcg.valueToCode(a,"TO",Blockly.Dcg.ORDER_NONE)||"None";switch(d){case "FIRST":if("SET"==c)return b+"[0] = "+e+"\n";if("INSERT"==c)return b+".insert(0, "+e+")\n";break;case "LAST":if("SET"==c)return b+"[-1] = "+e+"\n";if("INSERT"==c)return b+".append("+e+")\n";break;case "FROM_START":a=Blockly.Dcg.getAdjustedInt(a,"AT");
if("SET"==c)return b+"["+a+"] = "+e+"\n";if("INSERT"==c)return b+".insert("+a+", "+e+")\n";break;case "FROM_END":a=Blockly.Dcg.getAdjustedInt(a,"AT",1,!0);if("SET"==c)return b+"["+a+"] = "+e+"\n";if("INSERT"==c)return b+".insert("+a+", "+e+")\n";break;case "RANDOM":Blockly.Dcg.definitions_.import_random="import random";b.match(/^\w+$/)?a="":(a=Blockly.Dcg.variableDB_.getDistinctName("tmp_list",Blockly.Variables.NAME_TYPE),d=a+" = "+b+"\n",b=a,a=d);d=Blockly.Dcg.variableDB_.getDistinctName("tmp_x",
Blockly.Variables.NAME_TYPE);a+=d+" = int(random.random() * len("+b+"))\n";if("SET"==c)return a+(b+"["+d+"] = "+e+"\n");if("INSERT"==c)return a+(b+".insert("+d+", "+e+")\n")}throw"Unhandled combination (lists_setIndex).";};
Blockly.Dcg.lists_getSublist=function(a){var b=Blockly.Dcg.valueToCode(a,"LIST",Blockly.Dcg.ORDER_MEMBER)||"[]",c=a.getFieldValue("WHERE1"),d=a.getFieldValue("WHERE2");switch(c){case "FROM_START":c=Blockly.Dcg.getAdjustedInt(a,"AT1");"0"==c&&(c="");break;case "FROM_END":c=Blockly.Dcg.getAdjustedInt(a,"AT1",1,!0);break;case "FIRST":c="";break;default:throw"Unhandled option (lists_getSublist)";}switch(d){case "FROM_START":a=Blockly.Dcg.getAdjustedInt(a,"AT2",1);break;case "FROM_END":a=Blockly.Dcg.getAdjustedInt(a,
"AT2",0,!0);Blockly.isNumber(String(a))?"0"==a&&(a=""):(Blockly.Dcg.definitions_.import_sys="import sys",a+=" or sys.maxsize");break;case "LAST":a="";break;default:throw"Unhandled option (lists_getSublist)";}return[b+"["+c+" : "+a+"]",Blockly.Dcg.ORDER_MEMBER]};
Blockly.Dcg.lists_sort=function(a){var b=Blockly.Dcg.valueToCode(a,"LIST",Blockly.Dcg.ORDER_NONE)||"[]",c=a.getFieldValue("TYPE");a="1"===a.getFieldValue("DIRECTION")?"False":"True";return[Blockly.Dcg.provideFunction_("lists_sort",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(my_list, type, reverse):","  def try_float(s):","    try:","      return float(s)","    except:","      return 0","  key_funcs = {",'    "NUMERIC": try_float,','    "TEXT": str,','    "IGNORE_CASE": lambda s: str(s).lower()',
"  }","  key_func = key_funcs[type]","  list_cpy = list(my_list)","  return sorted(list_cpy, key=key_func, reverse=reverse)"])+"("+b+', "'+c+'", '+a+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};
Blockly.Dcg.lists_split=function(a){var b=a.getFieldValue("MODE");if("SPLIT"==b)b=Blockly.Dcg.valueToCode(a,"INPUT",Blockly.Dcg.ORDER_MEMBER)||"''",a=Blockly.Dcg.valueToCode(a,"DELIM",Blockly.Dcg.ORDER_NONE),a=b+".split("+a+")";else if("JOIN"==b)b=Blockly.Dcg.valueToCode(a,"INPUT",Blockly.Dcg.ORDER_NONE)||"[]",a=Blockly.Dcg.valueToCode(a,"DELIM",Blockly.Dcg.ORDER_MEMBER)||"''",a=a+".join("+b+")";else throw"Unknown mode: "+b;return[a,Blockly.Dcg.ORDER_FUNCTION_CALL]};Blockly.Dcg.texts={};Blockly.Dcg.text=function(a){return[Blockly.Dcg.quote_(a.getFieldValue("TEXT")),Blockly.Dcg.ORDER_ATOMIC]};
Blockly.Python.text_join=function(a){switch(a.itemCount_){case 0:return["''",Blockly.Python.ORDER_ATOMIC];case 1:return["str("+(Blockly.Python.valueToCode(a,"ADD0",Blockly.Python.ORDER_NONE)||"''")+")",Blockly.Python.ORDER_FUNCTION_CALL];case 2:var b=Blockly.Python.valueToCode(a,"ADD0",Blockly.Python.ORDER_NONE)||"''";a=Blockly.Python.valueToCode(a,"ADD1",Blockly.Python.ORDER_NONE)||"''";return["str("+b+") + str("+a+")",Blockly.Python.ORDER_ADDITIVE];default:for(var b=[],c=0;c<a.itemCount_;c++)b[c]=
Blockly.Python.valueToCode(a,"ADD"+c,Blockly.Python.ORDER_NONE)||"''";a=Blockly.Python.variableDB_.getDistinctName("x",Blockly.Variables.NAME_TYPE);a="''.join([str("+a+") for "+a+" in ["+b.join(", ")+"]])";return[a,Blockly.Python.ORDER_FUNCTION_CALL]}};Blockly.Python.text_append=function(a){var b=Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);a=Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_NONE)||"''";return b+" = str("+b+") + str("+a+")\n"};
Blockly.Python.text_length=function(a){return["len("+(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"''")+")",Blockly.Python.ORDER_FUNCTION_CALL]};Blockly.Python.text_isEmpty=function(a){return["not len("+(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"''")+")",Blockly.Python.ORDER_LOGICAL_NOT]};
Blockly.Python.text_indexOf=function(a){var b="FIRST"==a.getFieldValue("END")?"find":"rfind",c=Blockly.Python.valueToCode(a,"FIND",Blockly.Python.ORDER_NONE)||"''",b=(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_MEMBER)||"''")+"."+b+"("+c+")";return a.workspace.options.oneBasedIndex?[b+" + 1",Blockly.Python.ORDER_ADDITIVE]:[b,Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.text_charAt=function(a){var b=a.getFieldValue("WHERE")||"FROM_START",c=Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_MEMBER)||"''";switch(b){case "FIRST":return[c+"[0]",Blockly.Python.ORDER_MEMBER];case "LAST":return[c+"[-1]",Blockly.Python.ORDER_MEMBER];case "FROM_START":return a=Blockly.Python.getAdjustedInt(a,"AT"),[c+"["+a+"]",Blockly.Python.ORDER_MEMBER];case "FROM_END":return a=Blockly.Python.getAdjustedInt(a,"AT",1,!0),[c+"["+a+"]",Blockly.Python.ORDER_MEMBER];case "RANDOM":return Blockly.Python.definitions_.import_random=
"import random",[Blockly.Python.provideFunction_("text_random_letter",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(text):","  x = int(random.random() * len(text))","  return text[x];"])+"("+c+")",Blockly.Python.ORDER_FUNCTION_CALL]}throw"Unhandled option (text_charAt).";};
Blockly.Python.text_getSubstring=function(a){var b=a.getFieldValue("WHERE1"),c=a.getFieldValue("WHERE2"),d=Blockly.Python.valueToCode(a,"STRING",Blockly.Python.ORDER_MEMBER)||"''";switch(b){case "FROM_START":b=Blockly.Python.getAdjustedInt(a,"AT1");"0"==b&&(b="");break;case "FROM_END":b=Blockly.Python.getAdjustedInt(a,"AT1",1,!0);break;case "FIRST":b="";break;default:throw"Unhandled option (text_getSubstring)";}switch(c){case "FROM_START":a=Blockly.Python.getAdjustedInt(a,"AT2",1);break;case "FROM_END":a=
Blockly.Python.getAdjustedInt(a,"AT2",0,!0);Blockly.isNumber(String(a))?"0"==a&&(a=""):(Blockly.Python.definitions_.import_sys="import sys",a+=" or sys.maxsize");break;case "LAST":a="";break;default:throw"Unhandled option (text_getSubstring)";}return[d+"["+b+" : "+a+"]",Blockly.Python.ORDER_MEMBER]};
Blockly.Python.text_changeCase=function(a){var b={UPPERCASE:".upper()",LOWERCASE:".lower()",TITLECASE:".title()"}[a.getFieldValue("CASE")];return[(Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_MEMBER)||"''")+b,Blockly.Python.ORDER_FUNCTION_CALL]};Blockly.Python.text_trim=function(a){var b={LEFT:".lstrip()",RIGHT:".rstrip()",BOTH:".strip()"}[a.getFieldValue("MODE")];return[(Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_MEMBER)||"''")+b,Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Dcg.text_print=function(a){console.log("In text_print");return"print("+(Blockly.Dcg.valueToCode(a,"TEXT",Blockly.Dcg.ORDER_NONE)||"''")+")\n"};
Blockly.Dcg.text_prompt_ext=function(a){var b=Blockly.Dcg.provideFunction_("text_prompt",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(msg):","  try:","    return raw_input(msg)","  except NameError:","    return input(msg)"]),c=a.getField("TEXT")?Blockly.Dcg.quote_(a.getFieldValue("TEXT")):Blockly.Dcg.valueToCode(a,"TEXT",Blockly.Python.ORDER_NONE)||"''",b=b+"("+c+")";"NUMBER"==a.getFieldValue("TYPE")&&(b="float("+b+")");return[b,Blockly.Python.ORDER_FUNCTION_CALL]};Blockly.Dcg.text_prompt=Blockly.Dcg.text_prompt_ext;Blockly.Dcg.variables={};Blockly.Dcg.variables_get=function(a){return[Blockly.Dcg.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),Blockly.Dcg.ORDER_ATOMIC]};Blockly.Dcg.variables_set=function(a){var b=Blockly.Dcg.valueToCode(a,"VALUE",Blockly.Dcg.ORDER_NONE)||"0";return Blockly.Dcg.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+" = "+b+"\n"};Blockly.Dcg.loops={};Blockly.Dcg.controls_repeat_ext=function(a){var b=a.getField("TIMES")?String(parseInt(a.getFieldValue("TIMES"),10)):Blockly.Dcg.valueToCode(a,"TIMES",Blockly.Dcg.ORDER_NONE)||"0",b=Blockly.isNumber(b)?parseInt(b,10):"int("+b+")",c=Blockly.Dcg.statementToCode(a,"DO"),c=Blockly.Dcg.addLoopTrap(c,a.id)||Blockly.Dcg.PASS;return"for "+Blockly.Dcg.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE)+" in range("+b+"):\n"+c};Blockly.Dcg.controls_repeat=Blockly.Dcg.controls_repeat_ext;
Blockly.Dcg.controls_whileUntil=function(a){var b="UNTIL"==a.getFieldValue("MODE"),c=Blockly.Dcg.valueToCode(a,"BOOL",b?Blockly.Dcg.ORDER_LOGICAL_NOT:Blockly.Dcg.ORDER_NONE)||"False",d=Blockly.Dcg.statementToCode(a,"DO"),d=Blockly.Dcg.addLoopTrap(d,a.id)||Blockly.Dcg.PASS;b&&(c="not "+c);return"while "+c+":\n"+d};
Blockly.Dcg.controls_for=function(a){var b=Blockly.Dcg.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Dcg.valueToCode(a,"FROM",Blockly.Dcg.ORDER_NONE)||"0",d=Blockly.Dcg.valueToCode(a,"TO",Blockly.Dcg.ORDER_NONE)||"0",e=Blockly.Dcg.valueToCode(a,"BY",Blockly.Dcg.ORDER_NONE)||"1",f=Blockly.Dcg.statementToCode(a,"DO"),f=Blockly.Dcg.addLoopTrap(f,a.id)||Blockly.Dcg.PASS,g="",h=function(){return Blockly.Dcg.provideFunction_("upRange",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+
"(start, stop, step):","  while start <= stop:","    yield start","    start += abs(step)"])},k=function(){return Blockly.Dcg.provideFunction_("downRange",["def "+Blockly.Dcg.FUNCTION_NAME_PLACEHOLDER_+"(start, stop, step):","  while start >= stop:","    yield start","    start -= abs(step)"])};a=function(a,b,c){return"("+a+" <= "+b+") and "+h()+"("+a+", "+b+", "+c+") or "+k()+"("+a+", "+b+", "+c+")"};if(Blockly.isNumber(c)&&Blockly.isNumber(d)&&Blockly.isNumber(e))c=parseFloat(c),d=parseFloat(d),
e=Math.abs(parseFloat(e)),0===c%1&&0===d%1&&0===e%1?(c<=d?(d++,a=0==c&&1==e?d:c+", "+d,1!=e&&(a+=", "+e)):(d--,a=c+", "+d+", -"+e),a="range("+a+")"):(a=c<d?h():k(),a+="("+c+", "+d+", "+e+")");else{var l=function(a,c){if(Blockly.isNumber(a))a=parseFloat(a);else if(a.match(/^\w+$/))a="float("+a+")";else{var d=Blockly.Dcg.variableDB_.getDistinctName(b+c,Blockly.Variables.NAME_TYPE);g+=d+" = float("+a+")\n";a=d}return a},c=l(c,"_start"),d=l(d,"_end");l(e,"_inc");a="number"==typeof c&&"number"==typeof d?
c<d?h(c,d,e):k(c,d,e):a(c,d,e)}return g+="for "+b+" in "+a+":\n"+f};Blockly.Dcg.controls_forEach=function(a){var b=Blockly.Dcg.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Dcg.valueToCode(a,"LIST",Blockly.Dcg.ORDER_RELATIONAL)||"[]",d=Blockly.Dcg.statementToCode(a,"DO"),d=Blockly.Dcg.addLoopTrap(d,a.id)||Blockly.Dcg.PASS;return"for "+b+" in "+c+":\n"+d};
Blockly.Dcg.controls_flow_statements=function(a){switch(a.getFieldValue("FLOW")){case "BREAK":return"break\n";case "CONTINUE":return"continue\n"}throw"Unknown flow statement.";};Blockly.Dcg.procedures={};
Blockly.Dcg.procedures_defreturn=function(a){for(var b=[],c=0,d;d=a.workspace.variableList[c];c++)-1==a.arguments_.indexOf(d)&&b.push(Blockly.Dcg.variableDB_.getName(d,Blockly.Variables.NAME_TYPE));b=b.length?"  global "+b.join(", ")+"\n":"";d=Blockly.Dcg.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE);var e=Blockly.Dcg.statementToCode(a,"STACK");Blockly.Dcg.STATEMENT_PREFIX&&(e=Blockly.Dcg.prefixLines(Blockly.Dcg.STATEMENT_PREFIX.replace(/%1/g,"'"+a.id+"'"),Blockly.Dcg.INDENT)+
e);Blockly.Dcg.INFINITE_LOOP_TRAP&&(e=Blockly.Dcg.INFINITE_LOOP_TRAP.replace(/%1/g,'"'+a.id+'"')+e);var f=Blockly.Dcg.valueToCode(a,"RETURN",Blockly.Dcg.ORDER_NONE)||"";f?f="  return "+f+"\n":e||(e=Blockly.Dcg.PASS);for(var g=[],c=0;c<a.arguments_.length;c++)g[c]=Blockly.Dcg.variableDB_.getName(a.arguments_[c],Blockly.Variables.NAME_TYPE);b="def "+d+"("+g.join(", ")+"):\n"+b+e+f;b=Blockly.Dcg.scrub_(a,b);Blockly.Dcg.definitions_["%"+d]=b;return null};Blockly.Dcg.procedures_defnoreturn=Blockly.Dcg.procedures_defreturn;
Blockly.Dcg.procedures_callreturn=function(a){for(var b=Blockly.Dcg.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Dcg.valueToCode(a,"ARG"+d,Blockly.Dcg.ORDER_NONE)||"None";return[b+"("+c.join(", ")+")",Blockly.Dcg.ORDER_FUNCTION_CALL]};
Blockly.Dcg.procedures_callnoreturn=function(a){for(var b=Blockly.Dcg.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Dcg.valueToCode(a,"ARG"+d,Blockly.Dcg.ORDER_NONE)||"None";return b+"("+c.join(", ")+")\n"};
Blockly.Dcg.procedures_ifreturn=function(a){var b="if "+(Blockly.Dcg.valueToCode(a,"CONDITION",Blockly.Dcg.ORDER_NONE)||"False")+":\n";a.hasReturnValue_?(a=Blockly.Dcg.valueToCode(a,"VALUE",Blockly.Dcg.ORDER_NONE)||"None",b+="  return "+a+"\n"):b+="  return\n";return b};