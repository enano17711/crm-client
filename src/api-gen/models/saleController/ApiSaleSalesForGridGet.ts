import type { ResTfulResultLoadResult } from "../ResTfulResultLoadResult"
import type { SortingInfo } from "../SortingInfo"
import type { GroupingInfo } from "../GroupingInfo"
import type { SummaryInfo } from "../SummaryInfo"

/**
 * @description Success
 */
export type ApiSaleSalesForGridGetQueryResponse = ResTfulResultLoadResult

export type ApiSaleSalesForGridGetQueryParams = {
   /**
    * @type boolean | undefined
    */
   RequireTotalCount?: boolean
   /**
    * @type boolean | undefined
    */
   RequireGroupCount?: boolean
   /**
    * @type boolean | undefined
    */
   IsCountQuery?: boolean
   /**
    * @type boolean | undefined
    */
   IsSummaryQuery?: boolean
   /**
    * @type integer | undefined int32
    */
   Skip?: number
   /**
    * @type integer | undefined int32
    */
   Take?: number
   /**
    * @type array | undefined
    */
   Sort?: SortingInfo[]
   /**
    * @type array | undefined
    */
   Group?: GroupingInfo[]
   /**
    * @type array | undefined
    */
   Filter?: any[]
   /**
    * @type array | undefined
    */
   TotalSummary?: SummaryInfo[]
   /**
    * @type array | undefined
    */
   GroupSummary?: SummaryInfo[]
   /**
    * @type array | undefined
    */
   Select?: string[]
   /**
    * @type array | undefined
    */
   PreSelect?: string[]
   /**
    * @type boolean | undefined
    */
   RemoteSelect?: boolean
   /**
    * @type boolean | undefined
    */
   RemoteGrouping?: boolean
   /**
    * @type boolean | undefined
    */
   ExpandLinqSumType?: boolean
   /**
    * @type array | undefined
    */
   PrimaryKey?: string[]
   /**
    * @type string | undefined
    */
   DefaultSort?: string
   /**
    * @type boolean | undefined
    */
   StringToLower?: boolean
   /**
    * @type boolean | undefined
    */
   PaginateViaPrimaryKey?: boolean
   /**
    * @type boolean | undefined
    */
   SortByPrimaryKey?: boolean
   /**
    * @type boolean | undefined
    */
   AllowAsyncOverSync?: boolean
}
