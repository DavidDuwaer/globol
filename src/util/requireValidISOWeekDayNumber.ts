import {requireInt} from "./requireInt";
import {IsoWeekDayNumber} from "../IsoWeekDayNumber";

export function requireValidISOWeekDayNumber(
    isoWeekDayNumber: number,
    errorMessage?: string,
): IsoWeekDayNumber
{
    requireInt(isoWeekDayNumber);
    if (isoWeekDayNumber < 1 || isoWeekDayNumber > 7) {
        throw new Error(
            errorMessage !== undefined
                ? `'${isoWeekDayNumber}' not a valid ISO weekday number. ${errorMessage}`
                : `'${isoWeekDayNumber}' not a valid ISO weekday number`
        );
    }
    return isoWeekDayNumber as IsoWeekDayNumber;
}