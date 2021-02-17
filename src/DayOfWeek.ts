import {DAY_OF_WEEK_ID_SUCCESSION, DayOfWeekId} from "./DayOfWeekId";
import {requireInt} from "./util/requireInt";
import {IsoWeekDayNumber} from "./IsoWeekDayNumber";

export class DayOfWeek
{
    public static readonly MONDAY = new DayOfWeek(1);
    public static readonly TUESDAY = new DayOfWeek(2);
    public static readonly WEDNESDAY = new DayOfWeek(3);
    public static readonly THURSDAY = new DayOfWeek(4);
    public static readonly FRIDAY = new DayOfWeek(5);
    public static readonly SATURDAY = new DayOfWeek(6);
    public static readonly SUNDAY = new DayOfWeek(7);

    /**
     * ISO day of week number, 1...7 with 1 being Monday
     */
    public readonly isoNumber: IsoWeekDayNumber;

    private constructor(isoWeekDayNumber: IsoWeekDayNumber)
    {
        requireValidISOWeekDayNumber(isoWeekDayNumber);
        this.isoNumber = isoWeekDayNumber;
    }

    public static of(isoWeekDayNumber: IsoWeekDayNumber)
    {
        requireValidISOWeekDayNumber(isoWeekDayNumber);
        return getDayOfWeek(isoWeekDayNumber);
    }

    public static parse(stringValue: string)
    {
        switch (stringValue)
        {
            case "MONDAY":
                return this.MONDAY;
            case "TUESDAY":
                return this.TUESDAY;
            case "WEDNESDAY":
                return this.WEDNESDAY;
            case "THURSDAY":
                return this.THURSDAY;
            case "FRIDAY":
                return this.FRIDAY;
            case "SATURDAY":
                return this.SATURDAY;
            case "SUNDAY":
                return this.SUNDAY;
            default:
                throw new Error(`Cannot parse argument '${stringValue}' into day of week`);
        }
    }

    public plus(nrOfDays: number)
    {
        const newISOWeekDayNumber = ((this.isoNumber + nrOfDays - 1) % 7) + 1 as IsoWeekDayNumber;
        return getDayOfWeek(newISOWeekDayNumber);
    }

    public minus(nrOfDays: number)
    {
        const newISOWeekDayNumber = ((this.isoNumber - nrOfDays - 1) % 7) + 1 as IsoWeekDayNumber;
        return getDayOfWeek(newISOWeekDayNumber);
    }

    /**
     * A string equal to the enum constant name, e.g. 'MONDAY'
     */
    public get id(): DayOfWeekId
    {
        return DAY_OF_WEEK_ID_SUCCESSION[this.isoNumber - 1];
    }
}

function requireValidISOWeekDayNumber(isoWeekDayNumber: number)
{
    requireInt(isoWeekDayNumber);
    if (isoWeekDayNumber < 1 || isoWeekDayNumber > 7) {
        throw new Error(`'${isoWeekDayNumber}' not a valid ISO weekday number`);
    }
}

function getDayOfWeek(isoWeekDayNumber: IsoWeekDayNumber)
{
    return DayOfWeek[DAY_OF_WEEK_ID_SUCCESSION[isoWeekDayNumber - 1]];
}