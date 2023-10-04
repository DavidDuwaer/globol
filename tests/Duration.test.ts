import {Duration} from "../dist/index.js";
import {assert} from "chai";
import {} from "mocha";

describe('Duration', () => {
    describe('.of factory method', () => {
        it('accepts whole years', () => {
            assert.equal(Duration.of({years: 2}).toString(), 'P2Y');
        })
        it('accepts whole fractional years', () => {
            assert.equal(Duration.of({years: 2.5}).toString(), 'P2Y6M');
        })
        it('accepts whole negative whole years', () => {
            assert.equal(Duration.of({years: -2}).toString(), '-P2Y');
        })
        it('accepts whole negative fractional years', () => {
            assert.equal(Duration.of({years: -2.5}).toString(), '-P2Y6M');
        })
        it('accepts whole days', () => {
            assert.equal(Duration.of({days: 2}).toString(), 'P2D');
        })
        it('accepts whole hours', () => {
            assert.equal(Duration.of({hours: 2}).toString(), 'PT2H');
        })
        it('accepts whole minutes', () => {
            assert.equal(Duration.of({minutes: 2}).toString(), 'PT2M');
        })
        it('accepts whole seconds', () => {
            assert.equal(Duration.of({seconds: 2}).toString(), 'PT2S');
        })
        it('accepts 1/1000ths of seconds', () => {
            assert.equal(Duration.of({seconds: 0.002}).toString(), 'PT0.002S');
        })
        it('throws error when attempting to enter <1/1000ths of seconds', () => {
            assert.throws(() => Duration.of({seconds: 0.0002}));
        })
    });

    describe('.format method', () => {
        const duration = Duration.of({
            years: 9,
            days: 8,
            hours: 7,
            minutes: 6,
            seconds: 5,
            millis: 4,
        })
        it('formats "H:mm:ss.SSS"', () => {
            assert.equal(duration.format('H:mm:ss.SSS'), '7:06:05.004')
        })
        it('formats "Y-D-H:mm:ss.SSS"', () => {
            assert.equal(duration.format('Y-D-H:mm:ss.SSS'), '9-8-7:06:05.004')
        })
        it('respects escaping "s.SSS\s"', () => {
            assert.equal(duration.format('s.SSS\s'), '5.004s')
        })
        it('respects escaping "s[S]"', () => {
            assert.equal(duration.format('s[S]'), '5S')
        })
        it('respects escaping "s[SSS]"', () => {
            assert.equal(duration.format('s[SSS]'), '5SSS')
        })
    })
});