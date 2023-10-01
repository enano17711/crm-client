import type { UserDto } from "./UserDto"

export type ResTfulResultUserDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: UserDto
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
