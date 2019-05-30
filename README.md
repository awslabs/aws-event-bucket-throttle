# aws-event-bucket-throttle
A basic token bucket that throttles based on key. Not only does it have a total bucket size, but also contains "child" buckets to prevent a single event from overwhelming the bucket.
