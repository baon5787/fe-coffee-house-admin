import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import queryString from 'query-string';
import styles from '../style/Product.module.css';
import { Actions } from '~/components/actions';
import { CheckBox, LimitAndPagination, Table, Tbody, Thead } from '~/components/table';
import { errorProductSelector, productsSelector, titleErrorProductSelector } from '~/redux/selectors';
import {
    getDisenableProductBySku, getDisenableProducts, getEnabledProductBySku,
    getProducts, getSearchDisenableProducts, getSearchProducts
} from '../services/ApiProduct';
import { disenable, enable, updateData } from '~/helper/AppString';
import { deleteChangeSelectProducts } from '~/redux/slice/ProductSlice';
import { resetFilters, updateFilters } from '~/redux/slice/FiltersSlice';
import { PATH } from '~/constants/Paths';
import { ALL, DEFAULT_INDEX, OPTION_LIMIT, OPTION_PAGE, PRODUCT_SORT_FIELD } from '~/constants/AppConstant';
import { warningTitle } from '~/utils/StringConcatention';
import { success, warning } from '~/components/swal/Swal';
import { SortName } from '~/components/filters';
import {
    conversionNumberToVND, ordinalNumbers, checkDataAndFilter,
    isLengthChecked, getTitleAction, getClassNameStatus
} from '~/utils/HandleTable';
import { getSortDir } from '~/utils/HandleValue';
import useTable from '~/hooks/useTable';
import { isFilter, isObjectOneValue } from '~/utils/CheckValue';
import { Forbidden } from '~/components/error';


