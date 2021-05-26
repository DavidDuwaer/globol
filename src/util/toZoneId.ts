import {ZoneId, ZoneIdString} from "../ZoneId";

export function toZoneId(arg: ZoneIdString | ZoneId): ZoneId
{
    return arg instanceof ZoneId
        ? arg
        : ZoneId.of(arg);
}