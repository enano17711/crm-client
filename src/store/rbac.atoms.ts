import { SecurityDto } from "../api-gen"
import { atom } from "jotai"

export const securitiesAtom = atom<SecurityDto[]>([])
