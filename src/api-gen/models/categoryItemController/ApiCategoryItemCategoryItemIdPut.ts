import type { UpdateCategoryItemDto } from "../UpdateCategoryItemDto"
import type { ResTfulResultCategoryItemDto } from "../ResTfulResultCategoryItemDto"

export type ApiCategoryItemCategoryItemIdPutPathParams = {
   /**
    * @type integer int64
    */
   id: number
}

export type ApiCategoryItemCategoryItemIdPutMutationRequest =
   UpdateCategoryItemDto

/**
 * @description Success
 */
export type ApiCategoryItemCategoryItemIdPutMutationResponse =
   ResTfulResultCategoryItemDto
