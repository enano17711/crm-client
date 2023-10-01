import type { UpdateUserDto } from "../UpdateUserDto"
import type { ResTfulResultUserDto } from "../ResTfulResultUserDto"

export type ApiRbacUserIdPutPathParams = {
   /**
    * @type integer int64
    */
   id: number
}

export type ApiRbacUserIdPutMutationRequest = UpdateUserDto

/**
 * @description Success
 */
export type ApiRbacUserIdPutMutationResponse = ResTfulResultUserDto
