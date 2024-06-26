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
import { LoadResult } from "./load-result"
/**
 *
 * @export
 * @interface RESTfulResultLoadResult
 */
export interface RESTfulResultLoadResult {
   /**
    *
    * @type {number}
    * @memberof RESTfulResultLoadResult
    */
   statusCode?: number | null
   /**
    *
    * @type {LoadResult}
    * @memberof RESTfulResultLoadResult
    */
   data?: LoadResult
   /**
    *
    * @type {boolean}
    * @memberof RESTfulResultLoadResult
    */
   succeeded?: boolean
   /**
    *
    * @type {any}
    * @memberof RESTfulResultLoadResult
    */
   errors?: any | null
   /**
    *
    * @type {any}
    * @memberof RESTfulResultLoadResult
    */
   extras?: any | null
   /**
    *
    * @type {number}
    * @memberof RESTfulResultLoadResult
    */
   timestamp?: number
}
