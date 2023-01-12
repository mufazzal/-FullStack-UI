import { BaseProps } from '@modals/basePropsInterface'
import React, { useEffect, useState } from 'react'
import Table from 'antd/lib/table'
import type { ColumnsType } from 'antd/lib/table'
import Button from 'antd/lib/button'

import { w3cwebsocket } from 'websocket'
import notification from 'antd/lib/notification'

interface WebSocketDemoOwnFormProps extends BaseProps {
  onRefreshEvent?: (isManual: boolean | undefined) => boolean
}

const LiveSale: React.FC<WebSocketDemoOwnFormProps> = (props: WebSocketDemoOwnFormProps) => {
  const [inventory, setInventory] = useState([])
  const [client, setClient] = useState<any>()
  const [bookingItem, setBookingItem] = useState<any>(undefined)

  useEffect(() => {
    // eslint-disable-next-line
    const client_ = new w3cwebsocket(`ws://localhost:2222/path?userId=${123}`)
    client_.onmessage = onMessageFromServer
    client_.onopen = onConnectionOpen
    setClient(client_)
    return () => {
      client_.close()
    }
  }, [])

  const columns: ColumnsType<any> = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Remaining',
      dataIndex: 'stock',
      key: 'stock'
    },
    {
      title: 'Sold',
      dataIndex: 'soldOut',
      key: 'soldOut'
    },
    {
      title: 'Book',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, item) => (
        <>
          <Button onClick={() => onBookItemClick(item)}> {item.isBooked ? 'Unbook' : 'Book'} </Button>
        </>
      )
    }
  ]

  const openNotification = (title: string) => {
    notification.open({
      message: title
    })
  }

  const handleInventoryDataUpdate = (inventory: any) => {
    setInventory(inventory)
  }

  const onConnectionOpen = () => {
    console.log('Connection opened')
  }
  const onMessageFromServer = (signal: any) => {
    const serverSignal = JSON.parse(signal.data)
    console.log(serverSignal)
    if (serverSignal.type === 'inventoryQuota' || serverSignal.type === 'inventoryQuotaUpdate') {
      handleInventoryDataUpdate(serverSignal.inventory)
    }
    if (serverSignal.alertMessage) {
      openNotification(serverSignal.alertMessage)
    }
    if (serverSignal.goal === 'allocSuccess') {
      setBookingItem(serverSignal.allocationData)
    }
    if (serverSignal.goal === 'deAllocSuccess') {
      setBookingItem(null)
    }
  }
  const onBookItemClick = (item: any) => {
    console.log(item)
    client.send(JSON.stringify({ invType: item.type, userId: 123, task: 'allocate' }))
    // setBookingItem(item)
  }
  const onUnBookItemClick = () => {
    client.send(JSON.stringify({ invType: bookingItem.invType, userId: 123, task: 'deallocate', allocationId: bookingItem.allocationId }))
  }

  return (<div className='websocket'>
    {bookingItem
      ? <div>
        {bookingItem.invType + ' is booked for you'}
        <Button onClick={onUnBookItemClick}> Unbook </Button>
      </div>
      : ''}
    <Table columns={columns} dataSource={inventory} />
  </div>)
}
export default LiveSale
