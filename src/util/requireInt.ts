import {isInt} from "./isInt.js";
export function requireInt(numberValue: number, message?: string): number
{
    if (!isInt(numberValue))
    {
        throw new Error(message ?? `Expected value '${numberValue}' to be an integer`);
    }
    return numberValue;
}