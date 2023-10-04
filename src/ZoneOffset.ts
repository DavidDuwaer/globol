import {TimeZone} from './TimeZone.js';

export class ZoneOffset extends TimeZone
{
	private readonly nrOfSeconds: number;

	constructor(nrOfSeconds: number)
	{
		super();
		this.nrOfSeconds = nrOfSeconds;
	}
}