import { BaseProps } from '@modals/basePropsInterface'
import React from 'react'

interface WebSocketDemoOwnFormProps extends BaseProps {
  onRefreshEvent?: (isManual: boolean | undefined) => boolean
}

const webSocketDemo: React.FC<WebSocketDemoOwnFormProps> = (props: WebSocketDemoOwnFormProps) => {

  return (<div className='websocket'>


  </div>)
}
export default webSocketDemo
