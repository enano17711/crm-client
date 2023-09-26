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
import { BrandSimpleDto } from './brand-simple-dto';
/**
 * 
 * @export
 * @interface RESTfulResultBrandSimpleDto
 */
export interface RESTfulResultBrandSimpleDto {
    /**
     * 
     * @type {number}
     * @memberof RESTfulResultBrandSimpleDto
     */
    statusCode?: number | null;
    /**
     * 
     * @type {BrandSimpleDto}
     * @memberof RESTfulResultBrandSimpleDto
     */
    data?: BrandSimpleDto;
    /**
     * 
     * @type {boolean}
     * @memberof RESTfulResultBrandSimpleDto
     */
    succeeded?: boolean;
    /**
     * 
     * @type {any}
     * @memberof RESTfulResultBrandSimpleDto
     */
    errors?: any | null;
    /**
     * 
     * @type {any}
     * @memberof RESTfulResultBrandSimpleDto
     */
    extras?: any | null;
    /**
     * 
     * @type {number}
     * @memberof RESTfulResultBrandSimpleDto
     */
    timestamp?: number;
}
