import { Token, TokenMatch, TokenizerConfig, tokenize } from '../src/index'

// testing the tokenizer
let str: TokenMatch = { Name: "STRING", Selector: /"(?:[^\\"]|\\(?:.|$))*"/ }
let char: TokenMatch = { Name: "CHAR", Selector: /'(?:[^\\']|\\(?:.|$))?'/ }
let identifier: TokenMatch = { Name: "IDENTIFIER", Selector: /[a-zA-Z$_][a-zA-Z$_0-9]*/ }

// tokenizer config
const CONFIG: TokenizerConfig = {
    Matchers: [
        str, char, identifier
    ]
}

console.log("Test")
console.log(tokenize("'t' identideir\n \"string\"", CONFIG));