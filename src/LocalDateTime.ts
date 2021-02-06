import moment from 'moment-timezone';
import {Instant} from './Instant';
import {LocalDate} from './LocalDate';
import {LocalTime} from './LocalTime';
import {ZoneId} from './ZoneId';
import {ZonedDateTime} from "./ZonedDateTime";

export class LocalDateTime
{
	private readonly date: LocalDate;
	private readonly time: LocalTime;

	constructor(date: LocalDate, time: LocalTime)
	{
		this.date = date;
		this.time = time;
	}

	public atZone(zoneId: ZoneId): ZonedDateTime
	{
		const zonedMoment = moment.tz(
			{
				year: this.year,
				month: this.month - 1,
				day: this.dayOfMonth,
				hour: this.hour,
				minute: this.minute,
				millisecond: this.millisecond
			},
			zoneId.toString()
		);
		return new ZonedDateTime(zonedMoment.toDate(), zoneId);
	}

	public toInstant(zoneId: ZoneId): Instant
	{
		return this
			.atZone(zoneId)
			.toInstant();
	}

	public get year()
	{
		return this.date.year;
	}

	public get month()
	{
		return this.date.month
	}

	public get dayOfMonth()
	{
		return this.date.dayOfMonth
	}

	public get hour()
	{
		return this.time.hour;
	}

	public get minute()
	{
		return this.time.minute;
	}

	public get second()
	{
		return this.time.second;
	}

	public get millisecond()
	{
		return this.time.millisecond;
	}
}