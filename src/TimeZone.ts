import {ZoneId} from './ZoneId';

export abstract class TimeZone
{
    public static browser()
    {
        return ZoneId.browser();
    }
}