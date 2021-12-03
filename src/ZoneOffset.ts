import {TimeZone} from './TimeZone';

export class ZoneOffset extends TimeZone
{
	private readonly nrOfSeconds: number;

	constructor(nrOfSeconds: number)
	{
		super();
		this.nrOfSeconds = nrOfSeconds;
	}
}