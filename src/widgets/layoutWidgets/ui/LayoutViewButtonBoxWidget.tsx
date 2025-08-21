import { BackButtonFeature, ChangeButtonFeature } from "../../../features/layoutFeatures";
import { BackButtonPlayerReitingFeature } from "../../../features/layoutFeatures/ui/BackButtonPlayerReitingFeature";
import { useGetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting";
import { LayoutButtonBox } from "../components/LayoutButtonBox";

export const LayoutViewButtonBoxWidget = () => {
  
  const playerModalReiting = useGetPlayerModalReiting()
  return (
    <>
    {
      playerModalReiting.status ? (
        <LayoutButtonBox type = "view-buttons-container">
          <BackButtonPlayerReitingFeature />
        </LayoutButtonBox>
      ) : (
        <LayoutButtonBox type = "view-buttons-container">
          <ChangeButtonFeature />
          <BackButtonFeature />    
        </LayoutButtonBox>

      ) 
    }

    </>
  )
}