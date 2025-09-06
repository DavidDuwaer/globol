import {ZoneId, ZoneIdString} from "../ZoneId.js";

export function toZoneId(arg: ZoneId | ZoneIdString | string): ZoneId
{
    return arg instanceof ZoneId
        ? arg
        : ZoneId.of(arg);
}