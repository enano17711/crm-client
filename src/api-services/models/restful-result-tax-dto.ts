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
import { TaxDto } from "./tax-dto"
/**
 *
 * @export
 * @interface RESTfulResultTaxDto
 */
export interface RESTfulResultTaxDto {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultTaxDto
    */
   statusCode?: number | null
   /**
    *
    * @type {TaxDto}
    * @memberof RESTfulResultTaxDto
    */
   data?: TaxDto
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultTaxDto
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultTaxDto
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultTaxDto
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultTaxDto
    */
   timestamp?: number
}
