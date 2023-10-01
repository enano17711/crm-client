import type { SaleDto } from "./SaleDto"

export type CustomerDto = {
   /**
    * @type string | undefined
    */
   name?: string
   /**
    * @type string | undefined
    */
   description?: string
   /**
    * @type integer | undefined int64
    */
   customerId?: number
   /**
    * @type string | undefined
    */
   companyName?: string
   /**
    * @type string | undefined
    */
   nit?: string
   /**
    * @type string | undefined
    */
   ci?: string
   /**
    * @type string | undefined
    */
   email?: string
   /**
    * @type string | undefined
    */
   phone?: string
   /**
    * @type string | undefined
    */
   address?: string
   /**
    * @type string | undefined
    */
   city?: string
   /**
    * @type string | undefined
    */
   state?: string
   /**
    * @type string | undefined
    */
   country?: string
   /**
    * @type array | undefined
    */
   sales?: SaleDto[]
}
