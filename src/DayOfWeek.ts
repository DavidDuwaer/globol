import {DayOfWeekId} from "./DayOfWeekId";
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

    private static daySuccession = [
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
        DayOfWeek.SATURDAY,
        DayOfWeek.SUNDAY
    ];

    private readonly isoDayOfWeek: number;

    private constructor(isoWeekDayNumber: IsoWeekDayNumber)
    {
        requireValidISOWeekDayNumber(isoWeekDayNumber);
        this.isoDayOfWeek = isoWeekDayNumber;
    }

    public static of(isoWeekDayNumber: IsoWeekDayNumber)
    {
        requireValidISOWeekDayNumber(isoWeekDayNumber);
        return DayOfWeek.daySuccession[isoWeekDayNumber - 1];
    }

    public static parse(stringValue: DayOfWeekId)
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
        const newISOWeekDayNumber = ((this.isoDayOfWeek + nrOfDays - 1) % 7) + 1;
        return DayOfWeek.daySuccession[newISOWeekDayNumber - 1];
    }

    public minus(nrOfDays: number)
    {
        const newISOWeekDayNumber = ((this.isoDayOfWeek - nrOfDays - 1) % 7) + 1;
        return DayOfWeek.daySuccession[newISOWeekDayNumber - 1];
    }

    /**
     * ISO day of week number, 1...7 with 1 being Monday
     */
    public get isoNumber()
    {
        return this.isoDayOfWeek;
    }
}

function requireValidISOWeekDayNumber(isoWeekDayNumber: number)
{
    requireInt(isoWeekDayNumber);
    if (isoWeekDayNumber < 1 || isoWeekDayNumber > 7) {
        throw new Error(`'${isoWeekDayNumber}' not a valid ISO weekday number`);
    }
}