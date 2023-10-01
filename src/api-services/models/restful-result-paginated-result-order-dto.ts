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
import { PaginatedResultOrderDto } from "./paginated-result-order-dto"
/**
 *
 * @export
 * @interface RESTfulResultPaginatedResultOrderDto
 */
export interface RESTfulResultPaginatedResultOrderDto {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultPaginatedResultOrderDto
    */
   statusCode?: number | null
   /**
    *
    * @type {PaginatedResultOrderDto}
    * @memberof RESTfulResultPaginatedResultOrderDto
    */
   data?: PaginatedResultOrderDto
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultPaginatedResultOrderDto
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultPaginatedResultOrderDto
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultPaginatedResultOrderDto
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultPaginatedResultOrderDto
    */
   timestamp?: number
}
