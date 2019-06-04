export declare class EventTokenBucket {
    private totalCapacity;
    private totalBucketSize;
    private totalLastFilled;
    private capacity;
    private fillPerSecond;
    private EventBuckets;
    private EventFilled;
    ThrottledEvents: {
        [eventName: string]: number;
    };
    NumberOfThrottledEvents: number;
    /**
     * Instantiate our event bucket and set the arguments to
     * the interal variables
     *
     * @param options Takes the capactiy, totalCapacity and the fillPerSecond
     */
    constructor(options: {
        capacity: number;
        totalCapacity: number;
        fillPerSecond: number;
    });
    private refillTotalBucket;
    /**
     *
     * @param eventName This will map to the bucket that the event was taken from
     */
    private refill;
    take(eventName: string): boolean;
}
