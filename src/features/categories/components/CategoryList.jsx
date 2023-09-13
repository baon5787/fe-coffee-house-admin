import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { ALL, CATEGORY_SORT_FIELD, DEFAULT_INDEX, OPTION_LIMIT, OPTION_PAGE } from '~/constants/AppConstant';
import { categoriesSelector, errorCategorySelector, titleErrorCategorySelector } from '~/redux/selectors';
import {
    deleteCategoryByCode, getDisenableCategories, getDisenableParentCategory,
    getDisenableSubCategory, getEnableCategoryByCode, getParentCategories, getSearchDisenableCategories,
    getSearchParentCategories, getSearchSubCategories, getSubCategories, getTitleDeleteCategory
} from '../services/ApiCategories';
import {
    checkDataAndFilter, getClassNameStatus, getTitleAction,
    isLengthChecked, ordinalNumbers,
} from '~/utils/HandleTable';
import { SortName } from '~/components/filters';
import { deleteChangeSelectCategories } from '~/redux/slice/CategorySlice';
import { CheckBox, LimitAndPagination, Table, Tbody, Thead } from '~/components/table';
import { disenable, enable, updateData } from '~/helper/AppString';
import Swal from 'sweetalert2';
import { success } from '~/components/swal/Swal';
import { getTitleEnableCategory, getTitleParentCategory } from '~/utils/StringConcatention';
import { getNameBySelect, getSortDir } from '~/utils/HandleValue';
import { erase } from '~/helper/AppString';
import useTable from '~/hooks/useTable';
import style from '../style/Category.module.css';
import useStatus from '~/hooks/useStatus';
import { isFilter, isObjectOneValue, isValueUndefined } from '~/utils/CheckValue';
import { Forbidden } from '~/components/error';
import { updateFilters } from '~/redux/slice/FiltersSlice';
import { getAction } from '~/utils/HandleAction';
import Action from '~/components/action';

