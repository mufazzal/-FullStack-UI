import React, { useEffect } from 'react'
import {
  useParams,
  useSearchParams,
  useLocation
} from 'react-router-dom'

import { BaseProps } from '@modals/basePropsInterface'

interface RoutingDemoOwnProps extends BaseProps {
}

const RoutingDemo: React.FC<RoutingDemoOwnProps> = (props: RoutingDemoOwnProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const location = useLocation()

  return <div>

        urlParm1: {params.urlParm1}
        <br />
        urlParm2: {params.urlParm2}
        <br />
        <br />
        queryParam1: {searchParams.get('queryParam1')}
        <br />
        queryParam2: {searchParams.get('queryParam2')}
        <br />
        <br />
        stKey1: {location.state.stKey1}
        <br />
        stKey2: {location.state.stKey2}

    </div>
}

export default RoutingDemo
