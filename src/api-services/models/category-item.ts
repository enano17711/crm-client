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
/**
 *
 * @export
 * @interface CategoryItem
 */
export interface CategoryItem {
   /**
    *
    * @type {boolean}
    * @memberof CategoryItem
    */
   isDeleted?: boolean | null
   /**
    *
    * @type {Date}
    * @memberof CategoryItem
    */
   deletedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof CategoryItem
    */
   deletedBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof CategoryItem
    */
   createdAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof CategoryItem
    */
   createdBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof CategoryItem
    */
   updatedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof CategoryItem
    */
   updatedBy?: number | null
   /**
    *
    * @type {string}
    * @memberof CategoryItem
    */
   name?: string | null
   /**
    *
    * @type {string}
    * @memberof CategoryItem
    */
   description?: string | null
   /**
    *
    * @type {number}
    * @memberof CategoryItem
    */
   categoryItemId?: number
   /**
    *
    * @type {Array<Item>}
    * @memberof CategoryItem
    */
   items?: Array<Item> | null
   /**
    *
    * @type {number}
    * @memberof CategoryItem
    */
   rowIndex?: number | null
}
