type Callback = (seconds: number) => void

class Countdown {
  // has not started (-1)
  // counting down (>0)
  // over (=0)
  seconds: number = -1

  private _tid: any = null
  private _cb: Callback

  constructor (cb: Callback) {
    this._cb = cb
  }

  start (seconds: number) {
    if (seconds > 0 && this.seconds <= 0) {
      this._tick(seconds, Date.now(), 0)
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
    this._cb = null as any
  }

  private _tick (seconds: number, startTime: number, diff: number) {
    this._update(seconds - diff)
    if (diff < seconds) {
      this._tid = setTimeout(() => {
        this._tick(seconds, startTime, Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
  }

  private _update (seconds: number) {
    this.seconds = seconds
    this._cb(seconds)
  }

  private _set (seconds: number) {
    this.cancel()
    if (this.seconds > seconds) {
      this._update(seconds)
    }
  }
}

export default Countdown
