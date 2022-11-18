import React from 'react'
import ServiceList from './services'

class SupportIndex extends React.Component {
  constructor (props: any) {
    super(props)
  }

  render () {
    return (<div className="supportIndex">
        <ServiceList />
      </div>)
  }
}

export default SupportIndex
