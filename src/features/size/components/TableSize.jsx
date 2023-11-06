import React from 'react'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useJwt from '~/hooks/useJwt';
import { ALL, DEFAULT_INDEX, OPTION_PAGE } from '~/constants/AppConstant';
import { sizesSelector } from '~/redux/selectors';
import { isEmptyArray, isNotData, isObjectOneValue } from '~/utils/CheckValue';
import { deleteSize, getDisenableSizeByCode, getEnableSizeByCode } from '../services/ApiSize';
import { disenable, enable, erase } from '~/helper/AppString';
import { getAction } from '~/utils/HandleAction';
import { deleteChangeSelectSizes } from '~/redux/slice/SizeSlice';
import { CheckboxTable, NotData, Table, Tbody, Thead } from '~/components/table';
import { conversionNumberToVND, getTitleAction, isLengthChecked, ordinalNumbers } from '~/utils/HandleTable';
import { Actions } from '~/components/actions';

const TableSize = ({ option, onUpdate }) => {

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const allSize = useSelector(sizesSelector);

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
            getAction(deleteSize, code, erase, title, dispatch, navigate, axiosJwt,
                accessToken);
        }
    }

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        if (isEmptyArray(allSize?.sizes)) return;

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

    console.log(allSize);

    return (
        <>
            <Table className={'dataTable text-6 align-middle'}>
                <Thead>
                    <th>
                        <CheckboxTable
                            className={'!items-start !mt-1'}
                            value={ALL}
                            onChange={(e) => handleChangSelected(e)}
                            checked={isLengthChecked(allSize?.sizes)}
                        />
                    </th>
                    <th className='min-w-[25px]'>Stt</th>
                    <th className='min-w-[250px]'>Tên kích thước sản phẩm</th>
                    <th className='!text-right min-w-[200px]'>Mã kích thước sản phẩm</th>
                    <th className='!text-right min-w-[100px]'>Giá kích thước sản phẩm</th>
                    <th className='!text-right min-w-[100px]'>Actions</th>
                </Thead>
                {
                    isNotData(allSize?.sizes) ? (
                        <NotData
                            title={'No data available in table'}
                            colspan={6}
                        />
                    ) : (
                        <Tbody data={allSize?.sizes}>
                            {
                                (size, index) => <tr key={index}>
                                    <td>
                                        <CheckboxTable
                                            className={'!items-start !mt-1'}
                                            onChange={(e) => handleChangSelected(e)}
                                            checked={size?.isChecked}
                                            value={size?.code}
                                        />
                                    </td>
                                    <td>
                                        {ordinalNumbers(index, 1, 1)}
                                    </td>
                                    <td>
                                        <span className='truncate text-text-gray-600 hover:text-text-theme-primary mb-1'
                                        >
                                            {size?.name}
                                        </span>
                                    </td>
                                    <td className='text-right pr-0'>
                                        <span className='font-semibold'>
                                            {size?.code}
                                        </span>
                                    </td>
                                    <td className='text-right pr-0'>
                                        <span className='font-semibold'>
                                            {conversionNumberToVND(size?.price)}
                                        </span>
                                    </td>
                                    <td className='text-end'>
                                        <Actions
                                            title={getTitleAction(option)}
                                            onEditOrEnableClick={() => handleEditOrEnableClick(size?.code)}
                                            onDeleteOrDisenableClick={() => handleDeleteOrDisenableClick(size?.code)}
                                        />
                                    </td>
                                </tr>
                            }
                        </Tbody>
                    )
                }
            </Table>
        </>
    )
}

TableSize.propTypes = {
    option: PropTypes.oneOf([OPTION_PAGE.ENABLED, OPTION_PAGE.DISENABLE]).isRequired,
    onUpdate: PropTypes.func
}

export default TableSize