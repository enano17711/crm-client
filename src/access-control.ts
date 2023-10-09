import { defineAbility } from "@casl/ability"
import { createContext } from "react"
import { createContextualCan } from "@casl/react"
import { SecurityDto } from "./api-gen/models"

export const AbilityContext = createContext(undefined!)
export const Can = createContextualCan(AbilityContext.Consumer)

export const getAbility = (permissions: SecurityDto[]) => {
   return defineAbility((can) => {
      permissions.forEach((permission) => {
         can(permission.uniqueName, "user")
      })
   })
}
