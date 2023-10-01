export type CreateTaxDto = {
   /**
    * @type string
    */
   name: string
   /**
    * @type number double
    */
   rate: number
   /**
    * @type string | undefined
    */
   description?: string
}
