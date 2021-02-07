export function isInt(numberValue: number): boolean
{
    return (numberValue - Math.floor(numberValue)) === 0;
}