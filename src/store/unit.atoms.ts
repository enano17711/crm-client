import { atom } from "jotai"
import { UnitSimpleDto } from "../api-gen"

export const unitsAtom = atom<UnitSimpleDto[]>([])
export const selectedUnitAtom = atom<UnitSimpleDto>({})
export const unitGridParametersAtom = atom<{
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
export const unitGridColumnsVisibleAtom = atom<string[]>([])
export const openUnitDeleteModalAtom = atom(false)
