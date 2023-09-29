import React from "react"
import { ICellTextProps } from "ka-table/props"
import { ActionIcon, Group } from "@mantine/core"
import { IconPencil, IconX } from "@tabler/icons-react"
import { ModalCreateItemComponent } from "./ModalCreateItem.component.tsx"
import DialogDeleteItemComponent from "./DialogDeleteItem.component.tsx"
import { ItemSimpleDto } from "../../../api-services"

const ItemActionsColumnComponent = (props: ICellTextProps) => {
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
         <ModalCreateItemComponent
            openModal={openModal}
            setOpenModal={setOpenModal}
            itemData={props.rowData as ItemSimpleDto}
            title="Editar Item"
            type="update"
            dispatch={props.dispatch}
         />
         <DialogDeleteItemComponent
            dispatch={props.dispatch}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            itemData={props.rowData as ItemSimpleDto}
         />
      </>
   )
}

export default ItemActionsColumnComponent
