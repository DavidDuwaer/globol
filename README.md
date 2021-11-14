<p align="center">
<img height="100px" src="https://github.com/Artiry/globol/blob/master/logo.png?raw=true">
 </p>
<p align="center">
Date & time library for Javascript/Typescript<br>Made with the user (that's you! the programmer!) in mind.
 </p>
 <p align="center">
 <a href="https://badge.fury.io/js/globol">
  <img src="https://badge.fury.io/js/globol.svg"/>
 </a>
  <a href="https://travis-ci.org/github/Artiry/globol">
  <img src="https://travis-ci.org/Artiry/globol.svg?branch=master"/>
 </a>
 </p>

* Dates, times, time zones, durations, week days...
* Based on ideas taken from the amazing Java `java.time` library.
* **Type safe**. No more comparing apples and oranges when it comes to dates. You want to express a moment in time, a date on the calendar, a time on the clock? With or without a timezone, or maybe a zone offset? No longer are these concepts all thrown into one object, or worse, no object at all.
* **Immutable**. The 00s are long gone, but still gets a mention.
* **Fail early**. Arithmetics with dates can get complex enough. To reduce complexity, you need to know that your date objects are what you think they are. So Globol checks its input, and throws Errors with helpful messages if there's something wrong.
* **Fluent**. No searching the web for which functions suit your needs, but intuitive use with auto-complete and in-place method/class/function documentation.
* ISO-8601-compliant serilization/deserialization of all data representations.
* Under the hood, currently uses the **well-tested**, **well-trusted** `moment.js` internally for parsing, formatting and time zone conversions.
* **Uses moment-timezone** for time zone information. Future work is to make this optionally injectable, so `globol` can be smaller for users that need it to be.

Example:

```javascript
const timeInNewYork = Instant
    .now()                      // returns a global timestamp; an Instant
    .atZone('America/New_York') // returns that time expressed in a certain time zone; a ZonedDateTime
    .toLocalTime();             // returns a time on the clock, e.g. "14:00"; a LocalTime
```


# Install

```typescript
npm install globol
```

# Usage examples
Get the current timestamp
```typescript
Instant.now() // returns an Instant
```

Get the current time on the clock (e.g. '14:57') in Berlin
```typescript
Instant.now()
    .atZone('Europe/Berlin') // returns a ZonedDateTime
    .toLocalTime() // returns a LocalTime
```

# Core concepts
This library consists of a few key datatypes. The library provides plenty of methods to convert between instantiations of them. The following are the most important datatypes, the ones that you should know of.

### Instant
This is a moment in physical time. This is the thing you will likely use most often.
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

# Future work
## Time zone information
Browsers provide time zone information, but the support is still limited/incomplete. Therefore we'd like to make it optional to include the moment-timezone dependency. This can be done by make a separate NPM dependency called `globol-timezone` which, when included, runtime-enriches Globol with the `moment-timezone` time zone information. When it's left out globol would rely on the time zone information supplied by the browser.

# Feedback

If something is missing from this library that makes it not fit your use case today, or if you find a bug that spoils
it for you, don't hesitate to create an Issue (just a stub is better than nothing!) or a Pull Request. At this moment, the library is not at 1.0 yet and is organically growing to suit the use cases we run into first! Any feedback and/or contribution is sincerely appreciated.


# License

The content of this project is licensed under the MIT license.
