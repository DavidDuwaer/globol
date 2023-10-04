import {isInt} from "./isInt.js";
import {MinuteNumber} from "../LocalTime.js";

export function requireValidMinuteNumber(number: number): MinuteNumber
{
    if (!isInt(number) || number < 0 || number > 59)
        throw new Error(`Expected a valid minute number (0..59), got ${number}.`)
    return number as MinuteNumber;
}