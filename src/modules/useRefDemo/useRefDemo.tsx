import React, { useRef, useState } from 'react'

import { BaseProps } from '@modals/basePropsInterface'
import Button from 'antd/lib/button'

interface UseRefDemoOwnProps extends BaseProps {
}

const UseRefDemo: React.FC<UseRefDemoOwnProps> = (props: UseRefDemoOwnProps) => {
  const [justForRender, setJustForRender] = useState(5000)

  const ctClkCount = useRef(0)
  const renderConter = useRef(0)

  console.log(ctClkCount.current, renderConter.current)
  renderConter.current = renderConter.current + 1
  return <div>
      <Button onClick={() => { setJustForRender(justForRender + 1) }}> {justForRender} </Button>
      <Button onClick={() => { ctClkCount.current = ctClkCount.current + 1 }} > Click me</Button>
    </div>
}

export default UseRefDemo
