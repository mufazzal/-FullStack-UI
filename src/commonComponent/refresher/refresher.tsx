import { SearchOutlined } from '@ant-design/icons'
import { BaseProps } from '@modals/basePropsInterface'
// import { Button, Radio, RadioChangeEvent } from 'antd';
import Button from 'antd/es/button'
import Radio, { RadioChangeEvent } from 'antd/es/radio'
import React, { useEffect, useState } from 'react'

interface RefresherOwnFormProps extends BaseProps {
  intervalOptions: number[]
  defaultInterval?: number
  showManualRefresh?: boolean
  refresherTag?: string

  onRefreshIntervalChange?: (newInterval: boolean) => boolean
  onRefresh: (isManual: boolean) => boolean | undefined
  onError?: (errorMessage: string) => void
}

/*eslint-disable */
const Refresher: React.FC<RefresherOwnFormProps> = (props: RefresherOwnFormProps) => {
  const [value, setValue] = useState<number | undefined>(props.defaultInterval)
  // const [intervalId, setIntervalId] = useState<any>(-1);
  useEffect(() => {
    let intervalId: any
    if (value) {
      onAutoRefresh()
      intervalId = setInterval(() => {
        onAutoRefresh()
      }, value * 1000)
    } else {
      (props.onError != null) && props.onError('Invalid interval value: ' + value)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [value])

  const onRefreshIntervalChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)

    // if(intervalId) {
    //     clearInterval(intervalId)
    // }

    ;(props.onRefreshIntervalChange != null) && props.onRefreshIntervalChange(e.target.value)
  }

  const onManualRefresh = () => {
    props.onRefresh && props.onRefresh(true)
  }

  const onAutoRefresh = () => {
    console.log('Refresher: ', props.refresherTag)
    props.onRefresh && props.onRefresh(false)
  }

  return (<div className='refresher'>

        <Radio.Group
            onChange={onRefreshIntervalChange} value={value} buttonStyle="solid">

            {props.intervalOptions && props.intervalOptions.map((intOp: number) => {
              return <Radio.Button value={intOp}>{intOp} seconds</Radio.Button>
            })}

        </Radio.Group>

        {props.showManualRefresh
          ? <Button
                onClick={onManualRefresh}
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                loading={false} />
          : ''}

    </div>)
}
export default Refresher
