import type { Order } from "./Order"
import type { OrderReturn } from "./OrderReturn"

export type Supplier = {
   /**
    * @type boolean | undefined
    */
   isDeleted?: boolean
   /**
    * @type string | undefined date-time
    */
   deletedAt?: Date
   /**
    * @type integer | undefined int64
    */
   deletedBy?: number
   /**
    * @type string | undefined date-time
    */
   createdAt?: Date
   /**
    * @type integer | undefined int64
    */
   createdBy?: number
   /**
    * @type string | undefined date-time
    */
   updatedAt?: Date
   /**
    * @type integer | undefined int64
    */
   updatedBy?: number
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
   orders?: Order[]
   /**
    * @type array | undefined
    */
   orderReturns?: OrderReturn[]
}
