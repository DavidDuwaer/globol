import {ZonedDateTime} from './ZonedDateTime';
import {Duration} from "./Duration";
import {ZoneId} from "./ZoneId";

export class Instant
{
	private readonly jsDate: Date;

	private constructor(jsDate: Date)
	{
		this.jsDate = jsDate;
	}

	public static now()
	{
		return new Instant(new Date());
	}

	public static parse(stringValue: string)
	{
		return new Instant(new Date(stringValue));
	}

	public static from(date: Date)
	{
		return new Instant(date);
	}

	public add(duration: Duration): Instant
	{
		const date = this.jsDate;
		return new Instant(new Date(date.getTime() + duration.asMillis));
	}

	public atZone(zoneId: ZoneId)
	{
		return new ZonedDateTime(this.jsDate, zoneId);
	}

	public toJS(): Date
	{
		return new Date(this.jsDate);
	}
}