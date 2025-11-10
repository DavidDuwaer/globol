import {Moment} from 'moment';
import {LocalDateTime} from './LocalDateTime.js';
import {HourNumber, LocalTime, MinuteNumber} from './LocalTime.js';
import {DayOfWeek} from "./DayOfWeek.js";
import {IsoWeekDayNumber} from "./IsoWeekDayNumber.js";
import {requireValidISOWeekDayNumber} from "./util/requireValidISOWeekDayNumber.js";
import {newValidMoment} from "./util/newValidMoment.js";
import {requireInt} from "./util/requireInt.js";
import {requireValidMonthNumber} from "./util/requireValidMonthNumber.js";
import {requireValidDayOfMonthNumber} from "./util/requireValidDayOfMonthNumber.js";
import {ZoneId, ZoneIdString} from "./ZoneId";
import {ZonedDateTime} from "./ZonedDateTime";
import {Instant} from "./Instant";
import {requireValidDate} from "./util/requireValidDate";
import {handleParseEdgeCases} from "./handleParseEdgeCases";
import {LIB_ID} from "./util/LIB_ID";

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DayOfMonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

const BRAND = Symbol.for(`${LIB_ID}_LocalDate`)

export class LocalDate {
	public readonly year: number
	public readonly month: MonthNumber
	public readonly dayOfMonth: DayOfMonthNumber
    private [BRAND] = true

	/**
	 * @deprecated Use {@link of} instead
	 */
	constructor(year: number, month: MonthNumber | number, dayOfMonth: DayOfMonthNumber | number)
	{
		this.year = requireInt(year);
		this.month = requireValidMonthNumber(month);
		this.dayOfMonth = requireValidDayOfMonthNumber(dayOfMonth);
	}

	public static of(year: number, month: MonthNumber | number, dayOfMonth: DayOfMonthNumber | number): LocalDate {
		return new LocalDate(
			year,
			month,
			dayOfMonth
		)
	}

	public static from(date: Date): LocalDate
	{
		return new LocalDate(
			date.getFullYear(),
			date.getMonth() + 1 as MonthNumber,
			date.getDate() as DayOfMonthNumber
		);
	}

	public static parse<PreParseResult extends null | undefined>(string: PreParseResult): PreParseResult
	public static parse(string: string, failSilently?: false): LocalDate
	public static parse<PreParseResult extends null | undefined>(string: string | PreParseResult, failSilently?: false): LocalDate | PreParseResult
	public static parse(string: string, failSilently?: boolean): LocalDate | undefined
	public static parse<PreParseResult extends null | undefined>(string: string | PreParseResult, failSilently?: boolean): LocalDate | PreParseResult | undefined
	public static parse<PreParseResult extends null | undefined>(string: string | PreParseResult, failSilently = false): LocalDate | PreParseResult | undefined
	{
		return handleParseEdgeCases(string, failSilently, 'LocalDate', string => {
			const date = requireValidDate(new Date(string))
			const match = /(?<year>-?[0-9]{1,4})-(?<month>[0-9]{1,2})-(?<dayOfMonth>[0-9]{1,2})/
				.exec(string)
			if (match === null)
				throw new Error(`Could not parse '${string}' as a LocalDate`);
			return new LocalDate(
				requireInt(parseFloat(match.groups!['year']!)),
				requireInt(parseFloat(match.groups!['month']!)) as MonthNumber,
				requireInt(parseFloat(match.groups!['dayOfMonth']!)) as DayOfMonthNumber
			);
		})
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
	 * To ISO-8601 string, e.g. "2020-01-23"
	 */
	public toString(): string
	{
		return this.toMoment()
			.format('YYYY-MM-DD');
	}

	/**
	 * Will return a positive integer if this {@link LocalDate} is after the {@link LocalDate}
	 * given as argument, negative if before, and 0 if both {@link LocalDate}s are at exactly the same time
	 * (millisecond precision);
	 */
	public compareTo(other: LocalDate): number {
		if (this.year !== other.year) {
			return this.year - other.year
		}
		if (this.month !== other.month) {
			return this.month - other.month
		}
		if (this.dayOfMonth !== other.dayOfMonth) {
			return this.dayOfMonth - other.dayOfMonth
		}
		return 0
	}

	public equals(localDate: LocalDate | null | undefined): boolean
	{
		return this.year === localDate?.year
			&& this.month === localDate?.month
			&& this.dayOfMonth === localDate?.dayOfMonth;
	}

	public isBefore(other: LocalDate): boolean
	{
		if (this.year !== other.year)
			return this.year < other.year;
		else if (this.month !== other.month)
			return this.month < other.month;
		else if (this.dayOfMonth !== other.dayOfMonth)
			return this.dayOfMonth < other.dayOfMonth;
		else return false;
	}

	public isAfter(other: LocalDate): boolean
	{
		if (this.year !== other.year)
			return this.year > other.year;
		else if (this.month !== other.month)
			return this.month > other.month;
		else if (this.dayOfMonth !== other.dayOfMonth)
			return this.dayOfMonth > other.dayOfMonth;
		else return false;
	}

	/**
	 * The difference in days between this date and the other date.
	 * E.g. when called with this date being 2021-02-29 and 'other' being
	 * 2021-02-28, the resulting value is 1.
	 */
	public diffInDays(other: LocalDate) {
		return this.toMoment()
			.diff(other.toMoment(), 'days');
	}

	public at(hour: HourNumber | number, minute?: MinuteNumber | number): LocalDateTime
	public at(time: LocalTime): LocalDateTime
	public at(timeZone: ZoneId | ZoneIdString | string): ZonedDateTime
	public at(arg1: number | LocalTime | ZoneId | string, arg2: number = 0): LocalDateTime | ZonedDateTime
	{
		if (typeof arg1 === 'number') {
			return LocalDateTime.of(
				this,
				LocalTime.of(arg1, arg2)
			);
		} else if (LocalTime.isInstance(arg1)) {
			return LocalDateTime.of(
				this,
				arg1
			);
		} else {
			return this
				.at(0)
				.at(arg1);
		}
	}

	public toInstant(timeZone: ZoneId | ZoneIdString | string): Instant
	{
		return this
			.at(timeZone)
			.toInstant();
	}

	/**
	 * @deprecated Use {@link at} instead
	 */
	public atTime(localTime: LocalTime): LocalDateTime
	{
		return LocalDateTime.of(
			this,
			localTime
		);
	}

	plus(diff: {days: number}): LocalDate
	{
		const targetDate = new Date(
			this.year,
			this.month - 1,
			this.dayOfMonth + diff.days,
			0,
			0,
			0,
			0
		);
		return LocalDate.from(targetDate);
	}

	minus({days}: {days: number}): LocalDate {
		return this.plus({
			days: -days,
		});
	}

	public get dayOfWeek(): DayOfWeek {
		return DayOfWeek.of(this.isoWeekDayNumber);
	}

	private get isoWeekDayNumber(): IsoWeekDayNumber
	{
		const result = this.toMoment().isoWeekday();
		return requireValidISOWeekDayNumber(
			result,
			`Failed to get valid isoWeekDayNumber from LocalDate ${this.debugDescription}`
		);
	}

	private toMoment(): Moment
	{
		return newValidMoment(
			{
				year: this.year,
				month: this.month - 1,
				day: this.dayOfMonth,
			},
			`Failed to get valid Moment from LocalDate ${this.debugDescription}`
		);
	}

	private get debugDescription() {
		return `{"year":${this.year},"month":${this.month},"day":${this.dayOfMonth}}`;
	}

    public static isInstance(value: any): value is LocalDate {
        return value?.[BRAND]
    }
}