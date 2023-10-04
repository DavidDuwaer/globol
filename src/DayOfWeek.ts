import {DAY_OF_WEEK_ID_SUCCESSION, DayOfWeekId} from "./DayOfWeekId.js";
import {IsoWeekDayNumber} from "./IsoWeekDayNumber.js"
import {requireValidISOWeekDayNumber} from "./util/requireValidISOWeekDayNumber.js"

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
        this.isoNumber = requireValidISOWeekDayNumber(isoWeekDayNumber);
    }

    public static of(isoWeekDayNumber: IsoWeekDayNumber)
    {
        return getDayOfWeek(
            requireValidISOWeekDayNumber(isoWeekDayNumber)
        );
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

    public static equal(
        dayOfWeek1: DayOfWeek | null | undefined,
        dayOfWeek2: DayOfWeek | null | undefined,
        ...otherDaysOfWeek: (DayOfWeek | null | undefined)[]
    )
    {
        const tail = [dayOfWeek2, ...otherDaysOfWeek];
        return dayOfWeek1 === null || dayOfWeek1 === undefined
            ? tail.every(element => element === dayOfWeek1)
            : tail.every(element => element?.equals(dayOfWeek1));
    }

    public equals(dayOfWeek: DayOfWeek | null | undefined)
    {
        return this.isoNumber === dayOfWeek?.isoNumber;
    }

    public plus(nrOfDays: number)
    {
        const multiplesOfSevenDaysToAddToKeepNrOfDaysPositive = nrOfDays < 0
            ? Math.ceil(Math.abs(nrOfDays) / 7) * 7 + 7
            : 0;
        const newISOWeekDayNumber = ((this.isoNumber - 1 + nrOfDays + multiplesOfSevenDaysToAddToKeepNrOfDaysPositive) % 7) + 1 as IsoWeekDayNumber;
        return getDayOfWeek(newISOWeekDayNumber);
    }

    public minus(nrOfDays: number)
    {
        return this.plus(-nrOfDays);
    }

    /**
     * A string equal to the enum constant name, e.g. 'MONDAY'
     */
    public get id(): DayOfWeekId
    {
        return DAY_OF_WEEK_ID_SUCCESSION[this.isoNumber - 1];
    }
}

function getDayOfWeek(isoWeekDayNumber: IsoWeekDayNumber)
{
    return DayOfWeek[DAY_OF_WEEK_ID_SUCCESSION[isoWeekDayNumber - 1]];
}