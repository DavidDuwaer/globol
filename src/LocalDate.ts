import {Moment} from 'moment';
import {LocalDateTime} from './LocalDateTime';
import {LocalTime} from './LocalTime';
import {DayOfWeek} from "./DayOfWeek";
import {IsoWeekDayNumber} from "./IsoWeekDayNumber";
import {requireValidISOWeekDayNumber} from "./util/requireValidISOWeekDayNumber";
import {newValidMoment} from "./util/newValidMoment";
import {requireInt} from "./util/requireInt";
import {requireValidMonthNumber} from "./util/requireValidMonthNumber";
import {requireValidDayOfMonthNumber} from "./util/requireValidDayOfMonthNumber";

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DayOfMonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

export class LocalDate
{
	public readonly year: number
	public readonly month: MonthNumber
	public readonly dayOfMonth: DayOfMonthNumber

	constructor(year: number, month: MonthNumber, dayOfMonth: DayOfMonthNumber)
	{
		this.year = requireInt(year);
		this.month = requireValidMonthNumber(month);
		this.dayOfMonth = requireValidDayOfMonthNumber(dayOfMonth);
	}

	public static from(date: Date): LocalDate
	{
		return new LocalDate(
			date.getFullYear(),
			date.getMonth() + 1 as MonthNumber,
			date.getDate() as DayOfMonthNumber
		);
	}

	public static parse(string: string)
	{
		const segments = string.split('-');
		return new LocalDate(
			parseInt(segments[0]),
			parseInt(segments[1]) as MonthNumber,
			parseInt(segments[2]) as DayOfMonthNumber
		);
	}

	public toString(): string
	{
		return this.toMoment()
			.format('YYYY-MM-DD');
	}

	public equals(localDate: LocalDate): boolean
	{
		return this.year === localDate.year
			&& this.month === localDate.month
			&& this.dayOfMonth === localDate.dayOfMonth;
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

	minus({days}: {days: number}): LocalDate
	{
		return this.plus({
			days: -days,
		});
	}

	public get dayOfWeek(): DayOfWeek
	{
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

	private get debugDescription()
	{
		return `{"year":${this.year},"month":${this.month},"day":${this.dayOfMonth}}`;
	}
}