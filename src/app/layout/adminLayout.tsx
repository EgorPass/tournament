import { Form } from "react-final-form";
import { LayoutAdminButtonBoxWidget, LayoutContentBoxWidget } from "../../widgets/layoutWidgets";
import { IExportDataItems } from "../../types";
import { ResetComponentToLoad,  } from "../../features/layoutFeatures";
import { useAdminData } from "./model/adminLayout/useAdminData";
import { useSubmitToAdmin } from "./model/adminLayout/useSubmitToAdmin";

const AdminLayout = () => {
  const { title, formState, pathname  } = useAdminData()
  const mutate = useSubmitToAdmin( pathname )

  return (
    <>
    <Form
      initialValues = { formState }
      onSubmit = { async (values: any) => {
        mutate.mutate( values as IExportDataItems )
      } }
    >
      { props => {
        return (
          <>
            <ResetComponentToLoad/>
            <LayoutContentBoxWidget />
            <LayoutAdminButtonBoxWidget title = { title }/>
          </>
        )
      }}
    </Form>
    </>
  )
}

export default AdminLayout;