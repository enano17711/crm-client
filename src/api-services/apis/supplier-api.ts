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
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { CreateSupplierDto } from '../models';
import { GroupingInfo } from '../models';
import { RESTfulResultLoadResult } from '../models';
import { RESTfulResultPaginatedResultSupplierDto } from '../models';
import { RESTfulResultSupplierDto } from '../models';
import { SortingInfo } from '../models';
import { SummaryInfo } from '../models';
import { UpdateSupplierDto } from '../models';
/**
 * SupplierApi - axios parameter creator
 * @export
 */
export const SupplierApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSupplierSupplierIdDelete: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiSupplierSupplierIdDelete.');
            }
            const localVarPath = `/api/supplier/supplier/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSupplierSupplierIdGet: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiSupplierSupplierIdGet.');
            }
            const localVarPath = `/api/supplier/supplier/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateSupplierDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSupplierSupplierIdPut: async (id: number, body?: UpdateSupplierDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiSupplierSupplierIdPut.');
            }
            const localVarPath = `/api/supplier/supplier/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {CreateSupplierDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSupplierSupplierPost: async (body?: CreateSupplierDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/supplier/supplier`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {boolean} [requireTotalCount] 
         * @param {boolean} [requireGroupCount] 
         * @param {boolean} [isCountQuery] 
         * @param {boolean} [isSummaryQuery] 
         * @param {number} [skip] 
         * @param {number} [take] 
         * @param {Array<SortingInfo>} [sort] 
         * @param {Array<GroupingInfo>} [group] 
         * @param {Array<any>} [filter] 
         * @param {Array<SummaryInfo>} [totalSummary] 
         * @param {Array<SummaryInfo>} [groupSummary] 
         * @param {Array<string>} [select] 
         * @param {Array<string>} [preSelect] 
         * @param {boolean} [remoteSelect] 
         * @param {boolean} [remoteGrouping] 
         * @param {boolean} [expandLinqSumType] 
         * @param {Array<string>} [primaryKey] 
         * @param {string} [defaultSort] 
         * @param {boolean} [stringToLower] 
         * @param {boolean} [paginateViaPrimaryKey] 
         * @param {boolean} [sortByPrimaryKey] 
         * @param {boolean} [allowAsyncOverSync] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSupplierSuppliersForGridGet: async (requireTotalCount?: boolean, requireGroupCount?: boolean, isCountQuery?: boolean, isSummaryQuery?: boolean, skip?: number, take?: number, sort?: Array<SortingInfo>, group?: Array<GroupingInfo>, filter?: Array<any>, totalSummary?: Array<SummaryInfo>, groupSummary?: Array<SummaryInfo>, select?: Array<string>, preSelect?: Array<string>, remoteSelect?: boolean, remoteGrouping?: boolean, expandLinqSumType?: boolean, primaryKey?: Array<string>, defaultSort?: string, stringToLower?: boolean, paginateViaPrimaryKey?: boolean, sortByPrimaryKey?: boolean, allowAsyncOverSync?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/supplier/suppliers-for-grid`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            if (requireTotalCount !== undefined) {
                localVarQueryParameter['RequireTotalCount'] = requireTotalCount;
            }

            if (requireGroupCount !== undefined) {
                localVarQueryParameter['RequireGroupCount'] = requireGroupCount;
            }

            if (isCountQuery !== undefined) {
                localVarQueryParameter['IsCountQuery'] = isCountQuery;
            }

            if (isSummaryQuery !== undefined) {
                localVarQueryParameter['IsSummaryQuery'] = isSummaryQuery;
            }

            if (skip !== undefined) {
                localVarQueryParameter['Skip'] = skip;
            }

            if (take !== undefined) {
                localVarQueryParameter['Take'] = take;
            }

            if (sort) {
                localVarQueryParameter['Sort'] = sort;
            }

            if (group) {
                localVarQueryParameter['Group'] = group;
            }

            if (filter) {
                localVarQueryParameter['Filter'] = filter;
            }

            if (totalSummary) {
                localVarQueryParameter['TotalSummary'] = totalSummary;
            }

            if (groupSummary) {
                localVarQueryParameter['GroupSummary'] = groupSummary;
            }

            if (select) {
                localVarQueryParameter['Select'] = select;
            }

            if (preSelect) {
                localVarQueryParameter['PreSelect'] = preSelect;
            }

            if (remoteSelect !== undefined) {
                localVarQueryParameter['RemoteSelect'] = remoteSelect;
            }

            if (remoteGrouping !== undefined) {
                localVarQueryParameter['RemoteGrouping'] = remoteGrouping;
            }

            if (expandLinqSumType !== undefined) {
                localVarQueryParameter['ExpandLinqSumType'] = expandLinqSumType;
            }

            if (primaryKey) {
                localVarQueryParameter['PrimaryKey'] = primaryKey;
            }

            if (defaultSort !== undefined) {
                localVarQueryParameter['DefaultSort'] = defaultSort;
            }

            if (stringToLower !== undefined) {
                localVarQueryParameter['StringToLower'] = stringToLower;
            }

            if (paginateViaPrimaryKey !== undefined) {
                localVarQueryParameter['PaginateViaPrimaryKey'] = paginateViaPrimaryKey;
            }

            if (sortByPrimaryKey !== undefined) {
                localVarQueryParameter['SortByPrimaryKey'] = sortByPrimaryKey;
            }

            if (allowAsyncOverSync !== undefined) {
                localVarQueryParameter['AllowAsyncOverSync'] = allowAsyncOverSync;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [pageNumber] 
         * @param {number} [pageSize] 
         * @param {number} [totalCountValue] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSupplierSuppliersGet: async (pageNumber?: number, pageSize?: number, totalCountValue?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/supplier/suppliers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            if (pageNumber !== undefined) {
                localVarQueryParameter['PageNumber'] = pageNumber;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['PageSize'] = pageSize;
            }

            if (totalCountValue !== undefined) {
                localVarQueryParameter['TotalCount.Value'] = totalCountValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SupplierApi - functional programming interface
 * @export
 */
export const SupplierApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierIdDelete(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultSupplierDto>>> {
            const localVarAxiosArgs = await SupplierApiAxiosParamCreator(configuration).apiSupplierSupplierIdDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierIdGet(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultSupplierDto>>> {
            const localVarAxiosArgs = await SupplierApiAxiosParamCreator(configuration).apiSupplierSupplierIdGet(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateSupplierDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierIdPut(id: number, body?: UpdateSupplierDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultSupplierDto>>> {
            const localVarAxiosArgs = await SupplierApiAxiosParamCreator(configuration).apiSupplierSupplierIdPut(id, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {CreateSupplierDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierPost(body?: CreateSupplierDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultSupplierDto>>> {
            const localVarAxiosArgs = await SupplierApiAxiosParamCreator(configuration).apiSupplierSupplierPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {boolean} [requireTotalCount] 
         * @param {boolean} [requireGroupCount] 
         * @param {boolean} [isCountQuery] 
         * @param {boolean} [isSummaryQuery] 
         * @param {number} [skip] 
         * @param {number} [take] 
         * @param {Array<SortingInfo>} [sort] 
         * @param {Array<GroupingInfo>} [group] 
         * @param {Array<any>} [filter] 
         * @param {Array<SummaryInfo>} [totalSummary] 
         * @param {Array<SummaryInfo>} [groupSummary] 
         * @param {Array<string>} [select] 
         * @param {Array<string>} [preSelect] 
         * @param {boolean} [remoteSelect] 
         * @param {boolean} [remoteGrouping] 
         * @param {boolean} [expandLinqSumType] 
         * @param {Array<string>} [primaryKey] 
         * @param {string} [defaultSort] 
         * @param {boolean} [stringToLower] 
         * @param {boolean} [paginateViaPrimaryKey] 
         * @param {boolean} [sortByPrimaryKey] 
         * @param {boolean} [allowAsyncOverSync] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSuppliersForGridGet(requireTotalCount?: boolean, requireGroupCount?: boolean, isCountQuery?: boolean, isSummaryQuery?: boolean, skip?: number, take?: number, sort?: Array<SortingInfo>, group?: Array<GroupingInfo>, filter?: Array<any>, totalSummary?: Array<SummaryInfo>, groupSummary?: Array<SummaryInfo>, select?: Array<string>, preSelect?: Array<string>, remoteSelect?: boolean, remoteGrouping?: boolean, expandLinqSumType?: boolean, primaryKey?: Array<string>, defaultSort?: string, stringToLower?: boolean, paginateViaPrimaryKey?: boolean, sortByPrimaryKey?: boolean, allowAsyncOverSync?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultLoadResult>>> {
            const localVarAxiosArgs = await SupplierApiAxiosParamCreator(configuration).apiSupplierSuppliersForGridGet(requireTotalCount, requireGroupCount, isCountQuery, isSummaryQuery, skip, take, sort, group, filter, totalSummary, groupSummary, select, preSelect, remoteSelect, remoteGrouping, expandLinqSumType, primaryKey, defaultSort, stringToLower, paginateViaPrimaryKey, sortByPrimaryKey, allowAsyncOverSync, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} [pageNumber] 
         * @param {number} [pageSize] 
         * @param {number} [totalCountValue] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSuppliersGet(pageNumber?: number, pageSize?: number, totalCountValue?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<RESTfulResultPaginatedResultSupplierDto>>> {
            const localVarAxiosArgs = await SupplierApiAxiosParamCreator(configuration).apiSupplierSuppliersGet(pageNumber, pageSize, totalCountValue, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SupplierApi - factory interface
 * @export
 */
export const SupplierApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierIdDelete(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultSupplierDto>> {
            return SupplierApiFp(configuration).apiSupplierSupplierIdDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierIdGet(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultSupplierDto>> {
            return SupplierApiFp(configuration).apiSupplierSupplierIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateSupplierDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierIdPut(id: number, body?: UpdateSupplierDto, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultSupplierDto>> {
            return SupplierApiFp(configuration).apiSupplierSupplierIdPut(id, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CreateSupplierDto} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSupplierPost(body?: CreateSupplierDto, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultSupplierDto>> {
            return SupplierApiFp(configuration).apiSupplierSupplierPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {boolean} [requireTotalCount] 
         * @param {boolean} [requireGroupCount] 
         * @param {boolean} [isCountQuery] 
         * @param {boolean} [isSummaryQuery] 
         * @param {number} [skip] 
         * @param {number} [take] 
         * @param {Array<SortingInfo>} [sort] 
         * @param {Array<GroupingInfo>} [group] 
         * @param {Array<any>} [filter] 
         * @param {Array<SummaryInfo>} [totalSummary] 
         * @param {Array<SummaryInfo>} [groupSummary] 
         * @param {Array<string>} [select] 
         * @param {Array<string>} [preSelect] 
         * @param {boolean} [remoteSelect] 
         * @param {boolean} [remoteGrouping] 
         * @param {boolean} [expandLinqSumType] 
         * @param {Array<string>} [primaryKey] 
         * @param {string} [defaultSort] 
         * @param {boolean} [stringToLower] 
         * @param {boolean} [paginateViaPrimaryKey] 
         * @param {boolean} [sortByPrimaryKey] 
         * @param {boolean} [allowAsyncOverSync] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSuppliersForGridGet(requireTotalCount?: boolean, requireGroupCount?: boolean, isCountQuery?: boolean, isSummaryQuery?: boolean, skip?: number, take?: number, sort?: Array<SortingInfo>, group?: Array<GroupingInfo>, filter?: Array<any>, totalSummary?: Array<SummaryInfo>, groupSummary?: Array<SummaryInfo>, select?: Array<string>, preSelect?: Array<string>, remoteSelect?: boolean, remoteGrouping?: boolean, expandLinqSumType?: boolean, primaryKey?: Array<string>, defaultSort?: string, stringToLower?: boolean, paginateViaPrimaryKey?: boolean, sortByPrimaryKey?: boolean, allowAsyncOverSync?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultLoadResult>> {
            return SupplierApiFp(configuration).apiSupplierSuppliersForGridGet(requireTotalCount, requireGroupCount, isCountQuery, isSummaryQuery, skip, take, sort, group, filter, totalSummary, groupSummary, select, preSelect, remoteSelect, remoteGrouping, expandLinqSumType, primaryKey, defaultSort, stringToLower, paginateViaPrimaryKey, sortByPrimaryKey, allowAsyncOverSync, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [pageNumber] 
         * @param {number} [pageSize] 
         * @param {number} [totalCountValue] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSupplierSuppliersGet(pageNumber?: number, pageSize?: number, totalCountValue?: number, options?: AxiosRequestConfig): Promise<AxiosResponse<RESTfulResultPaginatedResultSupplierDto>> {
            return SupplierApiFp(configuration).apiSupplierSuppliersGet(pageNumber, pageSize, totalCountValue, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SupplierApi - object-oriented interface
 * @export
 * @class SupplierApi
 * @extends {BaseAPI}
 */
export class SupplierApi extends BaseAPI {
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SupplierApi
     */
    public async apiSupplierSupplierIdDelete(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultSupplierDto>> {
        return SupplierApiFp(this.configuration).apiSupplierSupplierIdDelete(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SupplierApi
     */
    public async apiSupplierSupplierIdGet(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultSupplierDto>> {
        return SupplierApiFp(this.configuration).apiSupplierSupplierIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {UpdateSupplierDto} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SupplierApi
     */
    public async apiSupplierSupplierIdPut(id: number, body?: UpdateSupplierDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultSupplierDto>> {
        return SupplierApiFp(this.configuration).apiSupplierSupplierIdPut(id, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {CreateSupplierDto} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SupplierApi
     */
    public async apiSupplierSupplierPost(body?: CreateSupplierDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultSupplierDto>> {
        return SupplierApiFp(this.configuration).apiSupplierSupplierPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {boolean} [requireTotalCount] 
     * @param {boolean} [requireGroupCount] 
     * @param {boolean} [isCountQuery] 
     * @param {boolean} [isSummaryQuery] 
     * @param {number} [skip] 
     * @param {number} [take] 
     * @param {Array<SortingInfo>} [sort] 
     * @param {Array<GroupingInfo>} [group] 
     * @param {Array<any>} [filter] 
     * @param {Array<SummaryInfo>} [totalSummary] 
     * @param {Array<SummaryInfo>} [groupSummary] 
     * @param {Array<string>} [select] 
     * @param {Array<string>} [preSelect] 
     * @param {boolean} [remoteSelect] 
     * @param {boolean} [remoteGrouping] 
     * @param {boolean} [expandLinqSumType] 
     * @param {Array<string>} [primaryKey] 
     * @param {string} [defaultSort] 
     * @param {boolean} [stringToLower] 
     * @param {boolean} [paginateViaPrimaryKey] 
     * @param {boolean} [sortByPrimaryKey] 
     * @param {boolean} [allowAsyncOverSync] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SupplierApi
     */
    public async apiSupplierSuppliersForGridGet(requireTotalCount?: boolean, requireGroupCount?: boolean, isCountQuery?: boolean, isSummaryQuery?: boolean, skip?: number, take?: number, sort?: Array<SortingInfo>, group?: Array<GroupingInfo>, filter?: Array<any>, totalSummary?: Array<SummaryInfo>, groupSummary?: Array<SummaryInfo>, select?: Array<string>, preSelect?: Array<string>, remoteSelect?: boolean, remoteGrouping?: boolean, expandLinqSumType?: boolean, primaryKey?: Array<string>, defaultSort?: string, stringToLower?: boolean, paginateViaPrimaryKey?: boolean, sortByPrimaryKey?: boolean, allowAsyncOverSync?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultLoadResult>> {
        return SupplierApiFp(this.configuration).apiSupplierSuppliersForGridGet(requireTotalCount, requireGroupCount, isCountQuery, isSummaryQuery, skip, take, sort, group, filter, totalSummary, groupSummary, select, preSelect, remoteSelect, remoteGrouping, expandLinqSumType, primaryKey, defaultSort, stringToLower, paginateViaPrimaryKey, sortByPrimaryKey, allowAsyncOverSync, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} [pageNumber] 
     * @param {number} [pageSize] 
     * @param {number} [totalCountValue] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SupplierApi
     */
    public async apiSupplierSuppliersGet(pageNumber?: number, pageSize?: number, totalCountValue?: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<RESTfulResultPaginatedResultSupplierDto>> {
        return SupplierApiFp(this.configuration).apiSupplierSuppliersGet(pageNumber, pageSize, totalCountValue, options).then((request) => request(this.axios, this.basePath));
    }
}
