<p align="center">
<img height="100px" src="https://github.com/Artiry/globol/blob/master/logo.png?raw=true">
 </p>
<p align="center">
 Date & time library built for Typescript <i>first</i>.<br>
 Optimized for ease of use, speed of use and minimization of bugs.
 </p>
 <p align="center">
 <a href="https://badge.fury.io/js/globol">
  <img src="https://badge.fury.io/js/globol.svg"/>
 </a>
  <a href="https://travis-ci.org/github/Artiry/globol">
  <img src="https://travis-ci.org/Artiry/globol.svg?branch=master"/>
 </a>
<a href='https://coveralls.io/github/Artiry/globol?branch=master'><img src='https://coveralls.io/repos/github/Artiry/globol/badge.svg?branch=master' alt='Coverage Status' /></a>
 </p>

* Dates, times, timestamps, time zones, durations.
* Conversion between them and calculations with them.
* **Type safe**. An API that *works*. No comparing apples and oranges. You want to express an instant in time, a date on a calendar, a time on the clock? When zones come into play, they are not interchangeable. No longer are these concepts all thrown into one date type. Clearly de-obfuscated, dates & time become intuitive.
* **Immutable**.
* **Fail early**. No more `NaN`'s slipping into your date objects. Globol checks its input, and throws errors with helpful messages if there's something wrong.
* **Fluent**. No searching the web for which functions suit your needs, but finding what you need with auto-complete.
* **In-place documentation**. Help yourself without leaving your IDE, with extensive JSDoc on all methods and functions.
* ISO-8601-compliant serilization/deserialization of all data representations.
* Under the hood, currently uses the **well-tested**, **well-trusted** `moment.js` internally for parsing, formatting and time zone conversions.
* **Uses moment-timezone** for time zone information. Future work is to make this optionally injectable, so `globol` can be smaller for users that need it to be.

Example:

```javascript
const timeInNewYork = now()     // returns an Instant in time (≡ a timestamp)
    .atZone('America/New_York') // returns that Instant expressed in a certain time zone; a ZonedDateTime
    .toLocalTime();             // returns a time on the clock without a date, a LocalTime
```


# Install

```typescript
npm install globol
```

# How to use
This library consists mainly of a few smart data types that each describe a different concept of time.
This is what they are and how they relate to eachother:

<img width="600" src="https://github.com/Artiry/globol/blob/master/docs/type-diagram-1.0.svg?raw=true"/>

You can create instances of any one of them with static methods from their classes, e.g. `Instant.from(...)`,
`Instant.parse(...)` or `LocalTime.browser()`.
Similar methods exist on all Globol data types.
Once a data type is instantiated, there are methods for converting between them and doing calculations and
comparisons with them.

Below is a dedicated description for each data type.

### Instant
This is a moment in time, a timestamp. Is equivalent to a number of (milli)seconds since the epoch.
### ZonedDateTime
A date with a time and a time zone offset, e.g. `2020-01-20T19:34Z+01`. A `ZonedDateTime` implies one `Instant`, but one `Instant` can be represented in at least 24 ZonedDateTimes (one for each time zone).
### LocalDateTime
A date and a time together, but without a zone, e.g. `2020-01-20T19:34`
### LocalDate
A date without a time, e.g. `2020-01-20`
### LocalTime
A time without a date, e.g. one LocalTime can mean `18:34` or `6:34 PM`, depending on how you format it in string form.
### Duration
A fixed length of physical time.
### ZoneId & ZoneOffset
These represent timezones. The difference between ZoneId and ZoneOffset is as follows: ZoneId represents something like `Europe/Amsterdam`, which can have a `ZoneOffset` of +1 in the winter and +2 in the summer.

# Usage examples
Get the current timestamp
```typescript
Instant.now()                // returns an Instant
```

Or use the shorthand
```typescript
now()                        // returns an Instant
```

Get the current time on the clock (e.g. '14:57') in Berlin
```typescript
now()                        // a timestamp
    .atZone('Europe/Berlin') // returns a ZonedDateTime: the timestamp represented in this zone
    .toLocalTime()           // returns a LocalTime, e.g. '14:57'
```

# Future work
## Time zone information
Browsers provide time zone information, but the support is still limited/incomplete. Therefore we'd like to make it optional to include the moment-timezone dependency. This can be done by make a separate NPM dependency called `globol-timezone` which, when included, runtime-enriches Globol with the `moment-timezone` time zone information. When it's left out globol would rely on the time zone information supplied by the browser.

# Feedback

If something is missing from this library that makes it not fit your use case today, or if you find a bug that spoils
it for you, don't hesitate to create an Issue (just a stub is better than nothing!) or a Pull Request. At this moment, the library is not at 1.0 yet and is organically growing to suit the use cases we run into first! Any feedback and/or contribution is sincerely appreciated.


# License

The content of this project is licensed under the MIT license.
