 
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import router from './routing/routes'
import axios  from 'axios'
import { Provider } from 'react-redux'
import { store } from './store/store'


axios.defaults.baseURL="https://api.themoviedb.org"
axios.defaults.headers.common['Authorization']=`Bearer ${import.meta.env.VITE_API_TOKEN}`



createRoot(document.getElementById('root')).render(
    
 <Provider store={store}> 
   
    <RouterProvider router={router} />
    
    </Provider>
     
)
