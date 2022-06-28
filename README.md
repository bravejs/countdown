# Countdown

## Instance

State in seconds:   
+ `-1`: not started
+ `>0`: counting down
+ `=0`: over

```ts
declare class Countdown {
  seconds: number;
  
  constructor(cb?: (seconds: number) => void);
  
  start(seconds: number): void;
  
  end(): void;
  
  reset(): void;
  
  cancel(): void;
  
  destroy(): void;
}
```
