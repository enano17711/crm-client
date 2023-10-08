import { atom } from "jotai"
import { BaseUnitSimpleDto } from "../api-gen"

export const baseUnitsAtom = atom<BaseUnitSimpleDto[]>([])
export const selectedBaseUnitAtom = atom<BaseUnitSimpleDto>({})
export const baseUnitGridParametersAtom = atom<{
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
export const baseUnitGridColumnsVisibleAtom = atom<string[]>([])
export const openBaseUnitDeleteModalAtom = atom(false)
