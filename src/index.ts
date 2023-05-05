/**
 * type : the token group
 * selector : regexp to match the token
 * meta : in case your selection is more complex, 
 *        you can edit it with the meta parameter
 */
export interface TokenRule {
    type: String,
    selector: RegExp,
    meta: Function
}

export function default_meta(match: RegExp) {
    return match;
}

export function tokenize(source: string, rules: Array<TokenRule>): Array<Object> {
    let tokens: Array<Object> = [];

    while (source != "") {
        let flag = false;
        let closest: any = null, diff: any = source.length + 1;

        for (let i = 0; i < rules.length; i++) {
            let match: any = rules[i].selector.exec(source);

            // continue if there is no match
            if (match == null)
                continue;

            match = {reg: match[0], index: match.index};
            match = rules[i].meta(match)

            if (match == null)
                continue;

            if (match.index == 0) {
                tokens.push({ type: rules[i].type, token: match.reg });

                source = source.substring(match.reg.length);
                flag = true;
                break;
            }

            if (diff > match.index) {
                diff = match.index;
                closest = { type: rules[i].type, token: match.reg }
            }
        }

        if (!flag) {
            if (closest != null) {
                tokens.push({ type: "UNDEFINED", token: source.substring(0, diff) });
                tokens.push(closest);
                source = source.substring(diff+closest.token.length);
            } else {
                tokens.push({ type: "UNDEFINED", token: source });
                break;
            }
        }
    }

    return tokens;
}
