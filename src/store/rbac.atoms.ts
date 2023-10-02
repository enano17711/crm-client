import { LoginOutput, SecurityDto } from "../api-gen"
import { atomWithStorage } from "jotai/utils"

export const securitiesAtom = atomWithStorage<SecurityDto[]>(
   "securitiesDataSession",
   [],
)
export const userDataSessionAtom = atomWithStorage<LoginOutput>(
   "userDataSession",
   {
      accessToken: "",
      account: "",
      refreshToken: "",
      securities: [],
   },
)
export const accessTokenAtom = atomWithStorage("access-token", "")
export const refreshTokenAtom = atomWithStorage("x-access-token", "")
