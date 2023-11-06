import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useTable from '~/hooks/useTable';
import { updateFilters } from '~/redux/slice/FiltersSlice';
import {
    categoriesSelector, errorCategorySelector, titleErrorCategorySelector
} from '~/redux/selectors';
import {
    getDisenableCategories, getParentCategories, getSearchDisenableCategories,
    getSearchParentCategories, getSearchSubCategories, getSubCategories
} from '../services/ApiCategories';
import { Forbidden } from '~/components/error';
import { LimitAndPagination, Table } from '~/components/table';
import { OPTION_LIMIT, OPTION_PAGE } from '~/constants/AppConstant';
import { isData, isEmptyArray, isFilter } from '~/utils/CheckValue';
import { checkDataAndFilter } from '~/utils/HandleTable';

const CategoryList = ({ option, children }) => {

    const allCategory = useSelector(categoriesSelector);

    const [errorForbidden, setErrorForbidden] = useState(false);

    const [filters, setFilters] = useState();

    const error = useSelector(errorCategorySelector);

    const msg = useSelector(titleErrorCategorySelector);

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
            cancelToken.cancel('Operation canceled by the category.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters])

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {

            if (!accessToken) return;

            if (isData(allCategory)) return;

            if (checkDataAndFilter(allCategory?.categories, allCategory?.totalPage,
                newFilters, dispatch)
            ) {
                getData(cancelToken);
            }
        }
        handle()

        return () => {
            cancelToken.cancel('Operation canceled by the category.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCategory])

    const getData = (cancelToken) => {

        const paramsString = queryString.stringify(newFilters);

        if (option === OPTION_PAGE.PARENT) {
            if (isFilter(newFilters) || newFilters?.status) {
                getSearchParentCategories(paramsString, accessToken, dispatch, axiosJwt,
                    cancelToken, setErrorForbidden);
            } else {
                setFilters(newFilters);
                getParentCategories(paramsString, accessToken, dispatch, axiosJwt, page,
                    currentPage, cancelToken);
            }
            return;
        }

        if (option === OPTION_PAGE.SUB) {
            if (isFilter(newFilters) || newFilters?.status) {
                getSearchSubCategories(paramsString, accessToken, dispatch, axiosJwt,
                    cancelToken, setErrorForbidden);
            } else {
                setFilters(newFilters);
                getSubCategories(paramsString, accessToken, dispatch, axiosJwt, page,
                    currentPage, cancelToken);
            }
            return;
        }

        if (option === OPTION_PAGE.DISENABLE) {
            if (isFilter(newFilters)) {
                getSearchDisenableCategories(paramsString, accessToken, dispatch, axiosJwt,
                    cancelToken, setErrorForbidden);
            } else {
                setFilters(newFilters);
                getDisenableCategories(paramsString, accessToken, dispatch, axiosJwt, page,
                    currentPage, cancelToken);
            }
            return;
        }
        return;
    }

    if (error && !(!msg.trim())) return <Forbidden msg={msg} />

    // console.log(allCategory)

    if (isEmptyArray(allCategory)) return;

    return (
        <>
            <Table className={'dataTable text-6 align-middle'}>
                {children}
            </Table>
            <LimitAndPagination
                options={OPTION_LIMIT}
                value={newFilters?.limit.toString()}
                currentPage={newFilters?.page}
                totalPage={allCategory?.totalPage}
            />
        </>
    )
}

CategoryList.propTypes = {
    option: PropTypes.oneOf([OPTION_PAGE.PARENT, OPTION_PAGE.SUB, OPTION_PAGE.DISENABLE])
        .isRequired,
}

export default CategoryList