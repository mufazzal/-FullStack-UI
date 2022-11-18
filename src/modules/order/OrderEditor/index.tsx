import React from 'react'
import OrderEditorForm from './OrderEditorForm'
import { BaseProps } from '@modals/basePropsInterface'

interface OrderEditorOwnFormProps extends BaseProps {
  onEditorClose: () => void
}

const OrderEditor: React.FC<OrderEditorOwnFormProps> = (props: OrderEditorOwnFormProps) => {
  // const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  return (<div className='OrderEditorWrapper'>

    <OrderEditorForm
      onEditorClose={props.onEditorClose}
    />

  </div>)
}
export default OrderEditor
