import moment from 'moment-timezone';
import {Instant} from './Instant';
import {LocalDate} from './LocalDate';
import {LocalTime} from './LocalTime';
import {ZoneId, ZoneIdString} from './ZoneId';
import {ZonedDateTime} from "./ZonedDateTime";
import {DayOfWeek} from "./DayOfWeek";
import {IsoWeekDayNumber} from "./IsoWeekDayNumber";
import {newValidMoment} from "./util/newValidMoment";
import {requireValidISOWeekDayNumber} from "./util/requireValidISOWeekDayNumber";
import {requireValidMoment} from "./util/requireValidMoment";
import {toZoneId} from "./util/toZoneId";

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

	public static browser()
	{
		return Instant.now()
			.atZone(ZoneId.browser());
	}

	public atZone(zoneIdString: ZoneIdString)
	public atZone(zoneId: ZoneId)
	public atZone(arg: ZoneId | ZoneIdString)
	{
		const zoneId = toZoneId(arg);
		const zonedMoment = this.toZonedMoment(zoneId);
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

	/**
	 * To ISO-8601 string, e.g. "2020-01-23T17:34:00.000"
	 */
	public toString(): string
	{
		return `${this.date.toString()}T${this.time.toString()}`;
	}

	private get isoWeekDayNumber(): IsoWeekDayNumber
	{
		const result = this.toMoment().isoWeekday();
		return requireValidISOWeekDayNumber(
			result,
			`Failed to get valid isoWeekDayNumber from LocalDateTime ${this.debugDescription}`
		);
	}

	private toMoment()
	{
		return newValidMoment(
			{
				year: this.year,
				month: this.month - 1,
				day: this.dayOfMonth,
				hour: this.hour,
				minute: this.minute,
				second: this.second,
				millisecond: this.millisecond
			},
			`Failed to get valid Moment from LocalDateTime ${this.debugDescription}`
		);
	}

	private toZonedMoment(zoneId: ZoneId)
	{
		return requireValidMoment(
			moment.tz(
				{
					year: this.year,
					month: this.month - 1,
					day: this.dayOfMonth,
					hour: this.hour,
					minute: this.minute,
					millisecond: this.millisecond
				},
				zoneId.toString()
			),
			`Failed to get valid timezone Moment from LocalDateTime ${this.debugDescription}`
		);
	}

	private get debugDescription()
	{
		return `{"year":${this.year},"month":${this.month},"day":${this.dayOfMonth},"time":${this.time.toString()}`;
	}
}