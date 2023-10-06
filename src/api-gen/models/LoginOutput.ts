import type { SecurityDto } from "./SecurityDto"

export type LoginOutput = {
   /**
    * @type integer | undefined int32
    */
   userId?: number
   /**
    * @type string
    */
   account: string
   /**
    * @type string | undefined
    */
   accessToken?: string
   /**
    * @type string | undefined
    */
   refreshToken?: string
   /**
    * @type array | undefined
    */
   securities?: SecurityDto[]
}
