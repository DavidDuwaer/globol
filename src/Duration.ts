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

    /**
     * Converts to an ISO-8601 duration string, e.g. "PT15M" for "fifteen minutes".
     */
    public toString()
    {
        return this.momentDuration.toISOString();
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

    /**
     * The years component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in years'.
     */
    public get years()
    {
        return this.momentDuration.years();
    }

    /**
     * The months component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in months'.
     */
    public get months()
    {
        return this.momentDuration.months();
    }

    /**
     * The days component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in days'.
     */
    public get days()
    {
        return this.momentDuration.days();
    }

    /**
     * The hours component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in hours'.
     */
    public get hours()
    {
        return this.momentDuration.hours();
    }

    /**
     * The minutes component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in minutes'.
     */
    public get minutes()
    {
        return this.momentDuration.minutes();
    }

    /**
     * The seconds component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in seconds'.
     */
    public get seconds()
    {
        return this.momentDuration.seconds();
    }

    /**
     * The milliseconds component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in milliseconds'.
     */
    public get milliseconds()
    {
        return this.momentDuration.milliseconds();
    }
}