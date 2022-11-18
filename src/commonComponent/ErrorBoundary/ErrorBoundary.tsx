import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: any
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor (props: any) {
    super(props)
    this.state = { hasError: false, error: null } as ErrorBoundaryState
  }

  static getDerivedStateFromError (error: any) { return { hasError: true, error } }
  componentDidCatch (error: any, info: any) { console.log(error, info) }

  render () {
    if (this.state.hasError) {
      return <div>
                <h1>ErrorBoundary: Something went wrsong.</h1>
                <p>{this.state.error.message}</p>
              </div>
    }
    return this.props.children
  }
}

export default ErrorBoundary
