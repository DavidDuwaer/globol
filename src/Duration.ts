import moment, {Duration as MomentDuration} from 'moment';

export class Duration
{
    private readonly momentDuration: MomentDuration;

    private constructor(momentDuration: MomentDuration)
    {
        this.momentDuration = momentDuration;
    }

    public static parse(durationString: string)
    {
        return new Duration(moment.duration(durationString));
    }

    public static ofYears(years: number)
    {
        return Duration.parse(`P${years}Y`);
    }

    public static ofDays(days: number)
    {
        return Duration.parse(`P${days}D`);
    }

    public static ofHours(hours: number)
    {
        return Duration.parse(`PT${hours}H`);
    }

    public static ofMinutes(minutes: number)
    {
        return Duration.parse(`PT${minutes}M`);
    }

    public static ofSeconds(seconds: number)
    {
        return Duration.parse(`PT${seconds}S`);
    }

    public static ofMilliseconds(milliseconds: number)
    {
        return Duration.parse(`PT${milliseconds/1000}S`);
    }

    public get years()
    {
        return this.momentDuration.years();
    }

    public get months()
    {
        return this.momentDuration.months();
    }

    public get days()
    {
        return this.momentDuration.days();
    }

    public get hours()
    {
        return this.momentDuration.hours();
    }

    public get minutes()
    {
        return this.momentDuration.minutes();
    }

    public get seconds()
    {
        return this.momentDuration.seconds();
    }

    public get milliseconds()
    {
        return this.momentDuration.milliseconds();
    }
}