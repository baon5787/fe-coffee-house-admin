import React from 'react'
import PropTypes from 'prop-types';
import { ALL, DEFAULT_FILTERS, DEFAULT_INDEX, OPTION_PAGE } from '~/constants/AppConstant'
import { categoriesSelector } from '~/redux/selectors';
import { useSelector } from 'react-redux';
import { deleteChangeSelectCategories } from '~/redux/slice/CategorySlice';
import useJwt from '~/hooks/useJwt';
import { getTitleEnableCategory, getTitleParentCategory } from '~/utils/StringConcatention';
import { deleteCategoryByCode, getDisenableParentCategory, getDisenableSubCategory, getEnableCategoryByCode, getTitleDeleteCategory } from '../services/ApiCategories';
import { disenable, enable, erase } from '~/helper/AppString';
import { isEmptyArray, isObjectOneValue, isValueUndefined } from '~/utils/CheckValue';
import { success } from '~/components/swal/Swal';
import Swal from 'sweetalert2';
import { getAction } from '~/utils/HandleAction';
import { CheckboxTable, NotData, Tbody, Thead } from '~/components/table';
import { getClassNameStatus, getTitleAction, isLengthChecked } from '~/utils/HandleTable';
import Actions from '~/components/actions/Actions';

const TableCategory = ({ option, onUpdate }) => {

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const allCategory = useSelector(categoriesSelector);

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        if (isEmptyArray(allCategory?.categories)) return;

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

        const category = allCategory?.categories?.filter(
            (category) => category?.code === code
        );

        if (!isObjectOneValue(category)) return;

        if (option !== OPTION_PAGE.DISENABLE && onUpdate) {
            onUpdate('code');
        }

        if (option === OPTION_PAGE.DISENABLE && !onUpdate) {
            const title = getTitleEnableCategory(category[DEFAULT_INDEX]);

            getAction(getEnableCategoryByCode, code, enable, title, dispatch, navigate,
                axiosJwt, accessToken);
        }

    }

    const handleDeleteOrDisenableClick = async (code) => {

        const category = allCategory?.categories?.filter(
            (category) => category?.code === code
        );

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
                getAction(deleteCategoryByCode, code, erase, data?.title, dispatch,
                    navigate, axiosJwt, accessToken);
            } else {
                Swal.fire(success(data?.title));
            }
        }

    }

    console.log('a');

    return (
        <>
            <Thead>
                <th>
                    <CheckboxTable
                        className={'!items-start !mt-1'}
                        value={ALL}
                        onChange={(e) => handleChangSelected(e)}
                        checked={isLengthChecked(allCategory?.categories)}
                    />
                </th>
                <th className='min-w-[250px]'>Tên loại sản phẩm</th>
                <th className='!text-right min-w-[100px]'>Trạng thái</th>
                <th className='!text-right min-w-[100px]'>
                    {
                        option === OPTION_PAGE.PARENT
                            ? 'Tên loại danh mục con'
                            : 'Tên loại danh mục cha'
                    }
                </th>
                <th className='!text-right min-w-[100px]'>Actions</th>
            </Thead>
            {
                isEmptyArray(allCategory?.categories) && allCategory?.totalPage < DEFAULT_FILTERS.page
                    ? (
                        <NotData
                            title={'No data available in table'}
                            colspan={5}
                        />
                    )
                    : (
                        <Tbody data={allCategory?.categories}>
                            {
                                (category, index) => <tr key={index}>
                                    <td>
                                        <CheckboxTable
                                            className={'!items-start !mt-1'}
                                            onChange={(e) => handleChangSelected(e)}
                                            checked={category?.isChecked}
                                            value={category?.code}
                                        />
                                    </td>
                                    <td>
                                        <span className='text-text-gray-800'>
                                            {category?.name}
                                        </span>
                                    </td>
                                    <td className='text-right pr-0'>
                                        <div className={`bage ${getClassNameStatus(category?.status)}`}>
                                            {category?.status}
                                        </div>
                                    </td>
                                    <td className='text-right pr-0'>
                                        <span className='font-semibold'>
                                            {
                                                option !== OPTION_PAGE.PARENT
                                                    ? category?.parent
                                                    : category?.children?.reduce(
                                                        (currentStr, item, index) =>
                                                            currentStr += (index !== DEFAULT_INDEX
                                                                ? `, ${item}`
                                                                : `${item}`
                                                            ), '')
                                            }
                                        </span>
                                    </td>
                                    <td className='text-end'>
                                        <Actions
                                            title={getTitleAction(option)}
                                            onEditOrEnableClick={() => handleEditOrEnableClick(category?.code)}
                                            onDeleteOrDisenableClick={() => handleDeleteOrDisenableClick(category?.code)}
                                        />
                                    </td>
                                </tr>
                            }
                        </Tbody>
                    )
            }
        </>
    )
}

TableCategory.propTypes = {
    option: PropTypes.oneOf([OPTION_PAGE.PARENT, OPTION_PAGE.SUB, OPTION_PAGE.DISENABLE])
        .isRequired,
    onUpdate: PropTypes.func
}

export default TableCategory