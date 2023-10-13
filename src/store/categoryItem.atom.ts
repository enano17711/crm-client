import { atom } from "jotai"
import { CategoryItemSimpleDto } from "../api-gen"

export const categoryItemsAtom = atom<CategoryItemSimpleDto[]>([])
export const selectedCategoryItemAtom = atom<CategoryItemSimpleDto>({})
export const categoryItemGridParametersAtom = atom<{
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
export const categoryItemGridColumnsVisibleAtom = atom<string[]>([])
export const openCategoryItemDeleteModalAtom = atom(false)
