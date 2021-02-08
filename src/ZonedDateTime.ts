import moment from 'moment-timezone';
import {Instant} from './Instant';
import {DayOfMonthNumber, LocalDate, MonthNumber} from './LocalDate';
import {LocalDateTime} from './LocalDateTime';
import {HourNumber, LocalTime, MinuteNumber} from './LocalTime';
import {ZoneId, ZoneIdString} from './ZoneId';

export class ZonedDateTime
{
	private readonly zonedMoment: moment.Moment

	constructor(jsDate: Date, zoneId: ZoneId)
	{
		this.zonedMoment = moment.tz(
			jsDate,
			zoneId.toString()
		);
	}

	public static now()
	{
		return ZonedDateTime.fromJS(new Date());
	}

	public static fromJS(jsDate: Date)
	{
		const zoneIdString = moment.tz.guess() as ZoneIdString;
		const zoneId = ZoneId.of(zoneIdString);
		return new ZonedDateTime(
			jsDate,
			zoneId
		);
	}

	public toInstant()
	{
		return Instant.from(this.zonedMoment.toDate());
	}

	public toLocalDate()
	{
		return new LocalDate(
			this.year,
			this.month,
			this.day
		);
	}

	public toLocalTime()
	{
		return new LocalTime(
			this.hour,
			this.minute
		);
	}

	public toLocalDateTime()
	{
		return LocalDateTime.of(
			this.toLocalDate(),
			this.toLocalTime()
		);
	}

	public get year()
	{
		return this.zonedMoment.year();
	}

	public get month()
	{
		return this.zonedMoment.month() + 1 as MonthNumber;
	}

	public get day()
	{
		return this.zonedMoment.day() as DayOfMonthNumber;
	}

	public get hour()
	{
		return this.zonedMoment.hour() as HourNumber;
	}

	public get minute()
	{
		return this.zonedMoment.minute() as MinuteNumber;
	}

	public get second()
	{
		return this.zonedMoment.second();
	}

	public get milli()
	{
		return this.zonedMoment.millisecond();
	}

	public toJS(): Date
	{
		return this.zonedMoment.toDate();
	}
}