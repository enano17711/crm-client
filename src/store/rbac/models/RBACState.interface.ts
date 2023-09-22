import { LoginOutput, SecurityDto } from "../../../api-services"

export interface RBACStateInterface {
   loading: boolean
   error?: string
   account?: LoginOutput
   securities?: SecurityDto[]
}
