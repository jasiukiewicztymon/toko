import { TokenRule, tokenize, default_meta } from '../src/index';

let ARRAY_DELIMITER: TokenRule = { type: "ARRAY_DELIMITER", selector: /\[|\]/, meta: default_meta}
let GROUPE_DELIMITER: TokenRule = { type: "GROUPE_DELIMITER", selector: /\(|\)/, meta: default_meta}
let SCOPE_DELIMITER: TokenRule = { type: "SCOPE_DELIMITER", selector: /\{|\}/, meta: default_meta}
let STRING: TokenRule = { type: "STRING", selector: /"(?:[^\\"]|\\(?:.|$))*"|'(?:[^\\"]|\\(?:.|$))*'/, meta: default_meta};
let NEW_LINE: TokenRule = { type: "NEW_LINE", selector: /\n/, meta: default_meta };
let ITERATOR: TokenRule = { type: "ITERATOR", selector: /in/, meta: default_meta};
let SWITCH: TokenRule = { type: "SWITCH", selector: /case|switch/, meta: default_meta };
let GOTO: TokenRule = { type: "GOTO", selector: /break|continue/, meta: default_meta };
let CLASS: TokenRule = { type: "CLASS", selector: /class|super|extends|static/, meta: default_meta};
let ASYNC: TokenRule = { type: "ASYNC", selector: /async|await/, meta: default_meta};
let EXPORT: TokenRule = { type: "EXPORT", selector: /export|import|default/, meta: default_meta};
let TYPE: TokenRule = { type: "TYPE", selector: /let|var|const|void|function/, meta: default_meta};
let ERROR: TokenRule = { type: "ERROR", selector: /try|catch|finally|throw/, meta: default_meta};
let GENERATOR: TokenRule = { type: "GENERATOR", selector: /yield/, meta: default_meta};
let MEMORY: TokenRule = { type: "MEMORY", selector: /this|new|delete/, meta: default_meta};
let VALUE: TokenRule = { type: "VALUE", selector: /true|false|null/, meta: default_meta};
let DEBBUGER: TokenRule = { type: "DEBBUGER", selector: /debugger/, meta: default_meta}
let STATEMENT: TokenRule = { type: "STATEMENT", selector: /do|else|for|if|while|with/, meta: default_meta};
let TYPE_OPERATOR: TokenRule = { type: "TYPE_OPERATOR", selector: /instanceof|typeof/, meta: default_meta};
let RETURN: TokenRule = { type: "RETURN", selector: /return/, meta: default_meta}
let TEMPLATE: TokenRule = { type: "TEMPLATE", selector: /`(?:[^\\"]|\\(?:.|$))*`/, meta: default_meta};
let COMMENT: TokenRule = { type: "COMMENT", selector: /(\/\/.*?)(\n|$)|\/\*(.*?)(\*\/)/, meta: default_meta};
let NAME: TokenRule = { type: "NAME", selector: /[a-zA-Z_$][a-zA-Z0-9_$]*/, meta: default_meta};
let DELIMITER: TokenRule = { type: "DELIMITER", selector: /[:.,;]/, meta: default_meta};
let OPERATOR: TokenRule = { type: "OPERATOR", selector: /\+|-|\*|\*\*|\/|%|\+\+|--/, meta: default_meta}
let ASSIGN: TokenRule = { type: "ASSIGN", selector: /=|\+=|-=|\*=|\/=|%=|\*\*=/, meta: default_meta};
let COMPARISON: TokenRule = { type: "ASSIGN", selector: /===?|!==?|>=?|<=?|\?/, meta: default_meta};
let LOGICAL_OPERATOR: TokenRule = { type: "LOGICAL_OPERATOR", selector: /&&|\|\||!/, meta: default_meta};
let BETWISE_OPERATOR: TokenRule = { type: "BETWISE_OPERATOR", selector: /&|\||~|\^|<<|>>>?/, meta: default_meta};
let ARROW: TokenRule = { type: "ARROW", selector: /=>/, meta: default_meta}
let NUMBER: TokenRule = { type: "NUMBER", selector: /[0-9](.*?)(\s|$)/, meta: (e) => {
    if (e.reg[e.reg.length - 1] == ' ' || e.reg[e.reg.length - 1] == '\n' || e.reg[e.reg.length - 1] == '\t')
        e.reg = (""+e.reg).substring(0, e.reg.length - 1);
    return e;
}}

console.log(tokenize(
    "x = 'en example string that ca\n use \\\\'; éé 908243\t", 
    [
        ARRAY_DELIMITER, GROUPE_DELIMITER, SCOPE_DELIMITER, ITERATOR,
        SWITCH, GOTO, CLASS, ASYNC, EXPORT, TYPE, ERROR, GENERATOR,
        MEMORY, VALUE, DEBBUGER, STATEMENT, TYPE_OPERATOR, RETURN,
        STRING, TEMPLATE, COMMENT, NAME, DELIMITER, OPERATOR, ASSIGN,
        COMPARISON, LOGICAL_OPERATOR, BETWISE_OPERATOR, ARROW, NEW_LINE,
        NUMBER
    ]
));
