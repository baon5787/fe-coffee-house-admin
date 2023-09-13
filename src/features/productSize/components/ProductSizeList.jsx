import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import useTable from '~/hooks/useTable';
import { deleteProductSize, getProductsSizes, getSearchProductsSizes } from '../services/ApiProductSize';
import { useSelector } from 'react-redux';
import { errorProductSizeSelector, productSizeSelector, titleErrorProductSizeSelector } from '~/redux/selectors';
import { isUpdateData, ordinalNumbers } from '~/utils/HandleTable';
import { Actions } from '~/components/actions';
import { DEFAULT_INDEX, OPTION_LIMIT, PRODUCT_SIZE_SORT_FIELD } from '~/constants/AppConstant';
import style from '../style/ProductSize.module.css'
import { isFilter, isObjectOneValue } from '~/utils/CheckValue';
import { Forbidden } from '~/components/error';
import { updateFilters } from '~/redux/slice/FiltersSlice';
import { getTitleDeleteProductSize, warningTitle } from '~/utils/StringConcatention';
import { erase } from '~/helper/AppString';
import Swal from 'sweetalert2';
import { success, warning } from '~/components/swal/Swal';
import { LimitAndPagination, Table, Tbody, Thead } from '~/components/table';
import { getSortDir } from '~/utils/HandleValue';
import { SortName } from '~/components/filters';

const ProductSizeList = ({ onUpdate }) => {

    const allProductSize = useSelector(productSizeSelector);

    const error = useSelector(errorProductSizeSelector);

    const msg = useSelector(titleErrorProductSizeSelector);

    const { dispatch, navigate, accessToken, page, axiosJwt, newFilters, currentPage } = useTable();

    const [sortFilterQuantity, setSortFilterQuantity] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, PRODUCT_SIZE_SORT_FIELD.QUANTITY));

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
            cancelToken.cancel('Operation canceled by the product size.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters])

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {

            if (!accessToken) return;

            if (allProductSize === null) return;

            if (isUpdateData(allProductSize?.productsSizes, allProductSize?.totalPage, newFilters,
                dispatch)) {
                getData(cancelToken);
            }
        }
        handle()

        return () => {
            cancelToken.cancel('Operation canceled by the product size.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allProductSize])


    const getData = (cancelToken) => {
        const paramsString = queryString.stringify(newFilters);

        if (isFilter(newFilters)) {
            getSearchProductsSizes(paramsString, cancelToken, accessToken, dispatch,
                axiosJwt, setErrorForbidden);
        } else {
            setFilters(newFilters);
            getProductsSizes(paramsString, cancelToken, accessToken, dispatch, axiosJwt,
                page, currentPage);
        }
    }

    const handleEdit = (value) => {
        if (!onUpdate || !value.productId || !value.sizeId) return;

        onUpdate(value);
    }

    const handleDelete = (value) => {
        if (!value.productId || !value.sizeId) return;

        const productSize = allProductSize?.productsSizes?.filter((productSize) =>
            productSize?.productId === value?.productId && productSize?.sizeId === value?.sizeId);
        if (!isObjectOneValue(productSize)) return;

        const title = getTitleDeleteProductSize(productSize[DEFAULT_INDEX]);

        Swal.fire(warning(warningTitle(erase, title)))
            .then(async (result) => {
                if (result.isConfirmed) {
                    const data = await deleteProductSize(value?.productId, value?.sizeId, accessToken,
                        dispatch, navigate, axiosJwt);
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
                    <Table className={`dataTable no-footer ${style.product_size}`}>
                        <Thead>
                            <th className='min-w-25px'>Số thứ tự</th>
                            <th className='min-w-125px sorting'>Tên sản phẩm</th>
                            <th className='min-w-125px sorting'>Tên kích thước sản phẩm</th>
                            <SortName
                                sortDir={newFilters?.sortDir}
                                sortField={newFilters?.sortField}
                                sortFilter={sortFilterQuantity}
                                setSortFilter={setSortFilterQuantity}
                                name={PRODUCT_SIZE_SORT_FIELD.QUANTITY}
                                className={'min-w-80px'}
                                title={'Số lượng'}
                            />
                            <th className='text-end min-w-70px sorting_disabled'>Actions</th>
                        </Thead>
                        <Tbody data={allProductSize?.productsSizes}>
                            {
                                (productSize, index) => <tr key={index}>
                                    <td>{ordinalNumbers(index, newFilters?.limit, newFilters?.page)}</td>
                                    <td>{productSize.productName}</td>
                                    <td>{productSize.sizeName}</td>
                                    <td>{productSize.quantity}</td>
                                    <td className='text-end'>
                                        <Actions
                                            title={"Edit"}
                                            onEditOrEnableClick={() => handleEdit({
                                                productId: productSize.productId,
                                                sizeId: productSize.sizeId
                                            })}
                                            onDeleteOrDisenableClick={() => handleDelete({
                                                productId: productSize.productId,
                                                sizeId: productSize.sizeId
                                            })}
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
                        totalPage={allProductSize?.totalPage}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductSizeList;
