<img height="50px" src="https://github.com/Artiry/globol/blob/master/logo.png?raw=true">

Date & time library for Javascript/Typescript.

* Dates, times, time zones, durations, week days...
* **No more comparing apples and oranges**. Unlike `moment` and `date-fns`, clear & unambigous separation between
  * 'Dates' vs. 'Times' vs. 'DateTimes'
  * With vs. without timezone
  * 'Points in time' vs. 'points on the calendar'
* **Immutable**, unlike `moment.js`.
* **Fluent**. Unlike `date-fns`, no more searching docs, but intuitive use with auto-complete and in-place method/class/function documentation
* ISO-8601-compliant serilization/deserialization of all data representations

Example:

```javascript
const currentTimeInNewYork = LocalDateTime
    .now()
    .atZone(ZoneId.of('America/New_York')) // returns a ZonedDateTime
    .toLocalTime(); // returns a LocalTime
```

[![npm version](https://badge.fury.io/js/globol.svg)](https://badge.fury.io/js/globol)
[![Build Status](https://travis-ci.org/Artiry/globol.svg?branch=master)](https://travis-ci.org/github/Artiry/globol)

# Install

```shell
npm install globol
```

# How to use
This library consists of a few key datatypes. The library provides plenty of methods to convert between instantiations of them. The following are the most important datatypes, the ones that you should know of.

### Instant
This is a moment in physical time.
### LocalDateTime
A date with a time, e.g. `2020-01-20T19:34`
### LocalDate
A date, e.g. `2020-01-20`
### LocalTime
A time, e.g. `08:34:00.000`
### ZonedDateTime
A datetime with a zone offset, e.g. `2020-01-20T19:34Z+01`. Because it has an offset, it points to an unambiguous point in physical time, like Instant. Unlike `Instant`, however, this object cares about how the datetime is *represented*. For example: there can be a `ZonedDateTime` `2020-01-20T19:00Z+01` and a `ZonedDateTime` `2020-01-20T18:00Z+00`. They both correspond to the same moment in physical time, i.e. the same `Instant`, but they are two distinct `ZonedDateTimes`.
### Duration
A fixed length of physical time.
### ZoneId & ZoneOffset
These represent timezones. The difference between ZoneId and ZoneOffset is as follows: ZoneId represents something like `Europe/Amsterdam`, which can have a `ZoneOffset` of +1 in the winter and +2 in the summer.

# Feedback

If something is missing from this library that makes it not fit your use case today, or if you find a bug that spoils
it for you, don't hesitate to create an Issue or a Pull Request. Feedback and contributions are sincerely appreciated.


# License

The content of this project is licensed under the MIT license.
