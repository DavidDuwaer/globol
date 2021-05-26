import {ZonedDateTime} from './ZonedDateTime';
import {Duration} from "./Duration";
import {ZoneId, ZoneIdString} from "./ZoneId";
import {requireValidDate} from "./util/requireValidDate";
import {requireInt} from "./util/requireInt";
import {toZoneId} from "./util/toZoneId";

export class Instant
{
	private readonly epochMilli: number;

	private constructor(epochMilli: number)
	{
		this.epochMilli = requireInt(epochMilli);
	}

	public static now()
	{
		return new Instant(new Date().getTime());
	}

	public static parse(stringValue: string)
	{
		const date = new Date(stringValue);
		return new Instant(
			requireValidDate(date).getTime()
		);
	}

	public static from(date: Date)
	{
		return new Instant(
			requireValidDate(date).getTime()
		);
	}

	public static ofEpochMilli(epochMilli: number)
	{
		return new Instant(
			requireInt(
				epochMilli,
				`Expected valid integer for epochMilli, but got ${epochMilli}`
			)
		);
	}

	public static ofEpochSecond(epochSecond: number)
	{
		const validEpochSecond = requireInt(
			epochSecond,
			`Expected valid integer for epoch second, but got ${epochSecond}`
		);
		return new Instant(
			validEpochSecond * 1000
		);
	}

	public add(duration: Duration): Instant
	{
		return new Instant(this.epochMilli + duration.asMillis);
	}

	public atZone(zoneIdString: ZoneIdString)
	public atZone(zoneId: ZoneId)
	public atZone(arg: ZoneId | ZoneIdString)
	{
		return new ZonedDateTime(this.toJS(), toZoneId(arg));
	}

	public isAfter(otherInstant: Instant): boolean
	{
		return this.epochMilli > otherInstant.epochMilli;
	}

	public isBefore(otherInstant: Instant): boolean
	{
		return this.epochMilli < otherInstant.epochMilli;
	}

	/**
	 * Gets the number of milliseconds from the Java epoch of 1970-01-01T00:00:00Z.
	 */
	public toEpochMilli(): number
	{
		return this.epochMilli;
	}

	/**
	 * A string representation of this {@link Instant} in ISO-8601 notation. E.g. "2021-05-16T11:21:32.329Z"
	 */
	public toString(): string
	{
		return this.toJS().toISOString();
	}

	/**
	 * Gets the number of seconds from the Java epoch of 1970-01-01T00:00:00Z, rounded down (the milliseconds in the
	 * last second truncated). This returns an integer.
	 */
	public getEpochSecond(): number
	{
		return Math.floor(this.epochMilli / 1000);
	}

	public toJS(): Date
	{
		return requireValidDate(
			new Date(this.epochMilli)
		);
	}
}