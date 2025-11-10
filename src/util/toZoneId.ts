import {ZoneId, ZoneIdString} from "../ZoneId.js";

export function toZoneId(arg: ZoneId | ZoneIdString | string): ZoneId {
    return ZoneId.isInstance(arg)
        ? arg
        : ZoneId.of(arg)
}