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
import {ISOSerializationOptions} from "./util/ISOSerializationOptions";

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

	public atZone(zoneIdString: ZoneIdString): ZonedDateTime
	public atZone(zoneId: ZoneId): ZonedDateTime
	public atZone(arg: ZoneId | ZoneIdString): ZonedDateTime
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
	 * Writes this {@link ZonedDateTime} as a string in specified format, and returns it.
	 * @param formatString The format in which to write the date. The following substrings
	 * (expressed in <b>bold</b>) will get translated to the the following values:
	 * <ul>
	 *     <li><b>YY</b> - year, short - 21</li>
	 *     <li><b>YYYY</b> - year, full - 2021</li>
	 *     <li><b>M</b> - month - 1..12 (January is 1)</li>
	 *     <li><b>Mo</b> - month - 1st..12th (January is 1st)</li>
	 *     <li><b>MM</b> - month - 01..12 (January is 01)</li>
	 *     <li><b>MMM</b> - month, short - Jan</li>
	 *     <li><b>MMMM</b> - month, full - January</li>
	 *     <li><b>Q</b> - quarter - 1..4 (Jan-March is 1)</li>
	 *     <li><b>Qo</b> - quarter - 1st..4th (Jan-March is 1st)</li>
	 *     <li><b>d</b> - day of week - 0..6 (Monday is )</li>
	 *     <li><b>dd</b> - day of week, 2 characters - Mo, Su</li>
	 *     <li><b>ddd</b> - day of week, 3 characters - Mon, Sun</li>
	 *     <li><b>dddd</b> - day of week, full - Monday, Wednesday</li>
	 *     <li><b>D</b> - day of month - 1..31</li>
	 *     <li><b>Do</b> - day of month - 1st..31st</li>
	 *     <li><b>DD</b> - day of month - 01..31</li>
	 *     <li><b>DDD</b> - day of year - 1..365 (1..366 for leap years)</li>
	 *     <li><b>DDDo</b> - day of year - 1st..365th (1st..366th for leap years)</li>
	 *     <li><b>DDDD</b> - day of year - 001..365 (001..366 for leap years)</li>
	 *     <li><b>w</b> - week of year - 1..53</li>
	 *     <li><b>wo</b> - week of year - 1st..53rd</li>
	 *     <li><b>ww</b> - week of year - 01..53</li>
	 *     <li>And more. Formatting currently provided by moment.js, so for a complete list, see
	 *     <a href="https://devhints.io/moment#formatting-1">the moment.js cheatsheet</a>.</li>
	 * </ul>
	 */
	public format(formatString: string): string
	{
		return this.toMoment().format(formatString);
	}

	/**
	 * To ISO-8601 string, e.g. "2020-01-23T17:34:00.000"
	 */
	public toString(options?: ISOSerializationOptions): string
	{
		return `${this.date.toString()}T${this.time.toString(options)}`;
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