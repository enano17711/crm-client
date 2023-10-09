import type {
   AxiosError,
   AxiosHeaders,
   AxiosRequestConfig,
   AxiosResponse,
} from "axios"
import axios from "axios"

declare const AXIOS_BASE: string
declare const AXIOS_HEADERS: string

/**
 * Subset of AxiosRequestConfig
 */
export type RequestConfig<TData = unknown> = {
   url?: string
   method: "get" | "put" | "patch" | "post" | "delete"
   params?: unknown
   data?: TData
   responseType?:
      | "arraybuffer"
      | "blob"
      | "document"
      | "json"
      | "text"
      | "stream"
   signal?: AbortSignal
   headers?: AxiosRequestConfig["headers"]
}

/**
 * Subset of AxiosResponse
 */
export type ResponseConfig<TData = unknown> = {
   data: TData
   status: number
   statusText: string
   headers?: AxiosResponse["headers"]
}

export const axiosInstance = axios.create({
   baseURL: "https://localhost:5001",
   headers: {} as AxiosHeaders,
})

const accessTokenKey = "access-token"
const refreshAccessTokenKey = `x-${accessTokenKey}`
const clearAccessTokens = () => {
   window.localStorage.removeItem(accessTokenKey)
   window.localStorage.removeItem(refreshAccessTokenKey)
   window.localStorage.removeItem("userDataSession")
   window.localStorage.removeItem("securitiesDataSession")
}
const throwError = (message: string) => {
   throw new Error(message)
}
axiosInstance.interceptors.request.use(
   (conf) => {
      const accessToken = window.localStorage.getItem(accessTokenKey)
      if (accessToken) {
         const accessTokenFormatted = accessToken.substring(
            1,
            accessToken.length - 1,
         )
         conf.headers!["Authorization"] = `Bearer ${accessTokenFormatted}`

         const jwt: any = decryptJWT(accessTokenFormatted)
         const exp = getJWTDate(jwt.exp as number)

         console.log(exp)

         if (new Date() >= exp) {
            console.log("entro en el expire")
            const refreshAccessToken = window.localStorage.getItem(
               refreshAccessTokenKey,
            )
            console.log("refreshAccessToken", refreshAccessToken)

            if (refreshAccessToken) {
               const refreshAccessTokenFormatted = refreshAccessToken.substring(
                  1,
                  refreshAccessToken.length - 1,
               )
               console.log(
                  "refreshAccessTokenFormatted",
                  refreshAccessTokenFormatted,
               )

               conf.headers![
                  "X-Authorization"
               ] = `Bearer ${refreshAccessTokenFormatted}`
            }
         }
      }
      return conf
   },
   (error) => {
      if (error.request) {
      }
      return Promise.reject(error)
   },
)
axiosInstance.interceptors.response.use(
   (res) => {
      checkAndStoreAuthentication(res)

      const serve = res.data
      if (serve && serve.hasOwnProperty("errors") && serve.errors) {
         if (serve.errors === "401 Unauthorized") {
            clearAccessTokens()
         }

         throwError(
            !serve.errors
               ? "Request Error."
               : typeof serve.errors === "string"
               ? serve.errors
               : JSON.stringify(serve.errors),
         )
         return
      }
      return res
   },
   (error) => {
      if (error.response) {
         const res = error.response
         const status: number = res.status

         checkAndStoreAuthentication(res)

         if (status === 401) {
            clearAccessTokens()
            window.location.href = "/login"
         }
      }
      return Promise.reject(error)
   },
)

function checkAndStoreAuthentication(res: any): void {
   var accessToken = res.headers[accessTokenKey]
   var refreshAccessToken = res.headers[refreshAccessTokenKey]

   if (accessToken === "invalid_token") {
      clearAccessTokens()
   } else if (
      refreshAccessToken &&
      accessToken &&
      accessToken !== "invalid_token"
   ) {
      window.localStorage.setItem(accessTokenKey, accessToken)
      window.localStorage.setItem(refreshAccessTokenKey, refreshAccessToken)
   }
}

function decryptJWT(token: string): any {
   token = token.replace(/_/g, "/").replace(/-/g, "+")
   const json = decodeURIComponent(escape(window.atob(token.split(".")[1])))
   return JSON.parse(json)
}

function getJWTDate(timestamp: number): Date {
   return new Date(timestamp * 1000)
}

export const axiosClient = async <
   TData,
   TError = unknown,
   TVariables = unknown,
>(
   config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
   const promise = axiosInstance
      .request<TData, ResponseConfig<TData>>({ ...config })
      .catch((e: AxiosError<TError>) => {
         throw e
      })

   return promise
}

export default axiosClient
