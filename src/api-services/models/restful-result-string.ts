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
 * @interface RESTfulResultString
 */
export interface RESTfulResultString {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultString
    */
   statusCode?: number | null
   /**
    *
    * @type {string}
    * @memberof RESTfulResultString
    */
   data?: string | null
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultString
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultString
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultString
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultString
    */
   timestamp?: number
}
