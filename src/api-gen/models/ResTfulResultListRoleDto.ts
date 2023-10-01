import type { RoleDto } from "./RoleDto"

export type ResTfulResultListRoleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   /**
    * @type array | undefined
    */
   data?: RoleDto[]
   /**
    * @type boolean | undefined
    */
   succeeded?: boolean
   errors?: any
   extras?: any
   /**
    * @type integer | undefined int64
    */
   timestamp?: number
}
