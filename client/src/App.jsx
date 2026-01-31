
import { Routes , Route } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth-components/layout'
import AuthLogin from './pages/auth-pages/login'
import AuthRegister from './pages/auth-pages/register'
import AdminLayout from './components/admin-components/layout'
import AdminDasdoard from './pages/admin-view-pages/dashboard'
import AdminOrders from './pages/admin-view-pages/orders'
import AdminFeatures from './pages/admin-view-pages/features'
import ShopHome from './pages/shop-view-pages/home'
import ShopListing from './pages/shop-view-pages/listing'
import ShopCheckOut from './pages/shop-view-pages/checkout'
import ShopAccounts from './pages/shop-view-pages/accounts'
import ShopLayout from './components/shop-components/layout'
import CheckAuth from './components/common/checkAuth'
import NoPage from './pages/nopage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthAction } from './store/auth-slice'
import { useEffect } from 'react'
import AdminProducts from './pages/admin-view-pages/product'
import { Skeleton } from './components/ui/skeleton'
import ShoppingOrders from './components/shop-components/orders'
import PaypalReturn from './pages/shop-view-pages/paypal-return'
import PaypalCancel from './pages/shop-view-pages/paypal-cancel'
import PaymentSuccess from './pages/shop-view-pages/payment-success'
import SearchProducts from './pages/shop-view-pages/search'
import Home from './pages/home'

function App() {


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
       <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
