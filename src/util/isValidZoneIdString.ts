import moment from 'moment-timezone';
import {ZoneIdString} from "../ZoneId";

export function isValidZoneIdString(zoneIdString: ZoneIdString): boolean
{
    if (zoneIdString as any === null || zoneIdString as any === undefined || zoneIdString as string === '')
        return false;
    if (moment.tz.zone(zoneIdString) === null)
        return false;
    return true;
}