const ProductList = ({ option }) => {

    const allProduct = useSelector(productsSelector);

    const { dispatch, navigate, accessToken, page, axiosJwt, newFilters, currentPage } = useTable();

    const error = useSelector(errorProductSelector);

    const msg = useSelector(titleErrorProductSelector);

    const [sortFilterName, setSortFilterName] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, PRODUCT_SORT_FIELD.NAME));

    const [sortFilterPrice, setSortFilterPrice] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, PRODUCT_SORT_FIELD.PRICE));

    const [errorForbidden, setErrorForbidden] = useState(false);

    const [filters, setFilters] = useState();

    useEffect(() => {
        if (errorForbidden && filters) {
            dispatch(updateFilters(filters))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorForbidden])

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {
            if (!accessToken) return;

            if (errorForbidden) {
                setErrorForbidden(!errorForbidden);
                return;
            }
            getData(cancelToken);
        }
        handle();
        return () => {
            cancelToken.cancel('Operation canceled by the product.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters])

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {

            if (!accessToken) return;

            if (allProduct === null) return;

            if (checkDataAndFilter(allProduct?.products, allProduct?.totalPage, newFilters, dispatch)
                === updateData
            ) {
                getData(cancelToken);
            }
        }
        handle()

        return () => {
            cancelToken.cancel('Operation canceled by the product.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allProduct])


    const getData = (cancelToken) => {
        const paramsString = queryString.stringify(newFilters);

        if (option === OPTION_PAGE.ENABLED) {
            if (isFilter(newFilters) || newFilters?.status) {
                getSearchProducts(paramsString, accessToken, dispatch, axiosJwt, cancelToken,
                    setErrorForbidden);
            } else {
                setFilters(newFilters);
                getProducts(paramsString, accessToken, dispatch, axiosJwt, page, currentPage,
                    cancelToken);
            }
        }

        if (option === OPTION_PAGE.DISENABLE) {
            if (isFilter(newFilters) || newFilters?.status) {
                getSearchDisenableProducts(paramsString, accessToken, dispatch, axiosJwt,
                    cancelToken, setErrorForbidden);
            } else {
                setFilters(newFilters);
                getDisenableProducts(paramsString, accessToken, dispatch, axiosJwt, page,
                    currentPage, cancelToken);
            }
        }
    }

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        let newData;

        if (value === ALL) {
            newData = allProduct?.products?.map((item) => {
                return { ...item, isChecked: checked }
            })
        } else {
            newData = allProduct?.products?.map((item) =>
                item?.sku === value ? { ...item, isChecked: checked } : item
            );
        }
        dispatch(deleteChangeSelectProducts(newData));
    }

    const handleEditOrEnableClick = (sku) => {

        //on Edit
        if (option === OPTION_PAGE.ENABLED) {
            dispatch(resetFilters());
            navigate('/' + PATH.PRODUCTS + '/' + sku);
            return;
        }

        //on Enabled
        const product = allProduct?.products?.filter((product) => product?.sku === sku);

        if (!isObjectOneValue(product)) return;

        if (option === OPTION_PAGE.DISENABLE) {
            getActions(product[DEFAULT_INDEX]?.name, enable, getEnabledProductBySku, sku);
        }
    }

    const handleDeleteOrDisenableClick = (sku) => {

        const product = allProduct?.products?.filter((product) => product?.sku === sku);

        if (!isObjectOneValue(product)) return;

        // on Disenable
        if (option === OPTION_PAGE.ENABLED) {
            getActions(product[DEFAULT_INDEX]?.name, disenable, getDisenableProductBySku, sku);
        }

    }

    const getActions = (name, optionProduct, api, sku) => {
        const title = `sản phẩm ${name}`;
        Swal.fire(warning(warningTitle(optionProduct, title)))
            .then(async (result) => {
                if (result.isConfirmed) {
                    const data = await api(sku, accessToken, dispatch, navigate, axiosJwt);
                    if (data) {
                        Swal.fire(success(`${data}${title}.`));
                    }
                }
            })
    }

    if (error && !(!msg.trim())) return <Forbidden msg={msg} />

    return (
        <>
            <div className='card-body pt-0'>
                <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                    <div className='table-responsive'>
                        <Table className={`dataTable no-footer ${styles.products}`}>
                            <Thead>
                                <th className='w-10px'>
                                    <CheckBox
                                        value={ALL}
                                        onChange={(e) => handleChangSelected(e)}
                                        checked={isLengthChecked(allProduct?.products)}
                                    />
                                </th>
                                <th className='min-w-25px'>Số thứ tự</th>
                                <SortName
                                    sortDir={newFilters?.sortDir}
                                    sortField={newFilters?.sortField}
                                    sortFilter={sortFilterName}
                                    setSortFilter={setSortFilterName}
                                    name={PRODUCT_SORT_FIELD.NAME}
                                    className={'min-w-200px'}
                                    title={'Tên sản phẩm'}
                                />
                                <SortName
                                    sortDir={newFilters?.sortDir}
                                    sortField={newFilters?.sortField}
                                    sortFilter={sortFilterPrice}
                                    setSortFilter={setSortFilterPrice}
                                    name={PRODUCT_SORT_FIELD.PRICE}
                                    className={'min-w-80px'}
                                    title={'Giá'}
                                />
                                <th className='min-w-125px'>Kí hiệu</th>
                                <th className='min-w-125px'>Status</th>
                                <th className='text-end min-w-70px sorting_disabled'>Actions</th>
                            </Thead>
                            <Tbody data={allProduct?.products}>
                                {
                                    (product, index) => <tr key={index}>
                                        <td>
                                            <CheckBox
                                                value={product?.sku}
                                                checked={product?.isChecked}
                                                onChange={(e) => handleChangSelected(e)}
                                            />
                                        </td>
                                        <td>{ordinalNumbers(index, newFilters?.limit, newFilters?.page)}</td>
                                        <td>
                                            <div className='d-flex align-items-center text-truncate'
                                                onClick={() => {
                                                    if (option === OPTION_PAGE.ENABLE) {
                                                        handleEditOrEnableClick(product?.sku);
                                                    }
                                                }}
                                            >
                                                <div className='symbol symbol-50px bg-hover-body'
                                                >
                                                    <span className='symbol-label'
                                                        style={{ backgroundImage: `url(${product?.image})` }}
                                                    ></span>
                                                </div>
                                                <div className='ms-5 bg-hover-body'>
                                                    <div className='text-gray-800 text-hover-primary fs-5 fw-bold'>
                                                        {product?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{conversionNumberToVND(product?.price)}</td>
                                        <td>{product?.sku}</td>
                                        <td>
                                            <div className={`badge ${getClassNameStatus(product?.status)}`}>
                                                {product?.status}
                                            </div>
                                        </td>
                                        <td className='text-end'>
                                            <Actions
                                                title={getTitleAction(option)}
                                                onEditOrEnableClick={() => handleEditOrEnableClick(product?.sku)}
                                                onDeleteOrDisenableClick={() => handleDeleteOrDisenableClick(product?.sku)}
                                            />
                                        </td>
                                    </tr>
                                }
                            </Tbody>
                        </Table>
                    </div>
                    <LimitAndPagination
                        options={OPTION_LIMIT}
                        value={newFilters?.limit.toString()}
                        currentPage={newFilters?.page}
                        totalPage={allProduct?.totalPage}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList;
