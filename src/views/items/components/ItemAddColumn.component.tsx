import React from "react"
import { IHeadCellProps } from "ka-table/props"
import { Button, Portal } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateItemComponent } from "./ModalCreateItem.component.tsx"

const ItemAddColumnComponent = (props: IHeadCellProps) => {
   const [openModal, setOpenModal] = React.useState(false)
   return (
      <>
         <Portal target={"#item-header"}>
            <Button leftIcon={<IconPlus />} onClick={() => setOpenModal(true)}>
               Crear
            </Button>
            <ModalCreateItemComponent
               dispatch={props.dispatch}
               openModal={openModal}
               setOpenModal={setOpenModal}
               title="Crear Item"
               type="create"
            />
         </Portal>
      </>
   )
}

export default ItemAddColumnComponent
