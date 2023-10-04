import moment, {Moment, MomentInput} from 'moment';
import {requireValidMoment} from "./requireValidMoment.js";

export function newValidMoment(inp?: MomentInput, errorMessageWhenInvalid?: string): Moment
{
    return requireValidMoment(
        moment(inp, undefined, undefined),
        errorMessageWhenInvalid
    );
}