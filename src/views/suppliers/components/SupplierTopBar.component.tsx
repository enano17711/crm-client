import React, { useCallback } from "react"
import { useAtom, useSetAtom } from "jotai/index"
import {
   openSupplierDeleteModalAtom,
   selectedSupplierAtom,
   supplierGridColumnsVisibleAtom,
} from "../../../store/supplier.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Checkbox, Group } from "@mantine/core"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"
import ActionCloneComponent from "../../../components/top-bar/ActionClone.component.tsx"
import ActionEditComponent from "../../../components/top-bar/ActionEdit.component.tsx"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import SearchSupplierByColumnComponent from "../../suppliers/components/SearchSupplierByColumn.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"

const SupplierTopBarComponent = () => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      supplierGridColumnsVisibleAtom,
   )
   const [selectedSupplier, setSelectedSupplier] = useAtom(selectedSupplierAtom)
   const setOpenDeleteModal = useSetAtom(openSupplierDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateSupplier = useCallback(() => {
      setSelectedSupplier({})
      navigate("/suppliers/create")
   }, [navigate, setSelectedSupplier])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent createFunction={onActionCreateSupplier} />
            <ActionCloneComponent
               disabled={!(selectedSupplier?.name !== undefined)}
               cloneUrl={"/suppliers/create"}
            />
            <ActionEditComponent
               editUrl={"/suppliers/update/" + selectedSupplier?.supplierId}
               disabled={!(selectedSupplier?.name !== undefined)}
            />
            <ActionDeleteComponent
               deleteFunction={setOpenDeleteModal}
               disabled={!(selectedSupplier?.name !== undefined)}
            />
            <SearchSupplierByColumnComponent />
            <ActionExportComponent
               pdfUrl={"supplier/download-supplier-pdf"}
               pdfName="suppliers.pdf"
               excelUrl={"supplier/download-supplier-excel"}
               excelName="suppliers.xlsx"
            />
            <ActionColumnsGridComponent>
               <Checkbox.Group
                  value={gridColumnsVisible}
                  onChange={setGridColumnsVisible}
                  w={200}
               >
                  <Group mt="xs" px="xs" pb="xs">
                     <Checkbox value="name" label="Nombre" />
                     <Checkbox value="companyName" label="Empresa" />
                     <Checkbox value="nit" label="Nit" />
                     <Checkbox value="ci" label="Ci" />
                     <Checkbox value="email" label="Email" />
                     <Checkbox value="phone" label="Telefono" />
                     <Checkbox value="address" label="Direccion" />
                     <Checkbox value="city" label="Ciudad" />
                     <Checkbox value="state" label="Estado" />
                     <Checkbox value="country" label="Pais" />
                     <Checkbox value="description" label="Descripcion" />
                  </Group>
               </Checkbox.Group>
            </ActionColumnsGridComponent>
         </Group>
         <ActionRefreshDataComponent queryKey={["/api/supplier/suppliers"]} />
      </Group>
   )
}

export default SupplierTopBarComponent