const CategoryList = ({ option, onUpdate }) => {

    const allCategory = useSelector(categoriesSelector);

    const error = useSelector(errorCategorySelector);

    const msg = useSelector(titleErrorCategorySelector);

    const { dispatch, navigate, accessToken, page, axiosJwt, newFilters, currentPage } = useTable();

    const { allStatus } = useStatus(accessToken, dispatch, axiosJwt);

    const [sortFilterName, setSortFilterName] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, CATEGORY_SORT_FIELD.NAME));

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
            cancelToken.cancel('Operation canceled by the category.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters]);


    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {

            if (!accessToken) return;

            if (allCategory === null) return;

            if (checkDataAndFilter(allCategory?.categories, allCategory?.totalPage, newFilters, dispatch)
                === updateData
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
                getSearchSubCategories(paramsString, accessToken, dispatch, axiosJwt, cancelToken,
                    setErrorForbidden);
            } else {
                setFilters(newFilters);
                getSubCategories(paramsString, accessToken, dispatch, axiosJwt, page,
                    currentPage, cancelToken);
            }
            return;
        }

        if (option === OPTION_PAGE.DISENABLE) {
            if (isFilter(newFilters) || newFilters?.status) {
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

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        let newData;

        if (value === ALL) {
            newData = allCategory?.categories?.map((category) => {
                return { ...category, isChecked: checked }
            })
        } else {
            newData = allCategory?.categories?.map((category) =>
                category?.code === value ? { ...category, isChecked: checked } : category
            );
        }
        dispatch(deleteChangeSelectCategories(newData));
    }

    const handleEditOrEnableClick = (code) => {

        const category = allCategory?.categories?.filter((category) => category?.code === code);

        if (!isObjectOneValue(category)) return;

        if (option !== OPTION_PAGE.DISENABLE && onUpdate) {
            onUpdate(code);
        }

        if (option === OPTION_PAGE.DISENABLE && !onUpdate) {
            const title = getTitleEnableCategory(category[DEFAULT_INDEX]);

            getAction(getEnableCategoryByCode, code, enable, title, dispatch, navigate,
                axiosJwt, accessToken);
        }

    }

    const handleDeleteOrDisenableClick = async (code) => {

        const category = allCategory?.categories?.filter((category) => category?.code === code);

        if (!isObjectOneValue(category)) return;

        // On Disenable Parent
        if (option === OPTION_PAGE.PARENT) {

            const title = getTitleParentCategory(category[DEFAULT_INDEX]);

            getAction(getDisenableParentCategory, code, disenable, title, dispatch, navigate,
                axiosJwt, accessToken);
        }

        // On Disenable Sub
        if (option === OPTION_PAGE.SUB) {

            const title = ` danh mục con ${category[DEFAULT_INDEX]?.name}`;

            getAction(getDisenableSubCategory, code, disenable, title, dispatch, navigate,
                axiosJwt, accessToken);
        }

        // On Delete Category
        if (option === OPTION_PAGE.DISENABLE) {

            const data = await getTitleDeleteCategory(code, accessToken, dispatch, navigate,
                axiosJwt);

            if (isValueUndefined(data?.delete)) return;

            if (data?.delete) {
                getAction(deleteCategoryByCode, code, erase, data?.title, dispatch, navigate,
                    axiosJwt, accessToken);
            } else {
                Swal.fire(success(data?.title));
            }
        }

    }

    if (error && !(!msg.trim())) return <Forbidden msg={msg} />

    return (
        <>
            <div className='card-body p-10'>
                <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                    <Table className={`dataTable no-footer ${style.category}`}>
                        <Thead>
                            <th className='w-10px'>
                                <CheckBox
                                    value={"ALL"}
                                    onChange={(e) => handleChangSelected(e)}
                                    checked={isLengthChecked(allCategory?.categories)}
                                />
                            </th>
                            <th className='min-w-25px'>Số thứ tự</th>
                            <SortName
                                sortDir={newFilters?.sortDir}
                                sortField={newFilters?.sortField}
                                sortFilter={sortFilterName}
                                setSortFilter={setSortFilterName}
                                name={CATEGORY_SORT_FIELD.NAME}
                                className={'min-w-200px'}
                                title={'Tên loại sản phẩm'}
                            />
                            <th className='min-w-80px'>Trạng thái</th>
                            <th className='min-w-200px'>
                                {option === OPTION_PAGE.PARENT ? 'Tên loại danh mục con' : 'Tên loại danh mục cha'}
                            </th>
                            <th className='text-end min-w-70px sorting_disabled'>Actions</th>
                        </Thead>
                        <Tbody data={allCategory?.categories}>
                            {
                                (category, index) => <tr key={index}>
                                    <td>
                                        <CheckBox
                                            value={category?.code}
                                            checked={category?.isChecked}
                                            onChange={(e) => handleChangSelected(e)}
                                        />
                                    </td>
                                    <td>{ordinalNumbers(index, newFilters?.limit, newFilters?.page)}</td>
                                    <td>
                                        <div className="text-gray-600 text-hover-primary mb-1 bg-hover-body"
                                            onClick={() => {
                                                if (option !== OPTION_PAGE.DISENABLE) {
                                                    return handleEditOrEnableClick(category?.code)
                                                }
                                            }}
                                        >
                                            {category?.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`badge ${getClassNameStatus(category?.status)}`}>
                                            {getNameBySelect(allStatus, category?.status)}
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            option !== OPTION_PAGE.PARENT
                                                ? category?.parent
                                                : category?.children?.reduce(
                                                    (currentStr, item, index) => currentStr += (index !== DEFAULT_INDEX ? `, ${item}` : `${item}`)
                                                    , '')
                                        }
                                    </td>
                                    <td className='text-end'>
                                        <Action
                                            title={getTitleAction(option)}
                                            onEditOrEnableClick={() => handleEditOrEnableClick(category?.code)}
                                            onDeleteOrDisenableClick={() => handleDeleteOrDisenableClick(category?.code)}
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
                        totalPage={allCategory?.totalPage}
                    />
                </div>
            </div>
        </>
    )
}

export default CategoryList;
