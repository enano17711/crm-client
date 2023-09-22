import { Dispatch } from "react"
import { rbacsStoreSlice } from "./RBAC.slice.ts"
import {
   accessTokenKey,
   feature,
   getAPI,
   refreshAccessTokenKey,
} from "../../axios-utils.ts"
import {
   LoginInput,
   LoginOutput,
   RbacApi,
   SecurityDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useRBACsActions
 * @description Actions hook that allows us to invoke the RBACs store actions from our components
 */
export function useRBACsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = rbacsStoreSlice.actions
   // our rbacs store actions implementation:
   const actions = {
      loadRBACs: async (loginData: LoginInput) => {
         const localStorageData = JSON.parse(
            localStorage.getItem("userDataSession"),
         )
         const securitiesLocalStorageData = JSON.parse(
            localStorage.getItem("securitiesDataSession"),
         )

         if (
            localStorageData?.account !== undefined &&
            localStorageData?.account !== "" &&
            localStorageData?.account !== null
         ) {
            commit(mutations.setAccount(localStorageData as LoginOutput))
            commit(
               mutations.setSecurities(
                  securitiesLocalStorageData as SecurityDto[],
               ),
            )
            return
         }

         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(RbacApi).apiRbacLoginPost(loginData),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            localStorage.setItem(
               "userDataSession",
               JSON.stringify(res.data.data),
            )
            localStorage.setItem(accessTokenKey, res.data.data.accessToken)
            localStorage.setItem(
               refreshAccessTokenKey,
               res.data.data.refreshToken,
            )
            commit(mutations.setAccount(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Bienvenido " + res.data.data.account,
               color: "teal",
            })
         }
      },
      setSecurities: async () => {
         const [err, res] = await feature(
            getAPI(RbacApi).apiRbacSecuritiesGet(),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.setSecurities(res.data.data))
            localStorage.setItem(
               "securitiesDataSession",
               JSON.stringify(res.data.data),
            )
         }
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
   }
   return actions
}

// hook to allows us to consume read-only state properties from our components
export function useRBACsGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.rbacsState.loading),
      account: useSelector((s: RootStateInterface) => s.rbacsState.account),
      error: useSelector((s: RootStateInterface) => s.rbacsState.error),
      securities: useSelector(
         (s: RootStateInterface) => s.rbacsState.securities,
      ),
   }
}

/**
 * @name RBACsStoreInterface
 * @description Interface represents our RBACs store module
 */
export interface RBACsStoreInterface {
   actions: ReturnType<typeof useRBACsActions>
   getters: ReturnType<typeof useRBACsGetters>
}
