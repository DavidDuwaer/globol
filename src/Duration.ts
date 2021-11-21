import moment, {Duration as MomentDuration} from 'moment';
import {Instant} from "./Instant";
import {DurationSpec} from "./DurationSpec";
import {requireInt} from "./util/requireInt";

export class Duration
{
    private readonly momentDuration: MomentDuration;

    private constructor(momentDuration: MomentDuration)
    {
        this.momentDuration = momentDuration;
    }

    /**
     * Accepts an ISO-8601 duration string, e.g. "PT15M" for "fifteen minutes", and turns it into
     * an appropriate {@link Duration}.
     */
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

    public static of(
        {
            years = 0,
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0,
            millis = 0,
        }: DurationSpec
    )
    {
        requireInt(
            seconds * 1000,
            `Not accepting values with precision <1/1000ths of seconds; got ${seconds}`
        );
        requireInt(
            millis,
            `Only accepting whole milliseconds; got ${millis}`
        );
        return Duration.parse(
            `P`
            + `${years}Y`
            + `${days}D`
            + 'T'
            + `${hours}H`
            + `${minutes}M`
            + `${seconds + (millis / 1000)}S`
        );
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

    public static between(fromExcl: Instant, toIncl: Instant)
    {
        return Duration.ofMilliseconds(
            toIncl.toEpochMilli() - fromExcl.toEpochMilli()
        );
    }

    public static get ZERO()
    {
        return Duration.ofMilliseconds(0);
    }

    /**
     * This {@link Duration} expressed in number of days, rounded down. In other words: the
     * total number of whole days that fit in this {@link Duration}. Not to be confused with
     * {@link .days}. A fixed day length of 24 hours is used.
     */
    public get asDays()
    {
        return Math.floor(this.asHours / 24);
    }

    /**
     * This {@link Duration} expressed in number of hours, rounded down. In other words: the
     * total number of whole hours that fit in this {@link Duration}. Not to be confused with
     * {@link .hours}.
     */
    public get asHours()
    {
        return Math.floor(this.momentDuration.asHours());
    }

    /**
     * This {@link Duration} expressed in number of minutes, rounded down. In other words: the
     * total number of whole minutes that fit in this {@link Duration}. Not to be confused with
     * {@link .minutes}.
     */
    public get asMinutes()
    {
        return Math.floor(this.momentDuration.asMinutes());
    }

    /**
     * This {@link Duration} expressed in number of seconds, rounded down. In other words: the
     * total number of whole seconds that fit in this {@link Duration}. Not to be confused with
     * {@link .seconds}.
     */
    public get asSeconds()
    {
        return Math.floor(this.momentDuration.asSeconds());
    }

    /**
     * This {@link Duration} expressed in number of milliseconds. Not to be confused with
     * {@link .milliseconds}.
     */
    public get asMillis()
    {
        return Math.floor(this.momentDuration.asMilliseconds());
    }

    /**
     * The years component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in years' —for that, use {@link .asYears}.
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
     * expressed in hours' —for that, use {@link .asHours}.
     */
    public get hours()
    {
        return this.momentDuration.hours();
    }

    /**
     * The minutes component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in minutes' —for that, use {@link .asMinutes}.
     */
    public get minutes()
    {
        return this.momentDuration.minutes();
    }

    /**
     * The seconds component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in seconds' —for that, use {@link .asSeconds}.
     */
    public get seconds()
    {
        return this.momentDuration.seconds();
    }

    /**
     * The milliseconds component in this {@link Duration}. Note: NOT 'the entire length of this duration
     * expressed in milliseconds' —for that, use {@link .asMillis}.
     */
    public get milliseconds()
    {
        return this.momentDuration.milliseconds();
    }
}