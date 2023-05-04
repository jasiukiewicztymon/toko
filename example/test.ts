let NAME: Rule = { type: "NAME", selector: /[a-zA-Z_$][a-zA-Z0-9_$]*/, meta: () => {}};
let STRING: Rule = { type: "STRING", selector: /"(?:[^\\"]|\\(?:.|$))*"/, meta: () => {}};
let NEGATION: Rule = { type: "NEGATION", selector: /!/, meta: () => {}};
let TOKENS: Rule = { type: "TOKENS", selector: /[.:,;]/, meta: () => {}};

console.log(tokenize("fds.,;fds ;:.\"43\\245\\\\\"fdfsfds\"\\\\\\\"", [NAME, NEGATION, TOKENS, STRING]));
