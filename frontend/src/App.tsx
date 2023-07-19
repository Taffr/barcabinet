import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { Root } from './components/root.tsx'

function App () {
  return (
    <Provider store={ store }>
      <Root />
    </Provider>
  )
}

export default App
