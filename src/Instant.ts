import {ZonedDateTime} from './ZonedDateTime.js';
import {Duration} from "./Duration.js";
import {ZoneId, ZoneIdString} from "./ZoneId.js";
import {requireValidDate} from "./util/requireValidDate.js";
import {requireInt} from "./util/requireInt.js";
import {toZoneId} from "./util/toZoneId.js";
import {DurationSpec} from "./DurationSpec.js";
import {defaults} from "./defaults.js";
import {ISOSerializationOptions} from "./util/ISOSerializationOptions.js";

export class Instant
{
	public static readonly EPOCH = new Instant(0, 0);
	private readonly secondsSinceEpoch: number;
	private readonly microsInSecond: number;

	private constructor(secondsSinceEpoch: number, microsInSecond: number)
	{
		this.secondsSinceEpoch = requireInt(
			secondsSinceEpoch,
			`Only a whole number allowed for the number of seconds since the epoch; got ${secondsSinceEpoch}`
		);
		this.microsInSecond = requireInt(
			microsInSecond,
			`Only a whole number allowed for the number of microseconds in the current second; got ${microsInSecond}`
		);
	}

	public static now()
	{
		return Instant.ofEpochMilli(Date.now());
	}

	public static parse(stringValue: string)
	{
		const date = requireValidDate(
			new Date(stringValue)
		);
		return Instant.ofEpochMilli(date.getTime());
	}

	public static from(date: Date)
	{
		return Instant.ofEpochMilli(
			requireValidDate(date).getTime()
		);
	}

	public static ofEpochMilli(epochMilli: number)
	{
		const secondsSinceEpoch = Math.floor(epochMilli / 1000);
		const microsInSecond = (epochMilli % 1000) * 1000;
		return new Instant(secondsSinceEpoch, microsInSecond);
	}

	public static ofEpochSecond(epochSecond: number)
	{
		const validEpochSecond = requireInt(
			epochSecond,
			`Expected valid integer for epoch second, but got ${epochSecond}`
		);
		return new Instant(
			validEpochSecond,
			0,
		);
	}

	/**
	 * Alias for {@link .plus}
	 */
	public add(duration: DurationSpec): Instant
	public add(duration: Duration): Instant
	public add(duration: Duration | DurationSpec): Instant
	{
		return this.plus(duration);
	}

	public atZone(zoneIdString: ZoneIdString): ZonedDateTime
	public atZone(zoneId: ZoneId): ZonedDateTime
	public atZone(arg: ZoneId | ZoneIdString): ZonedDateTime
	{
		return new ZonedDateTime(this.toJS(), toZoneId(arg));
	}

	public plus(duration: DurationSpec): Instant
	public plus(duration: Duration): Instant
	public plus(duration: Duration | DurationSpec): Instant
	{
		const asDuration = duration instanceof Duration
			? duration
			: Duration.of(duration);
		return Instant.ofEpochMilli(this.toEpochMilli() + asDuration.asMillis);
	}

	public plusSeconds(secondsToAdd: number)
	{
		return this.plus(Duration.ofSeconds(
			requireInt(
				secondsToAdd,
				`You must supply a whole number of seconds, got ${secondsToAdd}.`
			)
		))
	}

	public plusMillis(secondsToAdd: number)
	{
		return this.plus(Duration.ofMilliseconds(
			requireInt(
				secondsToAdd,
				`You must supply a whole number of seconds, got ${secondsToAdd}.`
			)
		))
	}

	/**
	 * Alias for {@link .minus}
	 */
	public subtract(instant: Instant): Duration
	public subtract(duration: DurationSpec): Instant
	public subtract(duration: Duration): Instant
	public subtract(duration: Duration | DurationSpec | Instant): Instant | Duration
	public subtract(other: Duration | DurationSpec | Instant): Instant | Duration
	{
		return this.minus(other);
	}

	public minus(instant: Instant): Duration
	public minus(duration: DurationSpec): Instant
	public minus(duration: Duration): Instant
	public minus(duration: Duration | DurationSpec | Instant): Instant | Duration
	public minus(other: Duration | DurationSpec | Instant): Instant | Duration
	{
		if (other instanceof Instant) {
			return Duration.ofMilliseconds(
				this.toEpochMilli() - other.toEpochMilli()
			);
		} else {
			const asDuration = other instanceof Duration
				? other
				: Duration.of(other);
			return Instant.ofEpochMilli(this.toEpochMilli() - asDuration.asMillis);
		}
	}

	public minusSeconds(secondsToAdd: number)
	{
		return this.minus(Duration.ofSeconds(
			requireInt(
				secondsToAdd,
				`You must supply a whole number of seconds, got ${secondsToAdd}.`
			)
		))
	}

	public minusMillis(secondsToAdd: number)
	{
		return this.minus(Duration.ofMilliseconds(
			requireInt(
				secondsToAdd,
				`You must supply a whole number of seconds, got ${secondsToAdd}.`
			)
		))
	}

	/**
	 * Will return a positive integer if this {@link Instant} is after the {@link Instant}
	 * given as argument, negative if before, and 0 if both {@link Instant}s are at exactly the same time
	 * (millisecond precision);
	 */
	public compareTo(otherInstant: Instant): number
	{
		return this.toEpochMicro() - otherInstant.toEpochMicro();
	}

	public isAfter(otherInstant: Instant): boolean
	{
		return this.compareTo(otherInstant) > 0;
	}

	public isBefore(otherInstant: Instant): boolean
	{
		return this.compareTo(otherInstant) < 0;
	}

	/**
	 * Returns true if this {@link Instant} occurs at the same time as the {@link Instant} supplied as argument.
	 */
	public equals(otherInstant: Instant | null | undefined): boolean
	{
		if (this === otherInstant)
			return true;
		return this.secondsSinceEpoch === otherInstant?.secondsSinceEpoch
			&& this.microsInSecond === otherInstant?.microsInSecond;
	}

	/**
	 * Gets the number of milliseconds from the Java epoch of 1970-01-01T00:00:00Z. Microseconds, if present, are
	 * rounded down, so this method returns an integer.
	 */
	public toEpochMilli(): number
	{
		return this.toEpochMicro() / 1000;
	}

	/**
	 * In most cases simply a thousandfold of {@link .toEpochMilli()}, this may return a different value than 1000times
	 * {@link .toEpochMilli()} if this {@link Instant} was instantiated with a timestamp with sub-millisecond precision.
	 */
	public toEpochMicro(): number
	{
		return this.secondsSinceEpoch * 1000_000 + this.microsInSecond;
	}

	/**
	 * A string representation of this {@link Instant} in ISO-8601 notation. E.g. "2021-05-16T11:21:32.329Z"
	 */
	public toString(options?: ISOSerializationOptions): string
	{
		const {
			numberOfISO8601SecondDigits: digits
		} = {...defaults, ...options};
		const defaultISOString = this.toJS().toISOString();
		if (digits !== undefined) {
			return defaultISOString
				.replace(
					/\d{2}\.\d{3,}(?=Z$)/,
					num => Number(num)
						.toFixed(digits)
						.padStart(3 + digits, "0")
				)
		} else {
			return defaultISOString
		}
	}

	/**
	 * Gets the number of seconds from the Java epoch of 1970-01-01T00:00:00Z, rounded down (the milliseconds in the
	 * last second truncated). This returns an integer.
	 */
	public getEpochSecond(): number
	{
		return this.secondsSinceEpoch;
	}

	public toJS(): Date
	{
		return requireValidDate(
			new Date(this.toEpochMilli())
		);
	}
}

export const now = Instant.now;