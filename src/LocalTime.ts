export type HourNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	| 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
	| 20 | 21 | 22 | 23;
export type MinuteNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	| 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
	| 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
	| 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
	| 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
	| 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;


export class LocalTime
{
	public readonly hour: HourNumber;
	public readonly minute: MinuteNumber;
	public readonly second: number;
	public readonly millisecond: number;

	constructor(
		hour: HourNumber,
		minute: MinuteNumber,
		second: number = 0,
		millisecond: number = 0,
	)
	{
		this.hour = hour;
		this.minute = minute;
		this.second = second;
		this.millisecond = millisecond;
	}

	public static get MIDNIGHT()
	{
		return new LocalTime(
			0,
			0,
		);
	}

	public static from(date: Date)
	{
		return new LocalTime(
			date.getHours() as HourNumber,
			date.getMinutes() as MinuteNumber
		);
	}

	public static parse(string: string)
	{
		const segments = string.split(':');
		const secondAndMillis = segments?.[2]?.split('.');
		return new LocalTime(
			parseInt(segments[0]) as HourNumber,
			parseInt(segments[1]) as MinuteNumber,
			secondAndMillis !== undefined && secondAndMillis[0] !== undefined ? parseInt(secondAndMillis[0]) : undefined,
			secondAndMillis !== undefined && secondAndMillis[1] !== undefined ? parseInt(secondAndMillis[1]) : undefined
		);
	}

	public toString()
	{
		let value = padToTwoDigits(this.hour)
			+ ':'
			+ padToTwoDigits(this.minute);
		if (this.second > 0)
			value += `:${padToTwoDigits(this.second)}`;
		if (this.millisecond> 0)
			value += `.${padToThreeDigits(this.millisecond)}`;
		return value;
	}

	public equals(localTime: LocalTime)
	{
		return this.hour === localTime.hour
			&& this.minute === localTime.minute
			&& this.second === localTime.second
			&& this.millisecond === localTime.millisecond;
	}
}

function padToTwoDigits(aNumber: number): string
{
	return `00${aNumber}`.slice(-2);
}

function padToThreeDigits(aNumber: number): string
{
	return `000${aNumber}`.slice(-3);
}