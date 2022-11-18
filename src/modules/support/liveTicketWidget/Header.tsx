import { BaseProps } from '@modals/basePropsInterface'
import React from 'react'
import Refresher from '../../../../src/commonComponent/refresher/refresher'

interface OrderEditorOwnFormProps extends BaseProps {
  onRefreshEvent?: (isManual: boolean | undefined) => boolean
}

const LiveTicketWidgetHeader: React.FC<OrderEditorOwnFormProps> = (props: OrderEditorOwnFormProps) => {
  const onRefreshEvent = (isManual: boolean | undefined) => {
    return (props.onRefreshEvent != null) && props.onRefreshEvent(isManual)
  }

  return (<div className='liveTicketWidget_header'>

        <Refresher
            intervalOptions={[1, 5, 10]}
            defaultInterval={5}
            showManualRefresh={true}
            onRefresh={onRefreshEvent}
            refresherTag="LiveTicketWidgetHeader"/>

  </div>)
}
export default LiveTicketWidgetHeader
