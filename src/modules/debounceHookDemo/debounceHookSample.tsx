import React, { useRef, useState } from 'react'

import { BaseProps } from '@modals/basePropsInterface'
import Input from 'antd/es/input/Input';
import useFuntionDebounce from './debounceHook';

interface debounceHookSampleOwnProps extends BaseProps {
}

const DebounceHookSample: React.FC<debounceHookSampleOwnProps> = (props: debounceHookSampleOwnProps) => { 

    const fetchBasedOnQuery = ({query}) => {
        console.log(query)
    }
    const [attemptCall] = useFuntionDebounce(fetchBasedOnQuery, 5000)

    const onChange = (ev: any) => {
        attemptCall({query: ev.target.value})
    }

    return <div>
        <Input onChange={onChange}/>
    </div>
}

export default DebounceHookSample
