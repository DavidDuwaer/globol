import moment from 'moment-timezone';
import {ZoneIdString} from "../ZoneId.js";

export function isValidZoneIdString(zoneIdString: any): zoneIdString is ZoneIdString {
    if (zoneIdString as any === null || zoneIdString as any === undefined || zoneIdString as string === '')
        return false
    if (typeof zoneIdString !== 'string')
        return false
    if (moment.tz.zone(zoneIdString) === null)
        return false
    return true
}