import type { ItemDto } from "./ItemDto"
import type { ItemBatchDto } from "./ItemBatchDto"
import type { SaleDto } from "./SaleDto"
import type { UnitDto } from "./UnitDto"
import type { ItemForSaleDto } from "./ItemForSaleDto"

export type ItemSaleDto = {
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
    * @type integer | undefined int64
    */
   itemSaleId?: number
   /**
    * @type string | undefined
    */
   batchNumber?: string
   /**
    * @type string | undefined date-time
    */
   batchDate?: Date
   /**
    * @type number | undefined double
    */
   quantity?: number
   /**
    * @type number | undefined double
    */
   receivedQuantity?: number
   /**
    * @type number | undefined double
    */
   unitPriceNet?: number
   /**
    * @type number | undefined double
    */
   discount?: number
   /**
    * @type number | undefined double
    */
   taxRate?: number
   /**
    * @type number | undefined double
    */
   tax?: number
   /**
    * @type number | undefined double
    */
   total?: number
   item?: ItemDto
   itemBatch?: ItemBatchDto
   sale?: SaleDto
   unitPrice?: UnitDto
   itemForSale?: ItemForSaleDto
}
