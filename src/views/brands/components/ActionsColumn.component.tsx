import React from "react"
import { ICellTextProps } from "ka-table/props"
import { ActionIcon, Group } from "@mantine/core"
import { IconPencil, IconX } from "@tabler/icons-react"
import { BrandDto } from "../../../api-services"
import { ModalCreateBrandComponent } from "./ModalCreateBrand.component.tsx"
import DialogDeleteBrandComponent from "./DialogDeleteBrand.component.tsx"

const ActionsColumnComponent = (props: ICellTextProps) => {
   const [openModal, setOpenModal] = React.useState(false)
   const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

   return (
      <>
         <Group>
            <ActionIcon color="indigo" onClick={() => setOpenModal(true)}>
               <IconPencil />
            </ActionIcon>
            <ActionIcon color="red" onClick={() => setOpenDeleteModal(true)}>
               <IconX />
            </ActionIcon>
         </Group>
         <ModalCreateBrandComponent
            openModal={openModal}
            setOpenModal={setOpenModal}
            brandData={props.rowData as BrandDto}
            title="Editar Marca"
            type="update"
            dispatch={props.dispatch}
         />
         <DialogDeleteBrandComponent
            dispatch={props.dispatch}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            brandData={props.rowData as BrandDto}
         />
      </>
   )
}

export default ActionsColumnComponent
