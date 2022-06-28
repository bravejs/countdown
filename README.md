# Countdown

## Instance
```ts
declare class Countdown {
  /**
   * -1: has not started
   * >0: counting down
   * =0: over
   */
  seconds: number;
  
  constructor(cb: (seconds: number) => void);
  
  start(seconds: number): void;
  
  end(): void;
  
  reset(): void;
  
  cancel(): void;
  
  destroy(): void;
}
```
