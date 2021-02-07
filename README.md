<img height="50px" src="https://github.com/Artiry/globol/blob/master/logo.png?raw=true">

General-purpose time library for Javascript/Typescript.

* Dates, times, time zones, durations and operations between all
* Immutable
* Fluent. No more searching docs, but intuitive use with auto-complete

Example:

```javascript
const currentTimeInNewYork = Instant
    .now() // gives an Instant, which is a moment in time, representing now
    .atZone('America/New_York') // returns a ZonedDateTime
    .toLocalTime(); // returns a LocalTime
```

[![npm version](https://badge.fury.io/js/globol.svg)](https://badge.fury.io/js/globol)
[![Build Status](https://travis-ci.org/Artiry/globol.svg?branch=master)](https://travis-ci.org/github/Artiry/globol)

# Install

```shell
npm install globol
```

# How to use
This library consists of a few key datatypes. The library provides plenty of methods to convert between instantiations of them.

## Representations of points in time
### Instant
This is a moment in physical time.
### ZonedDateTime
A date, with a time, and a timezone. Together, these three correspond with a moment in physical time. Unlike `Instant`, however, this object carries information in it in which timezone it is represented. For example: there can be a `ZonedDateTime` `2020-01-20T19:00Z+01` and a `ZonedDateTime` `2020-01-20T18:00Z+00`. They both correspond to the same moment in physical time, i.e. the same `Instant`, but they are two distinct `ZonedDateTimes`.
### LocalDateTime
### LocalTime

## Other import types
### Duration
### ZoneId
### ZoneOffset

# Feedback

If something is missing from this library that makes it not fit your use case today, or if you find a bug that spoils
it for you, don't hesitate to create an Issue or a Pull Request. Feedback and contributions are sincerely appreciated.


# License

The content of this project is licensed under the MIT license.
