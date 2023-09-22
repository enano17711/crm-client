import { AdjustmentDto } from "../../../api-services"

export interface AdjustmentsStateInterface {
   loading: boolean
   error?: string
   adjustments: AdjustmentDto[]
}
