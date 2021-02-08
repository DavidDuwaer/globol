import moment from 'moment-timezone';
import {Instant} from './Instant';
import {LocalDate} from './LocalDate';
import {LocalTime} from './LocalTime';
import {ZoneId} from './ZoneId';
import {ZonedDateTime} from "./ZonedDateTime";
import {DayOfWeek} from "./DayOfWeek";
import {IsoWeekDayNumber} from "./IsoWeekDayNumber";

export class LocalDateTime
{
	private readonly date: LocalDate;
	private readonly time: LocalTime;

	private constructor(date: LocalDate, time: LocalTime)
	{
		this.date = date;
		this.time = time;
	}

	public static of(date: LocalDate, time: LocalTime)
	{
		return new LocalDateTime(date, time);
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

	public toLocalDate(): LocalDate
	{
		return new LocalDate(
			this.date.year,
			this.date.month,
			this.date.dayOfMonth
		);
	}

	public toLocalTime(): LocalTime
	{
		return new LocalTime(
			this.time.hour,
			this.time.minute,
			this.time.second,
			this.time.millisecond
		);
	}

	public isBefore(other: LocalDateTime)
	{
		if (!this.toLocalDate().equals(other.toLocalDate()))
			return this.toLocalDate().isBefore(other.toLocalDate());
		else if (!this.toLocalTime().equals(other.toLocalTime()))
			return this.toLocalTime().isBefore(other.toLocalTime());
		else return false;
	}

	public isAfter(other: LocalDateTime)
	{
		if (!this.toLocalDate().equals(other.toLocalDate()))
			return this.toLocalDate().isAfter(other.toLocalDate());
		else if (!this.toLocalTime().equals(other.toLocalTime()))
			return this.toLocalTime().isAfter(other.toLocalTime());
		else return false;
	}

	public get dayOfWeek(): DayOfWeek
	{
		return DayOfWeek.of(
			this.toMoment()
				.isoWeekday() as IsoWeekDayNumber
		);
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

	private toMoment()
	{
		return moment({
			year: this.year,
			month: this.month - 1,
			day: this.dayOfMonth,
			hour: this.hour,
			minute: this.minute,
			second: this.second,
			millisecond: this.millisecond
		});
	}
}