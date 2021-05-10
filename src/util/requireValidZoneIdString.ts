import {ZoneIdString} from "../ZoneId";
import {isValidZoneIdString} from "./isValidZoneIdString";

export function requireValidZoneIdString(zoneIdString: ZoneIdString)
{
    if (!isValidZoneIdString(zoneIdString))
        throw new Error(`Expected valid Timezone ID string, got ${zoneIdString}`);
    return zoneIdString;
}
