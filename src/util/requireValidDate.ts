export function requireValidDate(date: Date): Date
{
    if (!((date as any) instanceof Date))
        throw new Error(`Expected value '${date}' to be a date`);
    if (!isDateValid(date))
        throw new Error(`Expected date to be valid, got ${date}`);
    return date;
}

function isDateValid(date: Date)
{
    return !isNaN(date.getTime());
}