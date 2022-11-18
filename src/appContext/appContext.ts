import AppContextInt from '@modals/appContext'
import React from 'react'
import defaultTen from './default'

const AppContext = React.createContext<AppContextInt>(defaultTen)

export default AppContext
