import { FC } from "react"
import { TError, TLevelData, TSubTry } from "../lib/types"
import styled from "styled-components"

const ResultWrapper = styled.div`
 width: 90%;
 margin: 0 auto 20px;
`

const UnOderList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 10px;

  & ul {
    margin-left: 20px;
    margin-bottom: 0;
  }
`

const TryListItem = styled.li<{ $isTab?: boolean, $isBottom?: boolean }>`
  margin-bottom: ${ props => props.$isBottom ? "10px": "0px" };
  margin-left: ${ props => props.$isTab ? "20px": "0px" };

  &:last-child{
    margin-bottom: 0;
  }
`

const EmptyDiv = styled.div<{$isCenter?: boolean}>`
  margin: 0;
  padding: 0;
  text-align: ${ props => props.$isCenter ? "center" : "start" };
`

const SubTryErrorsInfo: FC<{errors: TError[], tryNumber:string | number, level_name: string, subTry: string | number }> = ({ errors, tryNumber, subTry, level_name }) => (
  <EmptyDiv>
    <h6>ошибки:</h6>
    <UnOderList>
      {
        errors.map( (error,idx) => (
          <TryListItem 
            key = { `${ level_name}-error-${ tryNumber }-${subTry}-${idx}` }
          >
            <span>{ error.data } - { error.desc }</span>
          </TryListItem>
        ))
      }
    </UnOderList>
  </EmptyDiv>
)


const LevelDqInfo: FC<{level_dqs: string[]}> = ( { level_dqs } ) => (
  <>
    {
      level_dqs.length > 0 && (
        <>
          <h6>Штрафы за этап дисциплины:</h6>
          <UnOderList>
            {
              level_dqs.map( ( it, idx ) => (
                <TryListItem key = { `${idx}-${it}` } $isTab = { true }>
                  { it }
                </TryListItem>
              ))
            }
          </UnOderList>
        </>
      )
    }
  </>
)

const ResultInfo: FC<{level_results: [string | number, TSubTry[]][], level_name: string  }> = ({level_results, level_name }) => (
  <UnOderList>
    {
      level_results.map( ([ tryNumber, subTryList ]) =>  (
        <TryListItem key = { `${level_name}-${tryNumber}` } $isBottom = { true }>
          <h6>результаты попытки №{tryNumber}:</h6>
          <UnOderList>
            { 
              subTryList.map( subTry => (
                <TryListItem 
                  key = { `${ level_name}-${tryNumber}-${subTry.subTry}` }
                >
                  <EmptyDiv>{ subTry.result }</EmptyDiv>
                    {
                      subTry.errors.length > 0 ? (
                        <SubTryErrorsInfo 
                          errors={ subTry.errors } 
                          tryNumber={ tryNumber }
                          subTry = { subTry.subTry }
                          level_name= { level_name }  
                        />
                      ) : null
                    }
                </TryListItem>
              ))
            }
          </UnOderList>
        </TryListItem>
      ))
    }
  </UnOderList>
)

export const CurrentTournamentPlayerReitingResultList:FC<{ levelData: TLevelData }> = ({ levelData }) =>  (
  <ResultWrapper>
    {
      levelData.level_dqs.length === 0 && levelData.level_results.length === 0 ? (
        <EmptyDiv $isCenter = { true } >
          На данный этап нет результатов
        </EmptyDiv>
      ) : (
        <>
          <LevelDqInfo level_dqs = { levelData.level_dqs }/> 
          <ResultInfo 
            level_name ={ levelData.level_name } 
            level_results = { levelData.level_results } 
          />
        </>
      )
    }
  </ResultWrapper>
)