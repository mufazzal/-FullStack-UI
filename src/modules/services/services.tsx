import React, { useEffect } from 'react'
import { BaseProps } from '@modals/basePropsInterface'
// import { Avatar, List } from 'antd';
import Avatar from 'antd/lib/avatar'
import List from 'antd/lib/list'

import { ServiceItemModal } from '@modals/services/serviceItem'
import { setServices, fetchServiceList } from '@modules/services/redux/serviceList/serviceListSlice'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux/store'

interface ServiceListOwnProps extends BaseProps {
  // services?: ServiceItemModal[]
}

const ServiceList: React.FC<ServiceListOwnProps> = (props: ServiceListOwnProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const { services, loading, lastStatusUpdateTime, error } = useSelector(state => {
    return (state as any).serviceList
  })

  useEffect(() => {
    // dispatch(setServices({services: [{serviceId: "sd", serviceName: "asd", startDate: new Date().toString()}]}))
    dispatch(fetchServiceList())
  }, [])

  return (
        <div>
            {loading
              ? 'Loading..'
              : <>
                    <div>{lastStatusUpdateTime}</div>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={services}
                        renderItem={(item: ServiceItemModal) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://dummyimage.com/300.png/09f/fff&text=${item.serviceId}`} />}
                                    title={<a href="#">{item.serviceName}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </>
            }
            {error ? <div>{error}</div> : ''}

        </div>
  )
}
export default ServiceList
