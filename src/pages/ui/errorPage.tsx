import { useRouteError } from "react-router-dom"
import { ErrorScreen, Paragraph, Timer, UnOrderList, ListItem } from "../../entities/error"
import { CustomLink } from "../../widgets/navWidgets/components/customLink"


export const ErrorPage = () => {

  const error = useRouteError()
  console.error( error )

  return (
    <ErrorScreen>
      <Paragraph>
        Что то пошло совсем не так, как хотелось :(
      </Paragraph>
      <Paragraph>
        И Мы попали не туда!!!
      </Paragraph>

      <Paragraph>
        Вы можете подождать и страница перейдёт на домашню буквально, через несколько секунд - <Timer />
      </Paragraph>
      <Paragraph>
        Или перейти по одной из следующих ссылкок:
      </Paragraph>
      <UnOrderList>
        <ListItem>
          <CustomLink to = "/api/view/unit_list" title = "Спортсмены" />
        </ListItem>
        <ListItem>
          <CustomLink to = "/api/view/tournaments" title = "Соревнования"/>
        </ListItem>
      </UnOrderList>
    </ErrorScreen>
  )
}