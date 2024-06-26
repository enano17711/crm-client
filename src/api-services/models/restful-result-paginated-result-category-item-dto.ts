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
import { PaginatedResultCategoryItemDto } from "./paginated-result-category-item-dto"
/**
 *
 * @export
 * @interface RESTfulResultPaginatedResultCategoryItemDto
 */
export interface RESTfulResultPaginatedResultCategoryItemDto {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultPaginatedResultCategoryItemDto
    */
   statusCode?: number | null
   /**
    *
    * @type {PaginatedResultCategoryItemDto}
    * @memberof RESTfulResultPaginatedResultCategoryItemDto
    */
   data?: PaginatedResultCategoryItemDto
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultPaginatedResultCategoryItemDto
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultPaginatedResultCategoryItemDto
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultPaginatedResultCategoryItemDto
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultPaginatedResultCategoryItemDto
    */
   timestamp?: number
}
