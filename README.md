<img height="50px" src="https://github.com/Artiry/globol/blob/master/logo.png?raw=true">

Javascript/Typescript date/time as it should be: immutable, fluent, multi-zone, intuitive. Inspired by the masterful java.time library which suddenly made dates easy. For example:

```javascript
const currentTimeInNewYork = Instant
    .now() // gives an Instant, which is a moment in time, representing now
    .atZone('America/New_York') // returns a ZonedDateTime
    .toLocalTime(); // returns a LocalTime
```

The fluent syntax will help you solve any problem you have with dates.

[![npm version](https://badge.fury.io/js/globol.svg)](https://badge.fury.io/js/globol)
[![Build Status](https://travis-ci.org/Artiry/globol.svg?branch=master)](https://travis-ci.org/github/Artiry/globol)

# Install


```shell
npm install globol
```

# Feedback

If something is missing from this library that makes it not fit your use case today, or if you find a bug that spoils
it for you, don't hesitate to create an Issue or a Pull Request. Feedback and contributions are sincerely appreciated.


# License

The content of this project is licensed under the MIT license.
