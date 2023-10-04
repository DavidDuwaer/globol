import moment from 'moment-timezone';
import {requireValidZoneIdString} from "./util/requireValidZoneIdString.js";
import {TimeZone} from './TimeZone.js';

export type ZoneIdString = 'Europe/Amsterdam' | 'UTC' | 'America/New_York'; // todo: add all other IDs that occur in tz database

export class ZoneId extends TimeZone
{
	private readonly zoneId: ZoneIdString;

	private constructor(zoneId: ZoneIdString)
	{
		super();
		this.zoneId = requireValidZoneIdString(zoneId);
	}

	/**
	 * <p>Returns the browser's current time zone. Gets this information from the browser's Internationalization API.
	 * </p>
	 * <p>In <a href="https://caniuse.com/internationalization">browsers that do not expose this information</a>, a
	 * best-effort guess is made. That guess is performed under the hood by {@code moment.tz.guess()} from
	 * {@code moment-timezone}, so read more about it in
	 * <a href="https://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/">that function's
	 * documentation</a>.<p>
	 */
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

	public static equal(
		zoneId1: ZoneId | null | undefined,
		zoneId2: ZoneId | null | undefined,
		...otherDaysOfWeek: (ZoneId | null | undefined)[]
	)
	{
		const tail = [zoneId2, ...otherDaysOfWeek];
		return zoneId1 === null || zoneId1 === undefined
			? tail.every(element => element === zoneId1)
			: tail.every(element => element?.equals(zoneId1));
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