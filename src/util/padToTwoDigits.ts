export function padToTwoDigits(aNumber: number): string {
    return `00${aNumber}`.slice(-2);
}