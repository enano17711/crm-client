import type { ItemDto } from "./ItemDto"

export type CategoryItemDto = {
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
   categoryItemId?: number
   /**
    * @type array | undefined
    */
   items?: ItemDto[]
}
