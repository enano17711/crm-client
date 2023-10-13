import { atom } from "jotai"
import { ItemSimpleDto } from "../api-gen"

export const itemsAtom = atom<ItemSimpleDto[]>([])
export const selectedItemAtom = atom<ItemSimpleDto>({})
export const itemGridParametersAtom = atom<{
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
export const itemGridColumnsVisibleAtom = atom<string[]>([])
export const openItemDeleteModalAtom = atom(false)
