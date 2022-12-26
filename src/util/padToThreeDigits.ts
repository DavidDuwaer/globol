export function padToThreeDigits(aNumber: number): string {
    return `000${aNumber}`.slice(-3);
}