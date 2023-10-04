import {ZoneId} from './ZoneId.js';

export abstract class TimeZone
{
    public static browser()
    {
        return ZoneId.browser();
    }
}