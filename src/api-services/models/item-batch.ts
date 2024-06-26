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
import { Item } from "./item"
import { ItemAdjustment } from "./item-adjustment"
import { ItemOrder } from "./item-order"
import { ItemOrderReturn } from "./item-order-return"
/**
 *
 * @export
 * @interface ItemBatch
 */
export interface ItemBatch {
   /**
    *
    * @type {boolean}
    * @memberof ItemBatch
    */
   isDeleted?: boolean | null
   /**
    *
    * @type {Date}
    * @memberof ItemBatch
    */
   deletedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemBatch
    */
   deletedBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof ItemBatch
    */
   createdAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemBatch
    */
   createdBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof ItemBatch
    */
   updatedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemBatch
    */
   updatedBy?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemBatch
    */
   itemBatchId?: number
   /**
    *
    * @type {string}
    * @memberof ItemBatch
    */
   batchNumber?: string | null
   /**
    *
    * @type {Date}
    * @memberof ItemBatch
    */
   batchDate?: Date | null
   /**
    *
    * @type {number}
    * @memberof ItemBatch
    */
   quantity?: number | null
   /**
    *
    * @type {number}
    * @memberof ItemBatch
    */
   itemId?: number | null
   /**
    *
    * @type {Item}
    * @memberof ItemBatch
    */
   item?: Item
   /**
    *
    * @type {Array<ItemAdjustment>}
    * @memberof ItemBatch
    */
   itemAdjustments?: Array<ItemAdjustment> | null
   /**
    *
    * @type {Array<ItemOrder>}
    * @memberof ItemBatch
    */
   itemOrders?: Array<ItemOrder> | null
   /**
    *
    * @type {Array<ItemOrderReturn>}
    * @memberof ItemBatch
    */
   itemOrderReturns?: Array<ItemOrderReturn> | null
}
