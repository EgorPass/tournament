import { RouterProvider } from "react-router-dom"
import routes from "./routes"
import { LoaderSpinner } from "../shared/components/loaderSpinner/loaderSpinner"

const App = () => {
  // console.log( "render App")
  return (
    <RouterProvider router = { routes } fallbackElement = { <LoaderSpinner /> } />
  )
}

export default App 