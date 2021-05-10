import {DayOfMonthNumber} from "../LocalDate";
import {isInt} from "./isInt";

export function requireValidDayOfMonthNumber(number: number): DayOfMonthNumber
{
    if (!isInt(number) || number < 1 || number > 31)
        throw new Error(`Expected a valid day-of-the-month number (1..31), got ${number}.`)
    return number as DayOfMonthNumber;
}