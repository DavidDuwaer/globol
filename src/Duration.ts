import moment, {Duration as MomentDuration} from 'moment';
import {Instant} from "./Instant.js";
import {DurationSpec} from "./DurationSpec.js";
import {requireInt} from "./util/requireInt.js";
import {padToThreeDigits} from "./util/padToThreeDigits.js";
import {padToTwoDigits} from "./util/padToTwoDigits.js";
import {LIB_ID} from "./util/LIB_ID";

const BRAND = Symbol.for(`${LIB_ID}_Duration`)

export class Duration {
    private readonly momentDuration: MomentDuration
    private [BRAND] = true

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

    /**
     *
     * @param formatString A string describing the serialization
     * format with the following placeholders:
     * <ul>
     *     <li><b>Y</b> years component. E.g.: 23, 23237</li>
     *     <li><b>D</b> days component. E.g.: 6, 237</li>
     *     <li><b>H</b> hours component, unpadded. E.g.: 2, 23</li>
     *     <li><b>HH</b> hours component, padded to two digits. E.g.: 02, 23</li>
     *     <li><b>m</b> minutes component, unpadded. E.g.: 8, 48</li>
     *     <li><b>mm</b> minutes component, padded to two digits. E.g.: 08, 48</li>
     *     <li><b>s</b> seconds component, unpadded. E.g.: 8, 55</li>
     *     <li><b>ss</b> seconds component, padded to two digits. E.g.: 08, 55</li>
     *     <li><b>SS</b> milliseconds component, unpadded. E.g.: 8, 273</li>
     *     <li><b>SSS</b> milliseconds component, padded to three digits. E.g.: 008, 273</li>
     * </ul>
     * Any literal strings that should not be substituted as above should be surrounded
     * by brackets (`[]`).
     */
    public format(formatString: string) {
        const literals: string[] = [];
        const literalRegex = /\[([^\]]*)]/g;
        return formatString
            .replace(literalRegex, r => {
                literals.push(r.replace(literalRegex, '$1'));
                return '[]';
            })
            .replace('SSS', `${padToThreeDigits(this.milliseconds)}`)
            .replace('S', `${this.milliseconds}`)
            .replace('ss', `${padToTwoDigits(this.seconds)}`)
            .replace('s', `${this.seconds}`)
            .replace('mm', `${padToTwoDigits(this.minutes)}`)
            .replace('m', `${this.minutes}`)
            .replace('HH', `${padToTwoDigits(this.hours)}`)
            .replace('H', `${this.hours}`)
            .replace('D', `${this.days}`)
            .replace('Y', `${this.years}`)
            .replace(literalRegex, literals.splice(0, 1)[0]!)
    }

    public static isInstance(value: any): value is Duration {
        return value?.[BRAND]
    }
}