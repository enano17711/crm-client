import { atom } from "jotai"
import { SupplierSimpleDto } from "../api-gen"

export const suppliersAtom = atom<SupplierSimpleDto[]>([])
export const selectedSupplierAtom = atom<SupplierSimpleDto>({})
export const supplierGridParametersAtom = atom<{
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
export const supplierGridColumnsVisibleAtom = atom<string[]>([])
export const openSupplierDeleteModalAtom = atom(false)
