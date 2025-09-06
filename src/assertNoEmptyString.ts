export function assertNoEmptyString(string: string, purpose: string) {
    if (string.length === 0) {
        throw new Error(`Invalid ${purpose} string: '${string}'`);
    }
}