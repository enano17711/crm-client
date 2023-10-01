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
}
