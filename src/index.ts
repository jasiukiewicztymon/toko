interface Rule {
    type: String,
    selector: RegExp,
    meta: Function
}

/* return the code tokens */
function tokenize(source: string, rules: Array<Rule>): Array<Object> {
    let tokens: Array<Object> = [];

    while (source != "") {
        let flag = false;
        let closest: any = null, diff: any = source.length + 1;

        for (let i = 0; i < rules.length; i++) {
            let match = rules[i].selector.exec(source);

            // continue if there is no match
            if (match == null)
                continue;

            if (match.index == 0) {
                tokens.push({ type: rules[i].type, token: match[0], meta: rules[i].meta(match[0]) || null });

                source = source.substring(match[0].length);
                flag = true;
                break;
            }

            if (diff > match.index) {
                diff = match.index;
                closest = { type: rules[i].type, token: match[0], meta: rules[i].meta(match[0]) || null }
            }
        }

        if (!flag) {
            if (closest != null) {
                tokens.push({ type: "UNDEFINED", token: source.substring(0, diff), meta: null });
                tokens.push(closest);
                source = source.substring(diff+closest.token.length);
            } else {
                tokens.push({ type: "UNDEFINED", token: source, meta: null });
                break;
            }
        }
    }

    return tokens;
}
