import type { ItemDto } from "./ItemDto"

export type BrandDto = {
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
   brandId?: number
   /**
    * @type array | undefined
    */
   items?: ItemDto[]
}
