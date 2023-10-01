import type { BrandSimpleDto } from "./BrandSimpleDto"

export type ResTfulResultBrandSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: BrandSimpleDto
   /**
    * @type boolean | undefined
    */
   succeeded?: boolean
   errors?: any
   extras?: any
   /**
    * @type integer | undefined int64
    */
   timestamp?: number
}
