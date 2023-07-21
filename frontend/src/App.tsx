import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './state/store'
import { Root } from './components/root.tsx'
function App () {
  return (
    <QueryClientProvider client={ new QueryClient() }>
    <Provider store={ store }>
      <Root />
    </Provider>
    </QueryClientProvider>
  )
}

export default App
