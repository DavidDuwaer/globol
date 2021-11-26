import {TimeZone} from './TimeZone';

export class ZoneOffset implements TimeZone
{
	private readonly nrOfSeconds: number;

	constructor(nrOfSeconds: number)
	{
		this.nrOfSeconds = nrOfSeconds;
	}
}