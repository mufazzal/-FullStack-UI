import React from 'react'
import { BaseProps } from '@modals/basePropsInterface'
import { SupportSnapshot } from '@modals/support/support'
// import { Card, Descriptions } from 'antd';

import Descriptions from 'antd/lib/descriptions'
import Card from 'antd/lib/card'

import LiveTicketWidgetHeader from './Header'
import useSafeFetch from '@utils/useSafeFetch'
// import StylishDescription from './CaseStyleWidgt';

interface LiveTicketWidgetOwnProps extends BaseProps {
  className?: string
}

const LiveTicketWidget: React.FC<LiveTicketWidgetOwnProps> = (props: LiveTicketWidgetOwnProps) => {
  const [fetchSafely, safeFetchLoading, safeFetchResponse, safeFetchError] =
        useSafeFetch('/api/supportWidget', false, null) // http://localhost:3010

  const [callCounter, setCallCounter] = React.useState<number>(0)
  const [supportSnapshot, setSupportSnapshot] = React.useState<SupportSnapshot | undefined>(undefined)

  // React.useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/todos/2').
  //         then(res => {
  //             return ({
  //                 totalNumberOfTicket: 10,
  //                 totalOpenTicket: 3,
  //                 totalInWaitTicket: 5,
  //                 totalCloseTicket: 2,
  //                 time: new Date().toLocaleString()
  //             } as SupportSnapshot)
  //         }).then((res: SupportSnapshot) => {
  //             setSupportSnapshot(res)
  //             setTimeout(() => {
  //                 setCallCounter(callCounter + 1)
  //             }, .5 * 60 * 1000);
  //         })

  //     return () => {

  //     }
  // }, [callCounter])

  React.useEffect(() => { console.log('just for fun -'); return () => { console.log('CLEAN UP just for fun -') } }) // will call in between each render and effect AND just befire last render
  React.useEffect(() => { console.log('just for fun []'); return () => { console.log('CLEAN UP just for fun []') } }, [])
  React.useEffect(() => { console.log('just for fun [callCounter]'); return () => { console.log('CLEAN UP just for fun [callCounter]') } }, [callCounter])
  React.useEffect(() => { console.log('just for fun [3]'); return () => { console.log('CLEAN UP just for fun [3]') } }, [3])

  console.log('----i m in render-----')

  const onRefreshEvent = (isManual: boolean | undefined): boolean => {
    console.log('-- in LiveTicketWidget onRefreshEvent ', isManual)

    fetchSafely()
      .then((res: SupportSnapshot) => {
        setCallCounter((prevCounter: number) => { return prevCounter + 1 })
        setSupportSnapshot(res)
      }).catch((_err: any) => {

      })

    // fetch('https://jsonplaceholder.typicode.com/todos/2').
    //     then(async (res) => {

    //         await new Promise((r,rj) => {setTimeout(()=>r("ok"), 2000)})

    //         return ({
    //             totalNumberOfTicket: 10,
    //             totalOpenTicket: 3,
    //             totalInWaitTicket: 5,
    //             totalCloseTicket: 2,
    //             time: new Date().toLocaleString()
    //         } as SupportSnapshot)
    //     }).then((res: SupportSnapshot) => {
    //         setCallCounter((prevCounter: number) => { return prevCounter + 1})
    //         setSupportSnapshot(res)
    //     })

    return true
  }

  return (<div className={props.className}>

        <LiveTicketWidgetHeader onRefreshEvent={onRefreshEvent}/>

        {safeFetchLoading ? 'fetching latest..' : '-'}

        <Card style={{ width: 300, marginTop: 16 }} title={`Tickets - ${callCounter}`}>
            <Descriptions bordered={true} column={1}>
                <Descriptions.Item label="Total Tickets">{supportSnapshot?.totalNumberOfTicket}</Descriptions.Item>
                <Descriptions.Item label="Open">{supportSnapshot?.totalOpenTicket}</Descriptions.Item>
                <Descriptions.Item label="Waiting">{supportSnapshot?.totalInWaitTicket}</Descriptions.Item>
                <Descriptions.Item label="Closed">{supportSnapshot?.totalCloseTicket}</Descriptions.Item>
                <Descriptions.Item label="Time">{supportSnapshot?.time}</Descriptions.Item>
            </Descriptions>

        </Card>

    </div>)
}

export default LiveTicketWidget
