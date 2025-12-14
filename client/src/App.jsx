
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

function App() {

   const {user,isAuthenticated,isloading}=useSelector(state=>state.auth)
   const dispatch = useDispatch()
   useEffect(()=>{
    const token = JSON.parse(sessionStorage.getItem('token'))
        dispatch(checkAuthAction(token))
   },[dispatch])
   if(isloading){
    // return <div>loading .....</div>
    return <Skeleton className="h-full w-full rounded-full bg-blue-700" />
   }
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>}/>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
          </CheckAuth>
          }>
        <Route path="login" element={<AuthLogin />}></Route>
        <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout /></CheckAuth>}>
        <Route path="dashboard" element={<AdminDasdoard />}></Route>
        <Route path="orders" element={<AdminOrders />}></Route>
        <Route path="Products" element={<AdminProducts />}></Route>
        <Route path="features" element={<AdminFeatures />}></Route>
        </Route>
         <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShopLayout /></CheckAuth>}>
        <Route path="home" element={<ShopHome />}></Route>
        <Route path="listing" element={<ShopListing />}></Route>
        <Route path="checkout" element={<ShopCheckOut />}></Route>
        <Route path="account" element={<ShopAccounts />}></Route>
        <Route path="orders" element={<ShoppingOrders />}></Route>
        <Route path="search" element={<SearchProducts />}></Route>
        <Route path="paypal-return" element={<PaypalReturn />}></Route>
        <Route path="paypal-cancel" element={<PaypalCancel />}></Route>
        <Route path="payment-success" element={<PaymentSuccess />}></Route>
        </Route>
        <Route path="*" element={<NoPage />}> </Route>
      </Routes>
    </div>
  )
}

export default App
