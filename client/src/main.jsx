/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home/Home.jsx';
import CubeList from './components/CubeLists/CubeList.jsx';
import ProductDisplay from "./components/ProductDisplay/ProductDisplay.jsx";
import NotFound from './components/NotFound/NotFound.jsx';

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path=""
        loader=
        {
          async () => {
            try {

              document.cookie = "limit=10; path=/";
              let response = await fetch(`http://localhost:5000/api/v1/product/most-favourite`, {
                credentials: 'include'
              });
              let jsonFormat = await response.json();
              return JSON.parse(jsonFormat);
            } catch (error) {
              console.log(error);
              return [];
            }
          }
        }
        element={<Home />}
      />
      <Route path="collections/">
        <Route
          loader=
          {
            async ({ params }) => {
              try {
                let response = await fetch(`http://localhost:5000/api/v1/product/${params.product}`);
                let jsonFormat = await response.json();
                return JSON.parse(jsonFormat);
              } catch (error) {
                console.log(error);
                return {}
              }
            }
          }
          path=":product"
          element={<CubeList />} />
      </Route>
      <Route path="buy" element={<ProductDisplay />} />
      {/* <Route path='*' Component={<NotFound />} /> */}
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
