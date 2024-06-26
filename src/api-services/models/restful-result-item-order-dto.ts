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
import { ItemOrderDto } from "./item-order-dto"
/**
 *
 * @export
 * @interface RESTfulResultItemOrderDto
 */
export interface RESTfulResultItemOrderDto {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultItemOrderDto
    */
   statusCode?: number | null
   /**
    *
    * @type {ItemOrderDto}
    * @memberof RESTfulResultItemOrderDto
    */
   data?: ItemOrderDto
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultItemOrderDto
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultItemOrderDto
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultItemOrderDto
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultItemOrderDto
    */
   timestamp?: number
}
