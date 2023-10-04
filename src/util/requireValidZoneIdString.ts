import {ZoneIdString} from "../ZoneId.js";
import {isValidZoneIdString} from "./isValidZoneIdString.js";

export function requireValidZoneIdString(zoneIdString: ZoneIdString)
{
    if (!isValidZoneIdString(zoneIdString))
        throw new Error(`Expected valid Timezone ID string, got ${zoneIdString}`);
    return zoneIdString;
}
