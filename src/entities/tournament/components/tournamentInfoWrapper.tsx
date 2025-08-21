import styled from "styled-components";

export const TournamentInfoWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: .5fr .5fr;
  grid-template-areas: 
                        "tour-organizer tour-organizer"
                        "tour-date tour-date"
                        "tour-address tour-address"
                        ;
                  
  @media (${props => props.theme.media.max}) {
    max-width: 600px;
    grid-template-columns: auto 145px;
    grid-template-areas: 
                          "tour-organizer tour-date"
                          "tour-address tour-date"
                          ;
  }
`