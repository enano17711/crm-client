import { LoadingOverlay } from "@mantine/core"
import { useIsFetching } from "@tanstack/react-query"

const LoadingComponent = () => {
   const isFetching = useIsFetching()
   return <LoadingOverlay visible={isFetching > 0} />
}

export default LoadingComponent
