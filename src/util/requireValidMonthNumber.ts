import {MonthNumber} from "../LocalDate.js";
import {isInt} from "./isInt.js";

export function requireValidMonthNumber(number: number): MonthNumber
{
    if (!isInt(number) || number < 1 || number > 12)
        throw new Error(`Expected a valid month number (1..12), got ${number}.`)
    return number as MonthNumber;
}