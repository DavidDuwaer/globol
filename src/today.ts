import {now} from "./Instant";
import {LocalDate} from "./LocalDate";
import {ZoneId, ZoneIdString} from "./ZoneId";

/**
 * @param timeZone Override the timezone. Default is browser's time zone.
 */
export function today(timeZone?: ZoneId | ZoneIdString): LocalDate {
  return now()
    .atZone(timeZone ?? ZoneId.browser())
    .toLocalDate()
}