import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home.jsx'
import DetailPage from '../pages/DetailPage'
import ExplorePage from '../pages/ExplorePage'
import Search from '../pages/Search'
import App from '../App.jsx'
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:":explore",
                element:<ExplorePage/>
            },
            {
                path:":explore/:id",    
                element:<DetailPage/>
            },
            {
                path:"/search",
                element:<Search/>
            }
        ]
    }
  ])

  export default router