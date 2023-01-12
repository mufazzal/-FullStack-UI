import React, { useState } from 'react'
import { BaseProps } from '@modals/basePropsInterface'
import ORDER_FORM_MODE from './orderFormMode'
// import {
//     Button,
//     DatePicker,
//     Form,
//     Input,
//     InputNumber,
//     Select,
//     Switch,
//     Typography
// } from 'antd';

import Button from 'antd/lib/button'
import DatePicker from 'antd/lib/date-picker'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Select from 'antd/lib/select'
import Switch from 'antd/lib/switch'
import Typography from 'antd/lib/typography'

const { Title } = Typography

interface CreateOrderOwnFormProps {
  mode?: ORDER_FORM_MODE
  onEditorClose: () => void
}

interface OrderEditorFormProps extends CreateOrderOwnFormProps, BaseProps { }

const OrderEditorForm: React.FC<OrderEditorFormProps> = (props: OrderEditorFormProps) => {
  // const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onCancelClick = () => {
    props && props.onEditorClose()
  }

  return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{}}>

            <Title level={2}>{props.mode} Order </Title>
            <Title level={4}>For user {props.userName} </Title>

            <Form.Item label="Itemm Type">
                <Select>
                    <Select.Option value="demo">Demo 1</Select.Option>
                    <Select.Option value="demo">Demo 2</Select.Option>
                    <Select.Option value="demo">Demo 3</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Item Name">
                <Input />
            </Form.Item>

            <Form.Item label="Select delivery date">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Select quantities">
                <InputNumber />
            </Form.Item>

            <Form.Item label="For me" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button type="default" htmlType="button" onClick={onCancelClick}>
                    Cancel
                </Button>
            </Form.Item>

        </Form>
  )
}

export default OrderEditorForm
