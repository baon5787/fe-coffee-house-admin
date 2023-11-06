import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Actions from '~/components/actions/Actions'
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'
import { CheckboxTable, NotData, Tbody, Thead } from '~/components/table'
import { ALL, DEFAULT_FILTERS, DEFAULT_INDEX, OPTION_PAGE } from '~/constants/AppConstant'
import { disenable, enable } from '~/helper/AppString'
import { productsSelector } from '~/redux/selectors'
import { isEmptyArray, isObjectOneValue } from '~/utils/CheckValue'
import { getClassNameStatus, getTitleAction, isLengthChecked } from '~/utils/HandleTable'
import { getDisenableProductBySku, getEnabledProductBySku } from '../services/ApiProduct'
import { resetFilters } from '~/redux/slice/FiltersSlice'
import { deleteChangeSelectProducts } from '~/redux/slice/ProductSlice'
import { success, warning } from '~/components/swal/Swal'
import { warningTitle } from '~/utils/StringConcatention'
import useJwt from '~/hooks/useJwt'
import { PATH } from '~/constants/Paths'

const TableProduct = ({ option }) => {

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const allProduct = useSelector(productsSelector);

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
            getActions(product[DEFAULT_INDEX]?.name, disenable, getDisenableProductBySku,
                sku);
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

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        if (isEmptyArray(allProduct?.products)) return;

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

    if (isEmptyArray(allProduct)) return;

    return (
        <>
            <Thead>
                <th>
                    <CheckboxTable
                        className={'!items-start !mt-1'}
                        value={ALL}
                        onChange={(e) => handleChangSelected(e)}
                        checked={isLengthChecked(allProduct?.products)}
                    />
                </th>
                <th className='min-w-[250px]'>Tên sản phẩm</th>
                <th className='!text-right min-w-[200px]'>Giá</th>
                <th className='!text-right min-w-[100px]'>Kí hiệu</th>
                <th className='!text-right min-w-[100px]'>Status</th>
                <th className='!text-right min-w-[100px]'>Actions</th>
            </Thead>
            {
                isEmptyArray(allProduct?.products) && allProduct?.totalPage < DEFAULT_FILTERS.page
                    ? (
                        <NotData
                            title={'No data available in table'}
                            colspan={6}
                        />
                    )
                    : (
                        <Tbody data={allProduct?.products}>
                            {
                                (product, index) => <tr key={index}>
                                    <td>
                                        <CheckboxTable
                                            className={'!items-start !mt-1'}
                                            onChange={(e) => handleChangSelected(e)}
                                            checked={product?.isChecked}
                                            value={product?.sku}
                                        />
                                    </td>
                                    <td>
                                        <div className='flex items-center'>
                                            <Link className='symbol'>
                                                <img src={product?.image} alt="" className='w-[50px] h-[50px] rounded-base' />
                                            </Link>
                                            <div className='ml-5'>
                                                <Link className='text-text-gray-800 font-semibold text-5 transition-color-2-ease hover:text-text-theme-primary'>
                                                    {product?.name}
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-right pr-0'>
                                        <span className='font-semibold'>{product?.sku}</span>
                                    </td>
                                    <td className='text-right pr-0'>
                                        <span className='font-semibold'>{product?.price}</span>
                                    </td>
                                    <td className='text-right pr-0'>
                                        <div className={`bage ${getClassNameStatus(product?.status)}`}>
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
                    )
            }
        </>
    )
}

TableProduct.propTypes = {
    option: PropTypes.oneOf([OPTION_PAGE.ENABLED, OPTION_PAGE.DISENABLE]).isRequired,
}

export default memo(TableProduct)