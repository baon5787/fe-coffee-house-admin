import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import useTable from '~/hooks/useTable';
import {
    errorSizeSelector, sizesSelector, titleErrorSizeSelector
} from '~/redux/selectors';
import {
    getDisenableSizes, getSearchDisenableSizes, getSearchSizes, getSizes
} from '../services/ApiSize';
import { updateFilters } from '~/redux/slice/FiltersSlice';
import { isData, isEmptyArray, isError, isFilter } from '~/utils/CheckValue';
import { checkDataAndFilter } from '~/utils/HandleTable';
import { OPTION_LIMIT, OPTION_PAGE } from '~/constants/AppConstant';
import { Forbidden } from '~/components/error';
import { LimitAndPagination } from '~/components/table';

const SizeList = ({ option, children }) => {

    const allSize = useSelector(sizesSelector);

    const [errorForbidden, setErrorForbidden] = useState(false);

    const [filters, setFilters] = useState();

    const msg = useSelector(titleErrorSizeSelector);

    const error = isError(useSelector(errorSizeSelector), msg);

    const { dispatch, accessToken, page, axiosJwt, newFilters, currentPage } = useTable();

    useEffect(() => {
        if (errorForbidden && filters) {
            console.log(filters);
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
            cancelToken.cancel('Operation canceled by the size.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters])

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {

            if (!accessToken) return;

            if (isData(allSize)) return;

            if (checkDataAndFilter(allSize?.sizes, allSize?.totalPage, newFilters,
                dispatch)
            ) {
                getData(cancelToken);
            }
        }
        handle()

        return () => {
            cancelToken.cancel('Operation canceled by the size.')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSize])

    const getData = (cancelToken) => {

        const paramsString = queryString.stringify(newFilters);

        if (option === OPTION_PAGE.ENABLED) {
            if (isFilter(newFilters)) {
                getSearchSizes(paramsString, accessToken, dispatch, axiosJwt, cancelToken,
                    setErrorForbidden);
            } else {
                setFilters(newFilters);
                getSizes(paramsString, cancelToken, accessToken, dispatch, axiosJwt, page,
                    currentPage);
            }
        }

        if (option === OPTION_PAGE.DISENABLE) {
            if (isFilter(newFilters)) {
                getSearchDisenableSizes(paramsString, accessToken, dispatch, axiosJwt,
                    cancelToken, setErrorForbidden);
            } else {
                setFilters(newFilters);
                getDisenableSizes(paramsString, cancelToken, accessToken, dispatch,
                    axiosJwt, page, currentPage);
            }
        }
    }

    if (error) return <Forbidden msg={msg} />

    console.log(allSize)

    if (isEmptyArray(allSize)) return;

    console.log(allSize)

    return (
        <>
            {children}
            <LimitAndPagination
                options={OPTION_LIMIT}
                value={newFilters?.limit.toString()}
                currentPage={newFilters?.page}
                totalPage={allSize?.sizes}
            />
        </>
    );
}

SizeList.propTypes = {
    option: PropTypes.oneOf([OPTION_PAGE.ENABLED, OPTION_PAGE.DISENABLE]).isRequired,
    children: PropTypes.element.isRequired,
}

export default SizeList