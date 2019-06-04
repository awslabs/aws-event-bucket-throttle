import { EventTokenBucket } from "../eventBucketThrottle";
import * as _ from "lodash";

const TOTAL_CAPACITY = 40;
const BUCKET_CAPACITY = 20;

test("Event bucket works as expected", () => {
    // Random number of events from 100-1000
    let numEvents = _.random(100, 1000);
    // Start with the date at 0
    let currentDate = 1000;
    const TIME_BUMP = 50;

    // The tests will fail if you increase this more than 5
    // why? I have no idea, it took enough to get that conditional
    // right below
    const FILL_PER_SECOND = _.random(2,5);

    // ** IMPORTANT **
    // This method is called twice for every time
    // eventBucket.take gets called because there are 
    // two times that Date.now is called (look at refill and refillTotalBucket signatures)
    global.Date.now = jest.fn(() => {
        // We'll bump the current date forward by a 10th of a second
        // We'll just expect that we're flooding our API at this rate
        currentDate += TIME_BUMP; 
        return currentDate;
    });

    const eventBucket = new EventTokenBucket({
        capacity: BUCKET_CAPACITY, 
        totalCapacity: TOTAL_CAPACITY, 
        fillPerSecond: FILL_PER_SECOND
    });

    for (let index = 0; index < numEvents; index++) {
        const result = eventBucket.take("testEvent");
        // Calculate the number of events that we have before the
        // the initial bucket exhaustion takes place
        // we use the basic bucket capacity and caculate how many tokens
        // are added to the bucket during the time it takes to exhaust the capcity
        // Note: we multiply by 2 since Date.now() is called twice for this event check
        const EVENTS_BEFORE_EXHAUSTION = BUCKET_CAPACITY + ((2 * TIME_BUMP * BUCKET_CAPACITY) / 1000) * FILL_PER_SECOND;

        // Test to see if the event is before the capacity exhuastion
        // OR
        // If the event index is within the range of when the bucket is getting refilled
        if (index < EVENTS_BEFORE_EXHAUSTION || _.range(0, FILL_PER_SECOND).indexOf((index)%(1000/TIME_BUMP/2)) !== -1) {
            expect(result).toBe(true);
        } else {
            expect(result).toBe(false);
        }
    }
});

test("Event bucket works with permutated events", () => {
    // Random number of events from 100-1000
    let numEvents = _.random(100, 1000);
    // Start with the date at 0
    let currentDate = 1000;
    const TIME_BUMP = 50;

    const FILL_PER_SECOND = _.random(2,5);

    // ** IMPORTANT **
    // This method is called twice for every time
    // eventBucket.take gets called because there are 
    // two times that Date.now is called (look at refill and refillTotalBucket signatures)
    global.Date.now = jest.fn(() => {
        // We'll bump the current date forward by a 10th of a second
        // We'll just expect that we're flooding our API at this rate
        currentDate += TIME_BUMP; 
        return currentDate;
    });

    const eventBucket = new EventTokenBucket({
        capacity: 20, 
        totalCapacity: TOTAL_CAPACITY,
        fillPerSecond: FILL_PER_SECOND
    });

    for (let index = 0; index < numEvents; index++) {
        const result = eventBucket.take(`testEvent${index}`);
        // Calculate the number of events that we have before the
        // the initial bucket exhaustion takes place
        // we use the basic bucket capacity and caculate how many tokens
        // are added to the bucket during the time it takes to exhaust the capcity
        // Note: we multiply by 2 since Date.now() is called twice for this event check
        const EVENTS_BEFORE_EXHAUSTION = TOTAL_CAPACITY + ((TIME_BUMP * TOTAL_CAPACITY) / 1000) * FILL_PER_SECOND;

        // Test to see if the event is before the capacity exhuastion
        // OR
        // If the event index is within the range of when the bucket is getting refilled
        if (index < EVENTS_BEFORE_EXHAUSTION || _.range(0, FILL_PER_SECOND).indexOf((index + 1)%(1000/TIME_BUMP)) !== -1) {
            expect(result).toBe(true);
        } else {
            expect(result).toBe(false);
        }
    }
});