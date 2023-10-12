import { atom } from "jotai"
import { TaxSimpleDto } from "../api-gen"

export const taxsAtom = atom<TaxSimpleDto[]>([])
export const selectedTaxAtom = atom<TaxSimpleDto>({})
export const taxGridParametersAtom = atom<{
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
export const taxGridColumnsVisibleAtom = atom<string[]>([])
export const openTaxDeleteModalAtom = atom(false)
