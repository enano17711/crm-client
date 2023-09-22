import { useState } from "react"

type usePaginationProps = {
   initialPageSize: number,
   initialPageNumber: number
}
export const usePagination = ({ initialPageSize, initialPageNumber }: usePaginationProps) => {
   const [pageSize, setPageSize] = useState(initialPageSize)
   const [pageNumber, setPageNumber] = useState(initialPageNumber)
   const handlePageChange = (page: number) => {
      setPageNumber(page)
   }
   const handlePerRowsChange = async (newPerPage: number, page: number) => {
      setPageSize(newPerPage)
      setPageNumber(page)
   }
   return {
      pageSize,
      pageNumber,
      handlePageChange,
      handlePerRowsChange
   }
}
