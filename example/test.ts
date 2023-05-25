import { Token, TokenMatch, TokenizerConfig, tokenize } from '../src/index'

// testing the tokenizer
let str: TokenMatch = { Name: "STRING", Selector: /"(?:[^\\"]|\\(?:.|$))*"/ }
let char: TokenMatch = { Name: "CHAR", Selector: /'(?:[^\\']|\\(?:.|$))?'/ }
let identifier: TokenMatch = { Name: "IDENTIFIER", Selector: /[a-zA-Z$_][a-zA-Z$_0-9]*/ }
let whitespace: TokenMatch = { Name: "WHITESPACE", Selector: /[\r\t\f\v ]+/ }
let newline: TokenMatch = { Name: "NEWLINE", Selector: /\n/ }

// tokenizer config
const CONFIG: TokenizerConfig = {
    //UseIdent: true,
    Matchers: [
        str, char, identifier, whitespace, newline
    ]
}

console.log("Test")
console.log(tokenize("'t'   \tidentideir\n \"string\"", CONFIG));