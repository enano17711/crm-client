import React from "react"
import { IHeadCellProps } from "ka-table/props"
import { Button } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateBrandComponent } from "./ModalCreateBrand.component.tsx"

const AddColumnComponent = (props: IHeadCellProps) => {
   const [openModal, setOpenModal] = React.useState(false)
   return (
      <>
         <Button leftIcon={<IconPlus />} onClick={() => setOpenModal(true)}>
            Crear
         </Button>
         <ModalCreateBrandComponent
            dispatch={props.dispatch}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Crear Marca"
            type="create"
         />
      </>
   )
}

export default AddColumnComponent
