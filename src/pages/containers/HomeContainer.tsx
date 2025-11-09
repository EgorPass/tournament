import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { MainHeader } from "../../widgets/headerWidgets/components/mainHeader"
import { AnchorList } from "../components/HomeAnchorList"
import { homeAnchorList } from "../config/homeAnchorList"
import { Content, Main, Wrapper } from "../components/HomeComponents"

export const HomeContainer: FC<{ children: ReactNode, list: {href: string, title: string}[]}> = ({ children, list }) => {

  const nodeRef = useRef(null)
  const headHeight = useRef( 0 )
  const [ head, setHead ] = useState<string>("Приветствую !!!") 

  useEffect( () => {
    if( !!nodeRef && !!nodeRef.current ) {
      const node = nodeRef.current as HTMLElement
      const header = node.getElementsByTagName( "header")[0]
      if( !!header ) {
        headHeight.current = header.offsetHeight
      }
    }
  }, [])

  return (
    <Wrapper ref = { nodeRef }>
      <MainHeader secondTitle = { head } />
      <Main
        onScroll={ (e) => {
          const target = e.target as HTMLElement
          const paragraph = target.querySelectorAll("p[id]") 

            if( target.scrollTop === 0 ) {
              setHead( "Приветствую !!!" )
            }

            paragraph.forEach( it => {
              const coords = it.getBoundingClientRect()
              const topLine = coords.top - headHeight.current - 30
              if( topLine < 0 ) {
                const title = list.find( li => li.href === it.id )
                if( title ) { 
                  setHead( title.title )
                }
              }
            })
        }}
      >
        <Content>
          <AnchorList list = { homeAnchorList } />
          { children }
        </Content>
      </Main>
    </Wrapper>
  )
}