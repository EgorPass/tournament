import { useRouteError } from "react-router-dom"


export const ErrorPage = () => {

  const error = useRouteError()
  console.error( error )

  return (
    <>
      <div>
        Что то пошло совсем не так, как хотелось
      </div>
      <div>
        И Мы попали не туда??
      </div>
    </>
  )
}