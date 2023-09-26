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
 * @interface PaginatedResponseBrandSimpleDto
 */
export interface PaginatedResponseBrandSimpleDto {
    /**
     * 
     * @type {number}
     * @memberof PaginatedResponseBrandSimpleDto
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedResponseBrandSimpleDto
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedResponseBrandSimpleDto
     */
    totalNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedResponseBrandSimpleDto
     */
    totalPage?: number;
    /**
     * 
     * @type {Array<BrandSimpleDto>}
     * @memberof PaginatedResponseBrandSimpleDto
     */
    items?: Array<BrandSimpleDto> | null;
}
