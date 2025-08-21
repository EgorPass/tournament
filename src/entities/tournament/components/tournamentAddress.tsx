import { FC } from "react"
import { apiCheck } from "../../../shared/lib/api/apiCheck"
import { ITournament } from "../../../types"
import styled from "styled-components"
import { StyledFlexColumn, StyledGridAreaItem } from "../../../shared/components/groupComponents"


const StyledAddressContainer = styled( StyledGridAreaItem )`
  @media (${props => props.theme.media.max}) {
    padding-right: 20px;
    align-items: flex-start;
  }
`

const StyledAddressFlex = styled( StyledFlexColumn )`
  @media (${props => props.theme.media.max}) {
    align-items: flex-start;
  }
`

export const TournamentAddress: FC<{address: ITournament["address"]}> = ({ address }) => (
  <>
    {
      apiCheck.isNotEmpty( address ) && (
        <StyledAddressContainer
          as = { StyledFlexColumn }
          $gridArea = "tour-address"
        >
          { address.place && <div>{ address.place }</div>  }
          
          <StyledAddressFlex>
            { address.city && <span>г. { address.city }, &nbsp;</span> }
              <span>
                { address.street &&  <span>улица { address.street }</span> }
                { address.structure && <span>{ address.structure } </span> }
                { address.build && <span>/ { address.build}</span> }
            </span>
          </StyledAddressFlex>
        </StyledAddressContainer>
      )
    }
  </>
)