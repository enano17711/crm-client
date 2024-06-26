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
import { UnitDto } from "./unit-dto"
/**
 *
 * @export
 * @interface RESTfulResultUnitDto
 */
export interface RESTfulResultUnitDto {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultUnitDto
    */
   statusCode?: number | null
   /**
    *
    * @type {UnitDto}
    * @memberof RESTfulResultUnitDto
    */
   data?: UnitDto
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultUnitDto
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultUnitDto
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultUnitDto
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultUnitDto
    */
   timestamp?: number
}
