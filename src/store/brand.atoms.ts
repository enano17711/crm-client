import { atom } from "jotai"
import { BrandSimpleDto } from "../api-gen"

export const brandsAtom = atom<BrandSimpleDto[]>([])
export const selectedBrandAtom = atom<BrandSimpleDto>({})
export const brandGridParametersAtom = atom<{
   searchColumn: string
   searchText: string
   pageIndex: number
   pageSize: number
   orderBy: string
   orderDirection: "asc" | "desc"
}>({
   searchColumn: "Name",
   searchText: "",
   pageIndex: 1,
   pageSize: 10,
   orderBy: "Name",
   orderDirection: "asc",
})
export const brandGridColumnsVisibleAtom = atom<string[]>([])
export const openBrandDeleteModalAtom = atom(false)
