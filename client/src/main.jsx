import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLEKEY =  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if(!PUBLISHABLEKEY){
  throw new Error("Publish key is missing")
}
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLEKEY} >
  <BrowserRouter>

   <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
  </ClerkProvider>

)
