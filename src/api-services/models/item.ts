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
import { Brand } from "./brand"
import { CategoryItem } from "./category-item"
import { ItemAdjustment } from "./item-adjustment"
import { ItemBatch } from "./item-batch"
import { ItemOrder } from "./item-order"
import { ItemOrderReturn } from "./item-order-return"
import { Tax } from "./tax"
import { Unit } from "./unit"
/**
 *
 * @export
 * @interface Item
 */
export interface Item {
   /**
    *
    * @type {boolean}
    * @memberof Item
    */
   isDeleted?: boolean | null
   /**
    *
    * @type {Date}
    * @memberof Item
    */
   deletedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   deletedBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof Item
    */
   createdAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   createdBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof Item
    */
   updatedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   updatedBy?: number | null
   /**
    *
    * @type {string}
    * @memberof Item
    */
   name?: string | null
   /**
    *
    * @type {string}
    * @memberof Item
    */
   description?: string | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   itemId?: number
   /**
    *
    * @type {string}
    * @memberof Item
    */
   code?: string | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   price?: number | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   cost?: number | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   quantity?: number | null
   /**
    *
    * @type {boolean}
    * @memberof Item
    */
   isBatched?: boolean | null
   /**
    *
    * @type {string}
    * @memberof Item
    */
   taxCostMethod?: string | null
   /**
    *
    * @type {string}
    * @memberof Item
    */
   taxPriceMethod?: string | null
   /**
    *
    * @type {Array<CategoryItem>}
    * @memberof Item
    */
   categoryItems?: Array<CategoryItem> | null
   /**
    *
    * @type {number}
    * @memberof Item
    */
   taxCostId?: number | null
   /**
    *
    * @type {Tax}
    * @memberof Item
    */
   taxCost?: Tax
   /**
    *
    * @type {number}
    * @memberof Item
    */
   taxPriceId?: number | null
   /**
    *
    * @type {Tax}
    * @memberof Item
    */
   taxPrice?: Tax
   /**
    *
    * @type {number}
    * @memberof Item
    */
   brandId?: number | null
   /**
    *
    * @type {Brand}
    * @memberof Item
    */
   brand?: Brand
   /**
    *
    * @type {number}
    * @memberof Item
    */
   unitPriceId?: number | null
   /**
    *
    * @type {Unit}
    * @memberof Item
    */
   unitPrice?: Unit
   /**
    *
    * @type {number}
    * @memberof Item
    */
   unitCostId?: number | null
   /**
    *
    * @type {Unit}
    * @memberof Item
    */
   unitCost?: Unit
   /**
    *
    * @type {Array<ItemBatch>}
    * @memberof Item
    */
   itemBatches?: Array<ItemBatch> | null
   /**
    *
    * @type {Array<ItemOrder>}
    * @memberof Item
    */
   itemOrders?: Array<ItemOrder> | null
   /**
    *
    * @type {Array<ItemOrderReturn>}
    * @memberof Item
    */
   itemOrderReturns?: Array<ItemOrderReturn> | null
   /**
    *
    * @type {Array<ItemAdjustment>}
    * @memberof Item
    */
   itemAdjustments?: Array<ItemAdjustment> | null
}
