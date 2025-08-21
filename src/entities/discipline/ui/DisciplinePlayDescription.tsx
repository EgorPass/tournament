import styled from "styled-components";
import { IPLayLayoutContext } from "../../../types";
import { usePlayLayoutContextConsumer } from "../../../features/layoutFeatures";

const DisciplineDescriptionWrapper = styled.div`
  height : 100%;
  overflow: auto;
  padding: 15px 15px;

  /* width: calc(100% + 8px); */
`



export const DisciplinePlayDescription = () => {

  console.log( "render discipline description ......")
  const {discipline, tournamentPlayers} = usePlayLayoutContextConsumer() as IPLayLayoutContext

    return (
      <DisciplineDescriptionWrapper>
        <div>
          Участники деляться на категории исходя из их { discipline!.categories }.
        </div>

        <div>
          <span>
            Условия выигрыша&nbsp;-&nbsp;
          </span>
          <span>
            {
              discipline!.condition === "time" && (
                "выиграть по времени"
              )
            }
            {
              discipline!.condition === "point" && (
                "набрать наибольшее количество очков"
              )
            }
            {
              discipline!.condition === "time-point" && (
                "выиграть по времени и при этом набрать наибольшее количество очков"
              )
            }
          </span>
        </div>


        <div>
          <span>Общее количество участников:</span>
          <span>&nbsp;</span>
          <span>
            { tournamentPlayers.length }
          </span>
        </div>
          
        <div>
          <h5>{ "<- Этапы ->" }</h5>
          <ul>
            {/* {
              levels
                .sort( (x, y ) => +x.levelPosition - +y.levelPosition )
                .map( it => (
                  <li
                    key = { it.id }
                  >
                    <div>
                      <h6>{ it.name }:</h6>
                      <div>
                        <div>
                          основа прохождения в этап
                        </div>
                        <div>
                          сколько учавствуют людей в данном этапе.
                        </div>
                        <div>
                          учавствуют категории
                        </div>
                        <div>
                          <div>
                            мужская категория - рассписать сколько в каждой категории учавствует людей
                          </div>
                          <div>

                          </div>
                        </div>
                      </div>

                    </div>

                  </li>
                ))
            } */}
          </ul>
        </div>

            <br />

        <p>
          описание:
          
          <br/>
          * количество этапов
          <br/>
          * рассписать в каком этапе сколько какие категории и по сколько участников количество в каждой категории
          <br />
          * так же описать правила для каждого этапа
        </p>
      </DisciplineDescriptionWrapper>
    )
}
