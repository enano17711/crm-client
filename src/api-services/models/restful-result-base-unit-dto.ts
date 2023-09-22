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
import { BaseUnitDto } from './base-unit-dto';
/**
 * 
 * @export
 * @interface RESTfulResultBaseUnitDto
 */
export interface RESTfulResultBaseUnitDto {
    /**
     * 
     * @type {number}
     * @memberof RESTfulResultBaseUnitDto
     */
    statusCode?: number | null;
    /**
     * 
     * @type {BaseUnitDto}
     * @memberof RESTfulResultBaseUnitDto
     */
    data?: BaseUnitDto;
    /**
     * 
     * @type {boolean}
     * @memberof RESTfulResultBaseUnitDto
     */
    succeeded?: boolean;
    /**
     * 
     * @type {any}
     * @memberof RESTfulResultBaseUnitDto
     */
    errors?: any | null;
    /**
     * 
     * @type {any}
     * @memberof RESTfulResultBaseUnitDto
     */
    extras?: any | null;
    /**
     * 
     * @type {number}
     * @memberof RESTfulResultBaseUnitDto
     */
    timestamp?: number;
}
