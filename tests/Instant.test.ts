import {Duration, Instant, LocalDate, LocalDateTime, LocalTime, now, ZoneId} from "../dist/index.js";
import {assert} from "chai";
import {DurationSpec} from "../src/DurationSpec.js";

describe('instant', () => {
    describe('.add(Duration)', () => {
        it('adds duration at time transition', () => {
            testAddition(Instant.parse('2021-03-28T00:45+00:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T00:45+01:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T00:45+02:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T00:45+03:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T00:45+04:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T01:45+00:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T01:45+01:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T01:45+02:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T01:45+03:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T01:45+04:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T02:45+00:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T02:45+01:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T02:45+02:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T02:45+03:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T02:45+04:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T03:45+00:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T03:45+01:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T03:45+02:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T03:45+03:00'), Duration.ofMinutes(15));
            testAddition(Instant.parse('2021-03-28T03:45+04:00'), Duration.ofMinutes(15));
        })
        it('adds duration at time transition', () => {
            const zonedDateTime = LocalDateTime.of(
                new LocalDate(2021, 5, 16),
                new LocalTime(11, 0)
            ).atZone(ZoneId.of('UTC'));
            assert.equal(zonedDateTime.toString(), '2021-05-16T11:00:00.000+00:00');
            const sameInstantOtherZone = zonedDateTime.toInstant().atZone(ZoneId.of('Europe/Amsterdam'))
            assert.equal(sameInstantOtherZone.toString(), '2021-05-16T13:00:00.000+02:00');
        })
    });
    describe('.add(DurationSpec) method', () => {
        it('adds duration correctly', () => {
            testAddition(Instant.parse('2021-03-28T00:45+00:00'), {years: 15});
            testAddition(Instant.parse('2021-03-28T00:45+01:00'), {days: 15});
            testAddition(Instant.parse('2021-03-28T00:45+02:00'), {hours: 15});
            testAddition(Instant.parse('2021-03-28T00:45+03:00'), {minutes: 15});
            testAddition(Instant.parse('2021-03-28T00:45+04:00'), {seconds: 15});
            testAddition(Instant.parse('2021-03-28T01:45+00:00'), {millis: 15});
            testAddition(Instant.parse('2021-03-28T01:45+01:00'), {seconds: .015});
            testAddition(Instant.parse('2021-03-28T01:45+02:00'), {years: 15});
            testAddition(Instant.parse('2021-03-28T01:45+03:00'), {days: 15});
            testAddition(Instant.parse('2021-03-28T01:45+04:00'), {hours: 15});
            testAddition(Instant.parse('2021-03-28T02:45+00:00'), {minutes: 15});
            testAddition(Instant.parse('2021-03-28T02:45+01:00'), {seconds: 15});
            testAddition(Instant.parse('2021-03-28T02:45+02:00'), {millis: 15});
            testAddition(Instant.parse('2021-03-28T02:45+03:00'), {seconds: .015});
            testAddition(Instant.parse('2021-03-28T02:45+04:00'), {years: 15});
            testAddition(Instant.parse('2021-03-28T03:45+00:00'), {days: 15});
            testAddition(Instant.parse('2021-03-28T03:45+01:00'), {hours: 15});
            testAddition(Instant.parse('2021-03-28T03:45+02:00'), {minutes: 15});
            testAddition(Instant.parse('2021-03-28T03:45+03:00'), {seconds: 15});
            testAddition(Instant.parse('2021-03-28T03:45+04:00'), {millis: 15});
        });
    });
    describe('.minus(DurationSpec) method', () => {
        it('subtracts duration correctly', () => {
            assert.equal(
                Instant.parse('2021-03-28T00:45+00:00').minus({years: 15}).toEpochMilli(),
                Instant.parse('2006-03-28T00:45+00:00').toEpochMilli()
            )
        });
    });
    describe('.minus(Instant) method', () => {
        it('subtracts instant correctly', () => {
            assert.equal(
                Instant.parse('2021-03-28T00:45+00:00').minus(Instant.parse('2021-03-27T00:45+00:00')).asHours,
                24
            )
        });
    });
    describe('.toString(...) method', () => {
        it('serializes correctly', () => {
            assert.equal(
                Instant.parse('2021-03-28T00:45+00:00').toString(),
                '2021-03-28T00:45:00.000Z'
            )
        })
        it('respects reduced digits', () => {
            assert.equal(
                Instant.parse('2021-03-28T00:45:23.456+00:00')
                    .toString({
                        numberOfISO8601SecondDigits: 2
                    }),
                '2021-03-28T00:45:23.46Z'
            )
        })
        it('respects increased digits', () => {
            assert.equal(
                Instant.parse('2021-03-28T00:45:23.456+00:00')
                    .toString({
                        numberOfISO8601SecondDigits: 5
                    }),
                '2021-03-28T00:45:23.45600Z'
            )
        })
    })
});

describe('now() function', () => {
    it('returns the current time', () => {
        const before = Date.now();
        const sample = now();
        const after = Date.now();
        assert.isTrue(before <= sample.toEpochMilli());
        assert.isTrue(after >= sample.toEpochMilli());
    })
});

function testAddition(
    start: Instant,
    duration: Duration | DurationSpec,
)
{
    const end = start.add(duration);
    const asDuration = (duration instanceof Duration ? duration : Duration.of(duration));
    assert.equal(
        asDuration.asMillis,
        end.toJS().getTime() - start.toJS().getTime(),
        `End time ${end.toJS()} not ${asDuration.asMillis}ms after start time ${start.toJS()}`
    );
}