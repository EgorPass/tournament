import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { emptyStateForForm } from "../../../../shared/lib/initialState/emptyStateForForm"

export const useAdminData = () => {

  const { pathname } = useLocationHooks()
  const title = pathname === "import" ? "Импорт" : "Экспорт"
  const formState = emptyStateForForm.getState("exportDataItems")

  return {
    formState, title, pathname
  }

}