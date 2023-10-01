import type { UserDto } from "./UserDto"

export type ResTfulResultListUserDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   /**
    * @type array | undefined
    */
   data?: UserDto[]
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
