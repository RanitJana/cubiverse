import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home/Home.jsx';
import CubeList from './components/CubeLists/CubeList.jsx';

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route
        loader=
        {
          async () => {
            try {

              let response = await fetch(`http://localhost:5000/api/v1/product/most-favourite`);
              let jsonFormat = await response.json();
              return JSON.parse(jsonFormat);
            } catch (error) {
              console.log(error);
              return {};
            }
          }
        }
        path=""
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
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
