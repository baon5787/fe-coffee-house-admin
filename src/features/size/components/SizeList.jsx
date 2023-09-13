import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import useTable from '~/hooks/useTable';
import { useSelector } from 'react-redux';
import { getErrorSize, sizesSelector } from '~/redux/selectors';
import { conversionNumberToVND, ordinalNumbers, isLengthChecked, getTitleAction, isUpdateData } from '~/utils/HandleTable';
import { ALL, DEFAULT_INDEX, OPTION_LIMIT, OPTION_PAGE, SIZE_SORT_FIELD } from '~/constants/AppConstant';
import { Actions } from '~/components/actions';
import { SortName } from '~/components/filters';
import { deleteSize, getDisenableSizeByCode, getDisenableSizes, getEnableSizeByCode, getSearchDisenableSizes, getSearchSizes, getSizes } from '../services/ApiSize';
import { getSortDir } from '~/utils/HandleValue';
import { disenable, enable, erase } from '~/helper/AppString';
import { CheckBox, LimitAndPagination, Table, Tbody, Thead } from '~/components/table';
import { deleteChangeSelectSizes } from '~/redux/slice/SizeSlice';
import style from '../style/Size.module.css'
import { isEmptyArray, isFilter, isObjectOneValue } from '~/utils/CheckValue';
import { Forbidden } from '~/components/error';
import { updateFilters } from '~/redux/slice/FiltersSlice';
import { getAction } from '~/utils/HandleAction';

const SizeList = ({ option, onUpdate }) => {

    const allSize = useSelector(sizesSelector);

    const { dispatch, navigate, accessToken, page, axiosJwt, newFilters, currentPage } = useTable();

    const error = useSelector(getErrorSize);

    const [sortFilterName, setSortFilterName] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, SIZE_SORT_FIELD.NAME));

    const [sortFilterPrice, setSortFilterPrice] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, SIZE_SORT_FIELD.PRICE));

    const [errorForbidden, setErrorForbidden] = useState(false);

    const [filters, setFilters] = useState();

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

            if (allSize === null || !allSize || isEmptyArray(allSize)) return;

            if (isUpdateData(allSize?.sizes, allSize?.totalPage, newFilters, dispatch)) {
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
                getSearchDisenableSizes(paramsString, accessToken, dispatch, axiosJwt, cancelToken,
                    setErrorForbidden);
            } else {
                setFilters(newFilters);
                getDisenableSizes(paramsString, cancelToken, accessToken, dispatch, axiosJwt, page,
                    currentPage);
            }
        }
    }

    const handleEditOrEnableClick = (code) => {
        if (option === OPTION_PAGE.ENABLED && onUpdate) {
            onUpdate(code);
        }

        if (option === OPTION_PAGE.DISENABLE && !onUpdate) {
            const size = allSize?.sizes?.filter((size) => size?.code === code);

            if (!isObjectOneValue(size)) return;

            const title = `kích thước sản phẩm ${size[DEFAULT_INDEX]?.name}`;

            getAction(getEnableSizeByCode, code, enable, title, dispatch, navigate,
                axiosJwt, accessToken);
        }

    }

    const handleDeleteOrDisenableClick = (code) => {

        const size = allSize?.sizes?.filter((size) => size?.code === code);

        if (!isObjectOneValue(size)) return;

        const title = `kích thước sản phẩm ${size[DEFAULT_INDEX]?.name}`

        if (option === OPTION_PAGE.ENABLED) {
            getAction(getDisenableSizeByCode, code, disenable, title, dispatch, navigate,
                axiosJwt, accessToken);
        }

        if (option === OPTION_PAGE.DISENABLE) {
            getAction(deleteSize, code, erase, title, dispatch, navigate, axiosJwt, accessToken);
        }
    }

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        let newData;

        if (value === ALL) {
            newData = allSize?.sizes?.map((size) => {
                return { ...size, isChecked: checked }
            })
        } else {
            newData = allSize?.sizes?.map((size) =>
                size?.code === value ? { ...size, isChecked: checked } : size
            );
        }
        dispatch(deleteChangeSelectSizes(newData));
    }

    if (error?.isError) return <Forbidden msg={error?.msg} />

    return (
        <>
            <div className='card-body pt-0'>
                <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                    <Table className={`dataTable no-footer ${style.size}`}>
                        <Thead>
                            <th className='min-w-25px'>
                                <CheckBox
                                    value={ALL}
                                    onChange={(e) => handleChangSelected(e)}
                                    checked={isLengthChecked(allSize?.sizes)}
                                />
                            </th>
                            <th className='min-w-25px'>Số thứ tự</th>
                            <SortName
                                sortDir={newFilters?.sortDir}
                                sortField={newFilters?.sortField}
                                sortFilter={sortFilterName}
                                setSortFilter={setSortFilterName}
                                name={SIZE_SORT_FIELD.NAME}
                                className={'min-w-125px'}
                                title={'Tên kích thước sản phẩm'}
                            />
                            <th className='min-w-80px'>Mã kích thước sản phẩm</th>
                            <SortName
                                sortDir={newFilters?.sortDir}
                                sortField={newFilters?.sortField}
                                sortFilter={sortFilterPrice}
                                setSortFilter={setSortFilterPrice}
                                name={SIZE_SORT_FIELD.PRICE}
                                className={'min-w-125px'}
                                title={'Giá kích thước sản phẩm'}
                            />
                            <th className='text-end min-w-70px sorting_disabled'>Actions</th>
                        </Thead>
                        <Tbody data={allSize?.sizes}>
                            {
                                (size, index) => <tr key={index}>
                                    <td>
                                        <CheckBox
                                            value={size?.code}
                                            checked={size?.isChecked}
                                            onChange={(e) => handleChangSelected(e)}
                                        />
                                    </td>
                                    <td>
                                        {ordinalNumbers(index, newFilters?.limit, newFilters?.page)}
                                    </td>
                                    <td>
                                        <div className="text-gray-600 text-hover-primary mb-1 bg-hover-body text-truncate"
                                            onClick={() => handleEditOrEnableClick(size?.code)}
                                        >
                                            {size?.name}
                                        </div>
                                    </td>
                                    <td>{size?.code}</td>
                                    <td>{conversionNumberToVND(size?.price)}</td>
                                    <td className='text-end'>
                                        <Actions
                                            onEditOrEnableClick={() => handleEditOrEnableClick(size?.code)}
                                            onDeleteOrDisenableClick={() => handleDeleteOrDisenableClick(size?.code)}
                                            title={getTitleAction(option)}
                                        />
                                    </td>
                                </tr>
                            }
                        </Tbody>
                    </Table>
                    <LimitAndPagination
                        options={OPTION_LIMIT}
                        value={newFilters?.limit.toString()}
                        currentPage={newFilters?.page}
                        totalPage={allSize?.totalPage}
                    />
                </div>
            </div>
        </>
    )
}

export default SizeList;
