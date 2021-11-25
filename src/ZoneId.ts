import moment from 'moment-timezone';
import {requireValidZoneIdString} from "./util/requireValidZoneIdString";

export type ZoneIdString = 'Europe/Amsterdam' | 'UTC' | 'America/New_York'; // todo: add all other IDs that occur in tz database

export class ZoneId
{
	private readonly zoneId: ZoneIdString;

	private constructor(zoneId: ZoneIdString)
	{
		this.zoneId = requireValidZoneIdString(zoneId);
	}

	public static browser()
	{
		const zoneId = moment.tz.guess() as ZoneIdString;
		return new ZoneId(
			zoneId
		);
	}

	public static of(zoneId: ZoneIdString)
	{
		return new ZoneId(zoneId);
	}

	public static equal(...zoneIds: ZoneId[])
	{
		return zoneIds.length > 1
			? zoneIds.every(element => element.equals(zoneIds[0]))
			: true;
	}

	public equals(zoneId: ZoneId | null | undefined)
	{
		return this.zoneId === zoneId?.zoneId;
	}

	public toString()
	{
		return this.zoneId;
	}
}