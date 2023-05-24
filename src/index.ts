interface Token {
    Name: string,           /* The token name */
    Category: Array<string> /* Categories can be used if the same
                            token is used in different context for
                            example the `<` token for the begining 
                            of a jsx depend on the grammar. An 
                            another example can be a object 
                            property named like a keyword.*/
    Indent: number, /* The indentation value */
    Value: string,  /* The value of the token */
    SOL: boolean    /* True if is the first token of the line */
    EOL: boolean    /* True if is the last token of the line */
}

interface TokenMatch {
    Name: string,       // The token name
    Selector: RegExp,   // Regular expression to match the token
    Category: Array<string>
}

interface TokenizerConfig {
    TabIndentConst?: number,
    Matchers: Array<TokenMatch>
}

function tokenize(source: string, config: TokenizerConfig): Array<Token> {
    let tokens: Array<Token> = [];

    // the carret is the pointer of the current 
    // position of tokenizer in the source string
    let carret = 0;

    let eol, sol = true;

    for (;carret < source.length; carret++) {
        let indent = 0;
        while (1) {
            if (source[carret] == ' ') indent++;
            else if (source[carret] == '\t') indent += 4;
            else if (source[carret] == '\n') { indent = 0; sol = true; }
            else break;
            carret++;
        }

        let r: any = null, idx: number = -1;
        for (let i = 0; i < config.Matchers.length; i++) {
            r = config.Matchers[i].Selector.exec(source);
            if (r && r.index == 0) {
                idx = i;
                break;
            }
        }

        if (!r && carret < source.length) { throw new Error("Unexpected token"); }
        else {
            if (sol && tokens.length > 0) {
                tokens[-1].EOL = true;
            }

            tokens.push({
                Name: config.Matchers[idx].Name,
                Category: config.Matchers[idx].Category,
                Indent: indent,
                Value: r[0],
                SOL: sol,
                EOL: false
            })
        }

        carret += r[0];
        sol = false;
    }

    return tokens;
}