import {ZoneIdString} from "../ZoneId.js";
import {isValidZoneIdString} from "./isValidZoneIdString.js";

export function requireValidZoneIdString(zoneIdString: any): ZoneIdString {
    if (!isValidZoneIdString(zoneIdString))
        throw new Error(`Expected valid ZoneIdString, got ${zoneIdString}`);
    return zoneIdString;
}
