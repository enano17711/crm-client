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
/**
 *
 * @export
 * @interface Tax
 */
export interface Tax {
   /**
    *
    * @type {boolean}
    * @memberof Tax
    */
   isDeleted?: boolean | null
   /**
    *
    * @type {Date}
    * @memberof Tax
    */
   deletedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof Tax
    */
   deletedBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof Tax
    */
   createdAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof Tax
    */
   createdBy?: number | null
   /**
    *
    * @type {Date}
    * @memberof Tax
    */
   updatedAt?: Date | null
   /**
    *
    * @type {number}
    * @memberof Tax
    */
   updatedBy?: number | null
   /**
    *
    * @type {string}
    * @memberof Tax
    */
   name?: string | null
   /**
    *
    * @type {string}
    * @memberof Tax
    */
   description?: string | null
   /**
    *
    * @type {number}
    * @memberof Tax
    */
   taxId?: number
   /**
    *
    * @type {number}
    * @memberof Tax
    */
   rate?: number | null
}
