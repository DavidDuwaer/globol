import {ZoneId, ZoneIdString} from "../ZoneId.js";

export function toZoneId(arg: ZoneIdString | ZoneId): ZoneId
{
    return arg instanceof ZoneId
        ? arg
        : ZoneId.of(arg);
}