import type { UpdateBrandDto } from "../UpdateBrandDto"

export type ApiBrandBrandIdPutMutationResponse = any | null

export type ApiBrandBrandIdPutPathParams = {
   /**
    * @description The ID of the brand to be updated.
    * @type integer int64
    */
   id: number
}

/**
 * @description The updated brand data.
 */
export type ApiBrandBrandIdPutMutationRequest = UpdateBrandDto
