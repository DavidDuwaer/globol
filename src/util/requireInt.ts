import {isInt} from "./isInt";

export function requireInt(numberValue: number, message?: string): number
{
    if (!isInt(numberValue))
    {
        throw new Error(message ?? `Expected value '${numberValue}' to be an integer`);
    }
    return numberValue;
}