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
 * @interface RESTfulResultObject
 */
export interface RESTfulResultObject {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultObject
    */
   statusCode?: number | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultObject
    */
   data?: any | null
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultObject
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultObject
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultObject
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultObject
    */
   timestamp?: number
}
