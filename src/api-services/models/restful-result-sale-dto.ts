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
import { SaleDto } from "./sale-dto"
/**
 *
 * @export
 * @interface RESTfulResultSaleDto
 */
export interface RESTfulResultSaleDto {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultSaleDto
    */
   statusCode?: number | null
   /**
    *
    * @type {SaleDto}
    * @memberof RESTfulResultSaleDto
    */
   data?: SaleDto
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultSaleDto
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultSaleDto
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultSaleDto
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultSaleDto
    */
   timestamp?: number
}
