import { LayoutCoverWrapperWidget } from "../../features/layoutFeatures/ui/LayoutCoverWrapperWidget";
import { LayoutPageWidget, LayoutMainScreenWidget } from "../../widgets/layoutWidgets";
import { LoaderSpinnerWidget } from "../../widgets/loaderSpinerWidget/LoaderSpinerModule";
import Nav from "../nav/nav";
import { Outlet } from "react-router-dom";
import { SetVisibleNavMenuFeature } from "../../features/layoutFeatures";



const Layout = () => {
  // console.log( "render Layout")
  return (
    <LayoutCoverWrapperWidget>
      <LoaderSpinnerWidget />
      
      <LayoutMainScreenWidget>

        <Nav />

        <LayoutPageWidget>
          <Outlet />
        </LayoutPageWidget>
       
        <SetVisibleNavMenuFeature />

      </LayoutMainScreenWidget>

    </LayoutCoverWrapperWidget>
  )
}

export default Layout