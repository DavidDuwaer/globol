import {Moment} from "moment";

export function requireValidMoment(moment: Moment, message?: string): Moment
{
    if (!moment.isValid())
        throw new Error(
            message !== undefined
                ? `Constructed Moment is invalid. ${message}`
                : `Constructed Moment is invalid`
        );
    return moment;
}