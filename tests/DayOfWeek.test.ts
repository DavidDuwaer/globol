import {assert} from "chai";
import "mocha";
import {DayOfWeek} from "../dist/index.js";

describe('DayOfWeek', () => {
    describe('.parse factory method', () => {
        it('accepts MONDAY', () => assert.equal(DayOfWeek.parse('MONDAY').id, 'MONDAY'));
        it('accepts TUESDAY', () => assert.equal(DayOfWeek.parse('TUESDAY').id, 'TUESDAY'));
        it('accepts WEDNESDAY', () => assert.equal(DayOfWeek.parse('WEDNESDAY').id, 'WEDNESDAY'));
        it('accepts THURSDAY', () => assert.equal(DayOfWeek.parse('THURSDAY').id, 'THURSDAY'));
        it('accepts FRIDAY', () => assert.equal(DayOfWeek.parse('FRIDAY').id, 'FRIDAY'));
        it('accepts SATURDAY', () => assert.equal(DayOfWeek.parse('SATURDAY').id, 'SATURDAY'));
        it('accepts SUNDAY', () => assert.equal(DayOfWeek.parse('SUNDAY').id, 'SUNDAY'));
        it('throws on other input', () => assert.throws(() => DayOfWeek.parse('foo')));
    });

    describe('.plus', () => {
        it('accepts positive <7', () => {
            const monday = DayOfWeek.parse('MONDAY');
            assert.equal(monday.plus(2).id, 'WEDNESDAY')
        });
        it('accepts positive 7', () => {
            const monday = DayOfWeek.parse('MONDAY');
            assert.equal(monday.plus(7).id, 'MONDAY')
        });
        it('accepts positive >7', () => {
            const monday = DayOfWeek.parse('MONDAY');
            assert.equal(monday.plus(10).id, 'THURSDAY')
        });
        it('accepts negative <7', () => {
            const monday = DayOfWeek.parse('MONDAY');
            assert.equal(monday.plus(-2).id, 'SATURDAY')
        });
        it('accepts negative 7', () => {
            const monday = DayOfWeek.parse('MONDAY');
            assert.equal(monday.plus(-7).id, 'MONDAY')
        });
        it('accepts negative >7', () => {
            const monday = DayOfWeek.parse('MONDAY');
            assert.equal(monday.plus(-10).id, 'FRIDAY')
        });
    });
});