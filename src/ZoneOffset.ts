import {TimeZone} from './TimeZone.js';

export class ZoneOffset extends TimeZone
{
	private readonly nrOfSeconds: number;

	/**
	 * @deprecated Use {@link .of} instead.
	 */
	constructor(nrOfSeconds: number)
	{
		super();
		this.nrOfSeconds = nrOfSeconds;
	}

	public static of({hours, minutes, seconds}: {hours?: number, minutes?: number, seconds?: number}): ZoneOffset {
		return new ZoneOffset(
			(hours ?? 0) * 3600 + (minutes ?? 0) * 60 + (seconds ?? 0)
		)
	}
}