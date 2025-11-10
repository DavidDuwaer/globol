import {requireValidHourNumber} from "./util/requireValidHourNumber.js";
import {requireValidMinuteNumber} from "./util/requireValidMinuteNumber.js";
import {requireValidSecondNumber} from "./util/requireValidSecondNumber.js";
import {requireValidMillisecondOfASecondNumber} from "./util/requireValidMillisecondOfASecondNumber.js";
import {LocalDateTime} from "./LocalDateTime.js";
import {DayOfMonthNumber, LocalDate, MonthNumber} from "./LocalDate.js";
import {padToTwoDigits} from "./util/padToTwoDigits.js";
import {ISOSerializationOptions} from "./util/ISOSerializationOptions.js";
import {defaults} from "./defaults.js";
import {handleParseEdgeCases} from "./handleParseEdgeCases";
import {LIB_ID} from "./util/LIB_ID";

export type HourNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	| 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
	| 20 | 21 | 22 | 23;
export type MinuteNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	| 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
	| 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
	| 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
	| 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
	| 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
export type SecondNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	| 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
	| 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
	| 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
	| 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
	| 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;

const BRAND = Symbol.for(`${LIB_ID}_LocalTime`)

export class LocalTime {
	public readonly hour: HourNumber
	public readonly minute: MinuteNumber
	public readonly second: SecondNumber
	public readonly millisecond: number
    private [BRAND] = true

    /**
     * @deprecated use {@link LocalTime.of} instead
     */
	constructor(hour: HourNumber | number, minute: MinuteNumber | number, second: SecondNumber | number = 0, millisecond: number = 0)
	{
		this.hour = requireValidHourNumber(hour);
		this.minute = requireValidMinuteNumber(minute);
		this.second = requireValidSecondNumber(second);
		this.millisecond = requireValidMillisecondOfASecondNumber(millisecond);
	}

    public static of(hour: HourNumber | number, minute: MinuteNumber | number = 0, second: SecondNumber | number = 0, millisecond: number = 0) {
        return new LocalTime(hour, minute, second, millisecond)
    }

	public static get MIDNIGHT()
	{
		return midnight
	}

	public static from(date: Date)
	{
		return new LocalTime(
			date.getHours() as HourNumber,
			date.getMinutes() as MinuteNumber
		);
	}

	public static parse<PreParseResult extends null | undefined>(string: PreParseResult): PreParseResult
	public static parse(string: string, failSilently?: false): LocalTime
	public static parse<PreParseResult extends null | undefined>(string: string | PreParseResult, failSilently?: false): LocalTime | PreParseResult
	public static parse(string: string, failSilently?: boolean): LocalTime | undefined
	public static parse<PreParseResult extends null | undefined>(string: string | PreParseResult, failSilently?: boolean): LocalTime | PreParseResult | undefined
	public static parse<PreParseResult extends null | undefined>(string: string | PreParseResult, failSilently = false): LocalTime | PreParseResult | undefined
	{
		return handleParseEdgeCases(string, failSilently, 'LocalTime', string => {
			const segments = string.split(':');
			const secondAndMillis = segments?.[2]?.split('.');
			return new LocalTime(
				parseInt(segments[0]) as HourNumber,
				parseInt(segments[1]) as MinuteNumber,
				secondAndMillis !== undefined && secondAndMillis[0] !== undefined ? parseInt(secondAndMillis[0]) : undefined,
				secondAndMillis !== undefined && secondAndMillis[1] !== undefined ? parseInt(secondAndMillis[1]) : undefined
			)
		})
	}

	public at(year: number, month: MonthNumber | number, day: DayOfMonthNumber | number): LocalDateTime
	public at(date: LocalDate): LocalDateTime
	public at(arg1: LocalDate | number, arg2?: MonthNumber | number, arg3?: DayOfMonthNumber | number): LocalDateTime {
		return LocalDateTime.of(
			LocalDate.isInstance(arg1)
				? arg1
				: LocalDate.of(arg1, arg2!, arg3!),
			this
		)
	}

	/**
	 * @deprecated use {@link .at} instead
	 */
	public atDate(date: LocalDate): LocalDateTime
	{
		return LocalDateTime.of(
			date,
			this
		);
	}

	/**
	 * To ISO-8601 string, e.g. "17:34:00.000" or "13:53"
	 */
	public toString(options?: ISOSerializationOptions)
	{
		const {
			numberOfISO8601SecondDigits: digits = 3,
		} = {...defaults, ...options};

		let value = padToTwoDigits(this.hour)
			+ ':'
			+ padToTwoDigits(this.minute);
		if (this.second > 0) {
			value += `:${padToTwoDigits(this.second)}`;
		}
		if (this.millisecond > 0) {
			value += `.${
				`${Math.round(this.millisecond * 10^(digits - 3))}`
					.padStart(digits, '0')
			}`;
		}
		return value;
	}

	public equals(localTime: LocalTime | null | undefined)
	{
		return this.hour === localTime?.hour
			&& this.minute === localTime?.minute
			&& this.second === localTime?.second
			&& this.millisecond === localTime?.millisecond;
	}

	public isBefore(other: LocalTime)
	{
		return this.hour < other.hour
			|| (this.hour === other.hour && (
				this.minute < other.minute
				|| (this.minute === other.minute && (
					this.second < other.second
					|| (this.second === other.second
						&& this.millisecond < other.millisecond
					)
				))
			))
	}

	public isAfter(other: LocalTime)
	{
		return this.hour > other.hour
			|| (this.hour === other.hour && (
				this.minute > other.minute
				|| (this.minute === other.minute && (
					this.second > other.second
					|| (this.second === other.second
						&& this.millisecond > other.millisecond
					)
				))
			))
	}

    public static isInstance(value: any): value is LocalTime {
        return value?.[BRAND]
    }
}

export const midnight = LocalTime.of(0, 0)
