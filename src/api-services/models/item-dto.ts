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
import { BrandDto } from './brand-dto';
import { CategoryItemDto } from './category-item-dto';
import { ItemAdjustmentDto } from './item-adjustment-dto';
import { ItemBatchDto } from './item-batch-dto';
import { ItemOrderDto } from './item-order-dto';
import { ItemOrderReturnDto } from './item-order-return-dto';
import { TaxDto } from './tax-dto';
import { UnitDto } from './unit-dto';
/**
 * 
 * @export
 * @interface ItemDto
 */
export interface ItemDto {
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    description?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ItemDto
     */
    itemId?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    code?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ItemDto
     */
    price?: number | null;
    /**
     * 
     * @type {number}
     * @memberof ItemDto
     */
    cost?: number | null;
    /**
     * 
     * @type {number}
     * @memberof ItemDto
     */
    quantity?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof ItemDto
     */
    isBatched?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    taxCostMethod?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    taxPriceMethod?: string | null;
    /**
     * 
     * @type {Array<CategoryItemDto>}
     * @memberof ItemDto
     */
    categoryItems?: Array<CategoryItemDto> | null;
    /**
     * 
     * @type {TaxDto}
     * @memberof ItemDto
     */
    taxCost?: TaxDto;
    /**
     * 
     * @type {TaxDto}
     * @memberof ItemDto
     */
    taxPrice?: TaxDto;
    /**
     * 
     * @type {BrandDto}
     * @memberof ItemDto
     */
    brand?: BrandDto;
    /**
     * 
     * @type {UnitDto}
     * @memberof ItemDto
     */
    unitPrice?: UnitDto;
    /**
     * 
     * @type {UnitDto}
     * @memberof ItemDto
     */
    unitCost?: UnitDto;
    /**
     * 
     * @type {Array<ItemBatchDto>}
     * @memberof ItemDto
     */
    itemBatches?: Array<ItemBatchDto> | null;
    /**
     * 
     * @type {Array<ItemOrderDto>}
     * @memberof ItemDto
     */
    itemOrders?: Array<ItemOrderDto> | null;
    /**
     * 
     * @type {Array<ItemOrderReturnDto>}
     * @memberof ItemDto
     */
    itemOrderReturns?: Array<ItemOrderReturnDto> | null;
    /**
     * 
     * @type {Array<ItemAdjustmentDto>}
     * @memberof ItemDto
     */
    itemAdjustments?: Array<ItemAdjustmentDto> | null;
}
