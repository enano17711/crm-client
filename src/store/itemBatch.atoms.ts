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
   searchColumn: "BatchNumber",
   searchText: "",
   pageIndex: 1,
   pageSize: 10,
   orderBy: "BatchNumber",
   orderDirection: "asc",
})
export const itemBatchedGridColumnsVisibleAtom = atom<string[]>([])
export const openItemBatchedDeleteModalAtom = atom(false)
