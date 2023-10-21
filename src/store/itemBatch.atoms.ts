import { atom } from "jotai"
import { ItemBatchSimpleDto } from "../api-gen"

export const itemBatchesAtom = atom<ItemBatchSimpleDto[]>([])
export const selectedItemBatchedAtom = atom<ItemBatchSimpleDto>({})
export const itemBatchedGridParametersAtom = atom<{
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
export const itemBatchedGridColumnsVisibleAtom = atom<string[]>([])
export const openItemBatchedDeleteModalAtom = atom(false)
