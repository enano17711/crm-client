import axios from "axios"

import type { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios"

export type RequestConfig<TVariables = unknown> = {
   method: "get" | "put" | "patch" | "post" | "delete"
   url: string
   params?: unknown
   data?: TVariables
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

/*export const axiosInstance = axios.create({
   baseURL: process.env["AXIOS_BASE"]
      ? process.env["AXIOS_BASE"]
      : "https://localhost:5001",
   headers: process.env["AXIOS_HEADERS"]
      ? (JSON.parse(process.env["AXIOS_HEADERS"]) as AxiosHeaders)
      : ({} as AxiosHeaders),
})*/
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
         conf.headers!["Authorization"] = `Bearer ${accessToken}`

         const jwt: any = decryptJWT(accessToken)
         const exp = getJWTDate(jwt.exp as number)

         if (new Date() >= exp) {
            const refreshAccessToken = window.localStorage.getItem(
               refreshAccessTokenKey,
            )
            if (refreshAccessToken) {
               conf.headers!["X-Authorization"] = `Bearer ${refreshAccessToken}`
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
): Promise<TData> => {
   const promise = axiosInstance
      .request<TData>({ ...config })
      .then(({ data }) => data)
      .catch((e: AxiosError<TError>) => {
         throw e
      })

   return promise
}

export default axiosClient
