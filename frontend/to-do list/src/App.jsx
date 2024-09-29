import { useState } from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { configStore } from './store.jsx'
import Todos from './components/addTodo.jsx'
import AddTodo from './components/form.jsx'

function App() {


  return (
    <>
    <Provider store={configStore}>
    <AddTodo/>
    <Todos/>
    </Provider>
      
    </>
  )
}

export default App
