import moment, {Moment} from 'moment';
import {LocalDateTime} from './LocalDateTime';
import {LocalTime} from './LocalTime';
import {DayOfWeek} from "./DayOfWeek";
import {IsoWeekDayNumber} from "./IsoWeekDayNumber";

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DayOfMonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

export class LocalDate
{
	public readonly year: number
	public readonly month: MonthNumber
	public readonly dayOfMonth: DayOfMonthNumber

	constructor(year: number, month: MonthNumber, dayOfMonth: DayOfMonthNumber)
	{
		this.year = year;
		this.month = month;
		this.dayOfMonth = dayOfMonth;
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

	public after(localDate: LocalDate): boolean
	{
		if (this.year !== localDate.year)
			return this.year > localDate.year;
		else if (this.month !== localDate.month)
			return this.month > localDate.month;
		else if (this.dayOfMonth !== localDate.dayOfMonth)
			return this.dayOfMonth > localDate.dayOfMonth;
		else return false;
	}

	public atTime(localTime: LocalTime): LocalDateTime
	{
		return new LocalDateTime(
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
		return DayOfWeek.of(
			this.toMoment()
				.isoWeekday() as IsoWeekDayNumber
		);
	}

	private toMoment(): Moment
	{
		return moment({
			year: this.year,
			month: this.month - 1,
			day: this.dayOfMonth,
		});
	}
}