import {assert} from "chai";
import "mocha";
import {LocalDate} from "../dist/index.js";

describe('LocalDate', () => {
    describe('.from factory method', () => {
        it('works for "now"', () => assertDateCorrectlyAccepted(new Date()));
        it('works for "2021-01-01T00:01:00Z"', () => assertDateCorrectlyAccepted(new Date('2021-01-01T00:01:00Z')));
        function assertDateCorrectlyAccepted(date: Date)
        {
            const localDate = LocalDate.from(date);
            assert.equal(localDate.dayOfMonth, date.getDate());
            assert.equal(localDate.year, date.getFullYear());
            assert.equal(localDate.month, date.getMonth() + 1);
        }

    });
    describe('.parse factory method', () => {
        function testParseAndToString(from: string, expect?: string)
        {
            it(`works for '${from}'`, () => assert.equal(LocalDate.parse(from).toString(), expect ?? from));
        }
        testParseAndToString('2021-01-01');
        testParseAndToString('-500-01-01', '-0500-01-01');
    });
    describe('.diffInDays method', () => {
        const values = [
            {subject: '2021-03-29', other: '2021-03-28', expect: 1},
            {subject: '2021-03-29', other: '2021-03-27', expect: 2},
            {subject: '2021-03-26', other: '2021-02-26', expect: 28},
            {subject: '2020-03-26', other: '2020-02-26', expect: 29},
            {subject: '2020-02-26', other: '2020-03-26', expect: -29},
            {subject: '2020-02-26', other: '2020-02-26', expect: 0},
            {subject: '2019-03-26', other: '2020-03-26', expect: -366},
            {subject: '2020-03-26', other: '2021-03-26', expect: -365},
        ];
        values.forEach(({subject, other, expect}) => {
            it(`${subject} minus ${other} is ${expect}`, () => assert.equal(
                expect,
                LocalDate.parse(subject).diffInDays(LocalDate.parse(other))
            ))
        })
    });
    describe('.isBefore method', () => {
        function assertIsBefore(a: string, b: string, expect: boolean)
        {
            it(`'${a}' is ${expect ? '' : 'not'} before '${b}'`, () => assert.equal(
                LocalDate.parse(a).isBefore(LocalDate.parse(b)),
                expect
            ));
        }
        assertIsBefore('2021-01-01', '2021-02-01', true);
        assertIsBefore('2021-01-01', '2021-01-02', true);
        assertIsBefore('2020-01-01', '2021-01-01', true);
        assertIsBefore('2021-01-01', '2021-1-1', false);
    });
    describe('.isAfter method', () => {
        function assertIsAfter(a: string, b: string, expect: boolean)
        {
            it(`'${a}' is ${expect ? '' : 'not'} before '${b}'`, () => assert.equal(
                LocalDate.parse(a).isAfter(LocalDate.parse(b)),
                expect
            ));
        }
        assertIsAfter('2021-01-01', '2021-02-01', false);
        assertIsAfter('2021-01-01', '2021-01-02', false);
        assertIsAfter('2020-01-01', '2021-01-01', false);
        assertIsAfter('2021-01-01', '2021-1-1', false);
        assertIsAfter('2021-03-02', '2021-03-01', true);
        assertIsAfter('2021-03-02', '2021-02-02', true);
        assertIsAfter('2021-03-02', '2020-03-02', true);
    });
});