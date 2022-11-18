import { rejects } from 'assert'
import React from 'react'

export default function useTimeTicker (defaultInterval: number | undefined, tag: string | undefined, onTimeTick: () => void) {
  const [intervalValue, setIntervalValue] = React.useState<number | undefined>()
  // const [isInWaitForSchduleTimoutToFinish, setIsInWaitForSchduleTimoutToFinish] = React.useState<boolean>(false);
  let intervalId: any

  const _onTimeTick = () => {
    console.log('from time interval', tag)
    onTimeTick && onTimeTick()
    // setTimeout(() => {
    //     _onTimeTick();
    // }, intervalValue * 1000);
  }

  // const waitForSchduleTimoutToFinish = async () => {
  //     isInWaitForSchduleTimoutToFinish = (true)
  //     return new Promise((resolve, rejects) => {
  //         setTimeout(() => {
  //             resolve("ok")
  //             isInWaitForSchduleTimoutToFinish = (false)
  //         }, (intervalValue ? intervalValue : 0)+2 * 1000);
  //     })
  // }

  const start = async (_intervalValue: number) => {
    // await waitForSchduleTimoutToFinish()

    // setIntervalValue(_intervalValue)
    // _onTimeTick()

    if (!_intervalValue || _intervalValue <= 0) {
      console.error('intervalValue is not correct', _intervalValue)
      return
    }

    if (intervalId) {
      clearInterval(intervalId)
    }

    if (_intervalValue) {
      intervalId = setInterval(() => {
        _onTimeTick()
      }, _intervalValue * 1000)
    }
  }

  return [start]
}
