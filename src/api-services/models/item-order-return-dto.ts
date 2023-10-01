/* tslint:disable */
/* eslint-disable */
/**
 * 规范化接口演示
 * 让 .NET 开发更简单，更通用，更流行。
 *
 * OpenAPI spec version: 1.0.0
 * Contact: monksoul@outlook.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ItemBatchDto } from "./item-batch-dto"
import { ItemDto } from "./item-dto"
import { OrderReturnDto } from "./order-return-dto"
import { UnitDto } from "./unit-dto"
/**
 *
 * @export
 * @interface ItemOrderReturnDto
 */
export interface ItemOrderReturnDto {
   /**
    *
    * @type {boolean}
    * @memberof ItemOrderReturnDto
    */
   isDeleted?: boolean | null
   /**
    *
    * @type {Date}
    * @memberof ItemOrderReturnDto
    */
   deletedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   deletedBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof ItemOrderReturnDto
    */
   createdAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   createdBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof ItemOrderReturnDto
    */
   updatedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   updatedBy?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   itemOrderReturnId?: number
   /**
    *
    * @type {string}
    * @memberof ItemOrderReturnDto
    */
   batchNumber?: string | null
   /**
    *
    * @type {Date}
    * @memberof ItemOrderReturnDto
    */
   batchDate?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   quantity?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   receivedQuantity?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   unitCostNet?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   discount?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   taxRate?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   tax?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemOrderReturnDto
    */
   total?: number | null
   /**
    *
    * @type {ItemDto}
    * @memberof ItemOrderReturnDto
    */
   item?: ItemDto
   /**
    *
    * @type {ItemBatchDto}
    * @memberof ItemOrderReturnDto
    */
   itemBatch?: ItemBatchDto
   /**
    *
    * @type {OrderReturnDto}
    * @memberof ItemOrderReturnDto
    */
   orderReturn?: OrderReturnDto
   /**
    *
    * @type {UnitDto}
    * @memberof ItemOrderReturnDto
    */
   unitCost?: UnitDto
}
