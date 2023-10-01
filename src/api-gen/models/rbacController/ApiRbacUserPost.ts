import type { CreateUserDto } from "../CreateUserDto"
import type { ResTfulResultUserDto } from "../ResTfulResultUserDto"

export type ApiRbacUserPostMutationRequest = CreateUserDto

/**
 * @description Success
 */
export type ApiRbacUserPostMutationResponse = ResTfulResultUserDto
