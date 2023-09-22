import { useDisclosure } from "@mantine/hooks"
import { useEffect } from "react"
import { LoadingOverlay } from "@mantine/core"

type LoadingProps = {
   loading?: boolean
}
const LoadingComponent = ({ loading }: LoadingProps) => {
   const [visible, { open, close }] = useDisclosure(false)

   useEffect(() => {
      if (loading) {
         open()
      } else {
         close()
      }
   }, [loading])

   return <LoadingOverlay visible={visible} />
}

export default LoadingComponent
