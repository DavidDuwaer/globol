import moment from 'moment-timezone';
import {Instant} from './Instant';
import {DayOfMonthNumber, LocalDate, MonthNumber} from './LocalDate';
import {LocalDateTime} from './LocalDateTime';
import {HourNumber, LocalTime, MinuteNumber} from './LocalTime';
import {ZoneId, ZoneIdString} from './ZoneId';
import {requireValidMoment} from "./util/requireValidMoment";
import {requireValidDate} from "./util/requireValidDate";
import {ISOSerializationOptions} from "./util/ISOSerializationOptions";
import {defaults} from "./defaults";

export class ZonedDateTime
{
	private readonly zonedMoment: moment.Moment

	constructor(jsDate: Date, zoneId: ZoneId)
	{
		const validJsDate = requireValidDate(jsDate);
		this.zonedMoment = requireValidMoment(
			moment.tz(
				validJsDate,
				zoneId.toString()
			),
			`Failed to get valid Moment from JS Date object ${validJsDate.toISOString()} and Zone ID ${zoneId}`
		);
	}

	public static now()
	{
		return ZonedDateTime.fromJS(new Date());
	}

	/**
	 * Instantiates a {@link ZonedDateTime} of the instant expressed by the supplied {@link Date}. Because a
	 * {@link Date} carries no time zone information, time zone is obtained with {@link ZoneId.browser()}.
	 */
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

	/**
	 * Month number, 1...12
	 */
	public get month()
	{
		return this.zonedMoment.month() + 1 as MonthNumber;
	}

	/**
	 * The day of the month, 1...31
	 */
	public get day()
	{
		return this.zonedMoment.date() as DayOfMonthNumber;
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
		return this.zonedMoment.format(formatString);
	}

	/**
	 * To ISO-8601 string, e.g. "2020-01-23T17:34:00.000Z"
	 */
	public toString(options?: ISOSerializationOptions): string
	{
		const {
			numberOfISO8601SecondDigits: digits
		} = {...defaults, ...options};
		const defaultISOString = this.zonedMoment.toISOString(true);
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

	public toJS(): Date
	{
		return this.zonedMoment.toDate();
	}
}