import {ZonedDateTime} from './ZonedDateTime';
import {Duration} from "./Duration";
import {ZoneId} from "./ZoneId";
import {requireValidDate} from "./util/requireValidDate";
import {requireInt} from "./util/requireInt";

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

	public atZone(zoneId: ZoneId)
	{
		return new ZonedDateTime(this.toJS(), zoneId);
	}

	public toJS(): Date
	{
		return requireValidDate(
			new Date(this.epochMilli)
		);
	}
}