/**
 * state in seconds:
 * -1: has not started
 * >0: counting down
 * =0: over
 */

class Countdown {
  seconds: number = -1

  private _tid: number = 0
  private _update: (seconds: number) => void

  constructor (cb?: (seconds: number) => void) {
    this._update = (seconds) => {
      this.seconds = seconds
      cb && cb(seconds)
    }
  }

  start (seconds: number) {
    if (seconds > 0 && this.seconds <= 0) {
      this._tick(Date.now(), seconds, 0)
    }
  }

  end () {
    this._set(0)
  }

  reset () {
    this._set(-1)
  }

  cancel () {
    if (this.seconds > 0) {
      clearTimeout(this._tid)
    }
  }

  destroy () {
    this.cancel()
    this._update = null as any
  }

  private _set (seconds: number) {
    if (this.seconds > seconds) {
      this.cancel()
      this._update(seconds)
    }
  }

  private _tick (time: number, start: number, elapsed: number) {
    this._update(start - elapsed)
    if (elapsed < start) {
      this._tid = setTimeout(() => {
        this._tick(time, start, Math.floor((Date.now() - time) / 1000))
      }, 1000)
    }
  }
}

export default Countdown
