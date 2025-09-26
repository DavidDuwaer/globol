import {assertNoEmptyString} from "./assertNoEmptyString";

export function handleParseEdgeCases<T, PreParseResult extends null | undefined>(
    value: string | PreParseResult,
    failSilently: boolean,
    className: string,
    parse: (string: string) => T,
): T | PreParseResult | undefined {
    if (value === undefined || value === null) {
        return value
    }
    if (typeof value !== 'string') {
        throw new Error(`Expected string or null or undefined, got ${value}`)
    }
    try {
        assertNoEmptyString(value, className)
        return parse(value)
    } catch (e) {
        if (failSilently) {
            return undefined
        }
        throw e
    }
}