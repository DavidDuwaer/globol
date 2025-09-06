import {assertNoEmptyString} from "./assertNoEmptyString";

export function handleParseEdgeCases<T, PreParseResult extends null | undefined>(
    string: string | PreParseResult,
    failSilently: boolean,
    className: string,
    parse: (string: string) => T,
): T | PreParseResult | undefined {
    if (typeof string !== 'string') {
        return string
    }
    try {
        assertNoEmptyString(string, className)
        return parse(string)
    } catch (e) {
        if (failSilently) {
            return undefined
        }
        throw e
    }
}