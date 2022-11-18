import React from 'react'
// import { Button, Descriptions, PageHeader } from 'antd';

import Button from 'antd/es/button'
import PageHeader from 'antd/es/page-header'

import { BaseProps } from '@modals/basePropsInterface'

interface OrderHomeWidgetHederOwnFormProps extends BaseProps {
  onRefreshClick: () => void
  lastStatusTime?: string
}

const OrderHomeWidgetHeder: React.FC<OrderHomeWidgetHederOwnFormProps> = (props: OrderHomeWidgetHederOwnFormProps) => {
  // const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onRefreshClick = () => {
    props.onRefreshClick()
  }

  return (<div className='OrderEditorWrapper'>
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Order"
            subTitle={props.lastStatusTime}
            extra={[
                <Button key="1" type="primary" onClick={onRefreshClick} data-testid="refresh">
                    refresh
                </Button>
            ]}
        ></PageHeader>

    </div>)
}
export default OrderHomeWidgetHeder
