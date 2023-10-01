import type { OrderDto } from "./OrderDto"
import type { OrderReturnDto } from "./OrderReturnDto"

export type SupplierDto = {
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
   supplierId?: number
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
   orders?: OrderDto[]
   /**
    * @type array | undefined
    */
   orderReturns?: OrderReturnDto[]
}
