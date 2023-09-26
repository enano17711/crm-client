import React from "react"
import { Button } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateBrandComponent } from "./ModalCreateBrand.component.tsx"
import { DispatchFunc } from "ka-table/types"

interface AddColumnComponentProps {
   dispatch: DispatchFunc
}

const AddColumnComponent = ({ dispatch }: AddColumnComponentProps) => {
   const [openModal, setOpenModal] = React.useState(false)
   return (
      <>
         <Button leftIcon={<IconPlus />} onClick={() => setOpenModal(true)}>
            Crear
         </Button>
         <ModalCreateBrandComponent
            dispatch={dispatch}
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Crear Marca"
            type="create"
         />
      </>
   )
}

export default AddColumnComponent
