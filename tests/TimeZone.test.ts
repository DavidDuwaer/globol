import {assert} from "chai";
import {TimeZone, ZoneId} from "../src";

describe('TimeZone', () => {
    describe('.browser()', () => {
        it('is the same as ZoneId.browser()', () => {
            assert.isTrue(ZoneId.browser().equals(TimeZone.browser()))
        })
    });
});