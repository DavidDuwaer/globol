import {assert} from "chai";
import {TimeZone, ZoneId} from "../dist/index.js";

describe('TimeZone', () => {
    describe('.browser()', () => {
        it('is the same as ZoneId.browser()', () => {
            assert.isTrue(ZoneId.browser().equals(TimeZone.browser()))
        })
    });
});