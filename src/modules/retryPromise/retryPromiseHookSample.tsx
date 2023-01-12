import React, { useRef, useEffect, useState } from 'react'

import { BaseProps } from '@modals/basePropsInterface'
import Input from 'antd/lib/input/Input'
import useRetryPromise, { RetrialStateInfo } from './retryPromiseHook'
import { Button } from 'antd'
import { delayedPromise } from '@utils/utils'

interface RetryPromiseHookSampleOwnProps extends BaseProps {
}

/* eslint-disable */
const RetryPromiseHookSample: React.FC<RetryPromiseHookSampleOwnProps> = (props: RetryPromiseHookSampleOwnProps) => {
  const rety = useRef(0)

  // useEffect(() => {
  //     start()
  // })

  const start = () => {
    rety.current = 0
    attemptCall({ dummy: 'dummy' })
  }

  const stop = () => {
    abortRetry()
  }

  const [attemptCall, abortRetry] = useRetryPromise(async (data) => {
    return await new Promise(async (resolve, reject) => {
      rety.current++
      await delayedPromise(2000)
      if (rety.current === 10) {
        resolve('--res---')
      } else {
        reject('--rej--')
      }
    })
  }, (fail, retrialInfo: RetrialStateInfo) => {
    console.log('a fail', retrialInfo)
    return true
  }, (res, retrialInfo: RetrialStateInfo) => {
    console.log('done', retrialInfo)
  }, (rej, retrialInfo: RetrialStateInfo) => {
    console.log('fail final', retrialInfo)
  }, 10,
  // {type: 'fix', interval: 2000}
  // {type: 'linear', factor: 2000}
  // {type: 'exp', multiplier: 1000}
  { type: 'function', getNextInterval: (trialCounter: number) => { return trialCounter * 2000 - 500 } }
  )

  return <div>
        <Button onClick={start}> start </Button>
        <Button onClick={stop}> Abort </Button>

        Retry Counter: {rety.current}
    </div>
}

export default RetryPromiseHookSample
