export type CreateUnitDto = {
   /**
    * @type string
    */
   name: string
   /**
    * @type string
    */
   code: string
   /**
    * @type string
    */
   operation: string
   /**
    * @type number double
    */
   value: number
   /**
    * @type string | undefined
    */
   description?: string
   /**
    * @type integer | undefined int64
    */
   baseUnitId?: number
}
