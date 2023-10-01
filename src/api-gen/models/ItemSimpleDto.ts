import type { CategoryItemSimpleDto } from "./CategoryItemSimpleDto"
import type { TaxSimpleDto } from "./TaxSimpleDto"
import type { BrandSimpleDto } from "./BrandSimpleDto"
import type { UnitSimpleDto } from "./UnitSimpleDto"

export type ItemSimpleDto = {
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
   categoryItems?: CategoryItemSimpleDto[]
   taxCost?: TaxSimpleDto
   taxPrice?: TaxSimpleDto
   brand?: BrandSimpleDto
   unitPrice?: UnitSimpleDto
   unitCost?: UnitSimpleDto
}
