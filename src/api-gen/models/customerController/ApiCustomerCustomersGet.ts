import type { ResTfulResultPaginatedResultCustomerDto } from "../ResTfulResultPaginatedResultCustomerDto"

export type ApiCustomerCustomersGetQueryParams = {
   /**
    * @type integer | undefined int32
    */
   PageNumber?: number
   /**
    * @type integer | undefined int32
    */
   PageSize?: number
   /**
    * @type string | undefined
    */
   ColumnName?: string
   /**
    * @type string | undefined
    */
   ColumnValue?: string
}

/**
 * @description Success
 */
export type ApiCustomerCustomersGetQueryResponse =
   ResTfulResultPaginatedResultCustomerDto
