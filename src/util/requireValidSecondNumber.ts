import {isInt} from "./isInt.js";
import {SecondNumber} from "../LocalTime.js";

export function requireValidSecondNumber(number: number): SecondNumber
{
    if (!isInt(number) || number < 0 || number > 59)
        throw new Error(`Expected a valid second number (0..59), got ${number}.`)
    return number as SecondNumber;
}