import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'
import PropTypes from 'prop-types';
import useTable from '~/hooks/useTable'
import { LimitAndPagination, Table } from '~/components/table'
import { OPTION_LIMIT, OPTION_PAGE } from '~/constants/AppConstant'
import { errorProductSelector, productsSelector, titleErrorProductSelector } from '~/redux/selectors'
import { updateFilters } from '~/redux/slice/FiltersSlice'
import { isEmptyArray, isFilter } from '~/utils/CheckValue'
import {
    getDisenableProducts, getProducts, getSearchDisenableProducts,
    getSearchProducts
} from '../services/ApiProduct'
import { checkDataAndFilter } from '~/utils/HandleTable'
import { Forbidden } from '~/components/error'

const ProductList = ({ option, children }) => {

    const allProduct = useSelector(productsSelector);

    const [errorForbidden, setErrorForbidden] = useState(false);

    const [filters, setFilters] = useState();

    const error = useSelector(errorProductSelector);

    const msg = useSelector(titleErrorProductSelector);

    const { dispatch, accessToken, page, axiosJwt, newFilters, currentPage } = useTable();

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

            if (checkDataAndFilter(allProduct?.products, allProduct?.totalPage, newFilters,
                dispatch)
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

    if (error && !(!msg.trim())) return <Forbidden msg={msg} />

    if (isEmptyArray(allProduct)) return;

    return (
        <>
            <Table className={'dataTable text-6 align-middle'}>
                {children}
            </Table>
            <LimitAndPagination
                options={OPTION_LIMIT}
                value={newFilters?.limit.toString()}
                currentPage={newFilters?.page}
                totalPage={allProduct?.totalPage}
            />
        </>
    )
}

ProductList.propTypes = {
    option: PropTypes.oneOf([OPTION_PAGE.ENABLED, OPTION_PAGE.DISENABLE]).isRequired,
}

export default ProductList