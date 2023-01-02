
export type ISOSerializationOptions = {
    /**
     * Number of second digits to use when serializing a string
     * to ISO-8601, e.g. with {@link Instant.toString}. Setting
     * this value to `undefined` means there is no limit, and
     * as many digits are serialized as are known. Default
     * value: `undefined`.
     */
    numberOfISO8601SecondDigits?: number
};
