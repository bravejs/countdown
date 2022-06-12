type Callback = (seconds: number) => void

class Countdown {
  // has not started (-1)
  // counting down (>0)
  // over (=0)
  seconds: number = -1

  private _timer: any
  private _callback: Callback

  constructor (callback: Callback) {
    this._callback = callback
  }

  start (seconds: number) {
    if (seconds > 0 && this.seconds <= 0) {
      this._go(seconds, Date.now(), 0)
    }
  }

  end () {
    this._force(0)
  }

  reset () {
    this._force(-1)
  }

  destroy () {
    this._clear()
    this._callback = null as any
  }

  private _go (seconds: number, startTime: number, diff: number) {
    this._update(seconds - diff)
    if (diff < seconds) {
      this._timer = setTimeout(() => {
        this._go(seconds, startTime, Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
  }

  private _update (seconds: number) {
    this.seconds = seconds
    this._callback(seconds)
  }

  private _force (seconds: number) {
    this._clear()
    if (this.seconds > seconds) {
      this._update(seconds)
    }
  }

  private _clear () {
    if (this.seconds > 0) {
      clearTimeout(this._timer)
    }
  }
}

export default Countdown
