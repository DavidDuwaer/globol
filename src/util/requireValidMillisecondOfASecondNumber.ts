export function requireValidMillisecondOfASecondNumber(number: number): number
{
    if (number < 0 || number >= 1000)
        throw new Error(`Expected a valid millisecond-of-a-second number (0 <= x < 1000), got ${number}.`)
    return number;
}