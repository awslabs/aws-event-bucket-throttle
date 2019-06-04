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
    // Logic continues event bucket hasn't been exhausted
}
```

## License Summary

This sample code and distributed is made available under the MIT license. 
