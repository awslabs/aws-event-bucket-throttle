## Event Bucket Throttle

A basic token bucket that throttles based on key. Not only does it have a total bucket size, but also contains "child" buckets to prevent a single event from overwhelming the bucket. 

## Installation

```
npm install event-bucket-throttle
```

## Usage

```javascript
const eventBucket = new EventTokenBucket({
    capacity: 20,
    totalCapacity: 40,
    fillPerSecond: 2
});

if (eventBucket.take("page.click")) {
    // Logic continues if event bucket hasn't been exhausted
}
```

## API
### take(eventName: string)
- Determines whether to throttle the event or not, based on the most up-to-date values of the TotalEventBucket and the bucket designated by the passed-in eventName. Decrements each bucket's open capacity accordingly if there is "space" for the event.
- @param [string] eventName: the name of the event that has occurred
- @returns [boolean] true if there is capacity for the event, false if there is not


## License Summary

This sample code and distributed is made available under the MIT license. 
