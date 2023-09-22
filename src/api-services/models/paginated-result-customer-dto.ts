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
import { CustomerDto } from './customer-dto';
import { MetaData } from './meta-data';
/**
 * 
 * @export
 * @interface PaginatedResultCustomerDto
 */
export interface PaginatedResultCustomerDto {
    /**
     * 
     * @type {Array<CustomerDto>}
     * @memberof PaginatedResultCustomerDto
     */
    items?: Array<CustomerDto> | null;
    /**
     * 
     * @type {MetaData}
     * @memberof PaginatedResultCustomerDto
     */
    metaData?: MetaData;
}
