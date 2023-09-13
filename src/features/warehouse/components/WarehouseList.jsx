import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DEFAULT_INDEX, OPTION_LIMIT, PRODUCT_SIZE_SORT_FIELD } from '~/constants/AppConstant';
import useTable from '~/hooks/useTable';
import { getErrorWarehouse, warehouseSelector } from '~/redux/selectors';
import { updateFilters } from '~/redux/slice/FiltersSlice';
import { isEmptyArray, isFilter, isObjectOneValue } from '~/utils/CheckValue';
import { isUpdateData, ordinalNumbers } from '~/utils/HandleTable';
import { getSortDir } from '~/utils/HandleValue';
import { deleteWarehouse, getSearchWarehouses, getWarehouses } from '../services/ApiWarehouse';
import { Forbidden } from '~/components/error';
import { LimitAndPagination, Table, Tbody, Thead } from '~/components/table';
import style from '../style/Warehouse.module.css'
import { SortName } from '~/components/filters';
import { Actions } from '~/components/actions';
import { getTitleDeleteWarehouse, warningTitle } from '~/utils/StringConcatention';
import Swal from 'sweetalert2';
import { success, warning } from '~/components/swal/Swal';
import { erase } from '~/helper/AppString';

const WarehouseList = ({ onUpdate }) => {

    const allWarehouse = useSelector(warehouseSelector);

    const { dispatch, navigate, accessToken, page, axiosJwt, newFilters, currentPage } = useTable();

    const error = useSelector(getErrorWarehouse);

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

            if (allWarehouse === null || !allWarehouse || isEmptyArray(allWarehouse)) return;

            if (isUpdateData(allWarehouse?.warehouses, allWarehouse?.totalPage, newFilters,
                dispatch)) {
                getData(cancelToken);
            }
        }
        handle()

        return () => {
            cancelToken.cancel('Operation canceled by the product size.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allWarehouse])

    const getData = (cancelToken) => {
        const paramsString = queryString.stringify(newFilters);

        if (isFilter(newFilters)) {
            getSearchWarehouses(paramsString, cancelToken, accessToken, dispatch,
                axiosJwt, setErrorForbidden);
        } else {
            setFilters(newFilters);
            getWarehouses(paramsString, cancelToken, accessToken, dispatch, axiosJwt,
                page, currentPage);
        }
    }

    const handleEdit = (value) => {
        if (!onUpdate || !value.productId || !value.sizeId) return;

        onUpdate(value);
    }


    const handleDelete = (value) => {
        if (!value.productId || !value.sizeId) return;

        const warehouse = allWarehouse?.warehouses?.filter((warehouse) =>
            warehouse?.productId === value?.productId && warehouse?.sizeId === value?.sizeId);
        if (!isObjectOneValue(warehouse)) return;

        const title = getTitleDeleteWarehouse(warehouse[DEFAULT_INDEX]);

        Swal.fire(warning(warningTitle(erase, title)))
            .then(async (result) => {
                if (result.isConfirmed) {
                    const data = await deleteWarehouse(value?.productId, value?.sizeId,
                        accessToken, dispatch, navigate, axiosJwt);
                    if (data) {
                        Swal.fire(success(`${data}${title}.`));
                    }
                }
            })
    }

    if (error?.isError) return <Forbidden msg={error?.msg} />

    return (
        <div className='card-body pt-0'>
            <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                <Table className={`dataTable no-footer ${style.warehouse}`}>
                    <Thead>
                        <th className='min-w-25px'>Số thứ tự</th>
                        <th className='min-w-125px'>Tên sản phẩm</th>
                        <th className='min-w-125px'>Tên kích thước sản phẩm</th>
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
                    <Tbody data={allWarehouse?.warehouses}>
                        {
                            (warehouse, index) => <tr key={index}>
                                <td>{ordinalNumbers(index, newFilters?.limit, newFilters?.page)}</td>
                                <td>{warehouse.productName}</td>
                                <td>{warehouse.sizeName}</td>
                                <td>{warehouse.quantity}</td>
                                <td className='text-end'>
                                    <Actions
                                        title={"Edit"}
                                        onEditOrEnableClick={() => handleEdit({
                                            productId: warehouse.productId,
                                            sizeId: warehouse.sizeId
                                        })}
                                        onDeleteOrDisenableClick={() => handleDelete({
                                            productId: warehouse.productId,
                                            sizeId: warehouse.sizeId
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
                    totalPage={allWarehouse?.totalPage}
                />
            </div>
        </div>
    )
}

export default WarehouseList;
