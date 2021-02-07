import {isInt} from "./isInt";

export function requireInt(numberValue: number): number
{
    if (!isInt(numberValue))
        throw new Error(`Expected value '${numberValue}' to be an integer`);
    return numberValue;
}