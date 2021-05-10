import {isInt} from "./isInt";
import {HourNumber} from "../LocalTime";

export function requireValidHourNumber(number: number): HourNumber
{
    if (!isInt(number) || number < 0 || number > 23)
        throw new Error(`Expected a valid hour number (0..23), got ${number}.`)
    return number as HourNumber;
}