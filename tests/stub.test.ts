import {Duration, Instant} from "../dist";
import {assert} from "chai";
import {LocalDate, LocalDateTime, LocalTime, ZonedDateTime, ZoneId} from "../src";

describe('that tests run', () => {
});

describe('instant', () => {
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


function testAddition(
    start: Instant,
    duration: Duration,
)
{
    const end = start.add(duration);
    assert.equal(
        duration.asMillis,
        end.toJS().getTime() - start.toJS().getTime(),
        `End time ${end.toJS()} not ${duration.asMillis}ms after start time ${start.toJS()}`
    );
}