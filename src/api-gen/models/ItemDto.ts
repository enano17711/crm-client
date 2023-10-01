import type { CategoryItemDto } from "./CategoryItemDto"
import type { TaxDto } from "./TaxDto"
import type { BrandDto } from "./BrandDto"
import type { UnitDto } from "./UnitDto"
import type { ItemBatchDto } from "./ItemBatchDto"
import type { ItemOrderDto } from "./ItemOrderDto"
import type { ItemOrderReturnDto } from "./ItemOrderReturnDto"
import type { ItemAdjustmentDto } from "./ItemAdjustmentDto"

export type ItemDto = {
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
   itemId?: number
   /**
    * @type string | undefined
    */
   code?: string
   /**
    * @type number | undefined double
    */
   price?: number
   /**
    * @type number | undefined double
    */
   cost?: number
   /**
    * @type number | undefined double
    */
   quantity?: number
   /**
    * @type boolean | undefined
    */
   isBatched?: boolean
   /**
    * @type string | undefined
    */
   taxCostMethod?: string
   /**
    * @type string | undefined
    */
   taxPriceMethod?: string
   /**
    * @type array | undefined
    */
   categoryItems?: CategoryItemDto[]
   taxCost?: TaxDto
   taxPrice?: TaxDto
   brand?: BrandDto
   unitPrice?: UnitDto
   unitCost?: UnitDto
   /**
    * @type array | undefined
    */
   itemBatches?: ItemBatchDto[]
   /**
    * @type array | undefined
    */
   itemOrders?: ItemOrderDto[]
   /**
    * @type array | undefined
    */
   itemOrderReturns?: ItemOrderReturnDto[]
   /**
    * @type array | undefined
    */
   itemAdjustments?: ItemAdjustmentDto[]
}
