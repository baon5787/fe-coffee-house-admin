import axios from 'axios';
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import useTable from '~/hooks/useTable';
import { orderSelector } from '~/redux/selectors';
import { getOrders, getSearchOrders } from '../services/ApiOrder';
import queryString from 'query-string';
import { conversionNumberToVND, formatDateTime, ordinalNumbers } from '~/utils/HandleTable';
import { Actions } from '~/components/actions';
import { Limit, Pagination } from '~/components/filters';
import { OPTION_LIMIT } from '~/constants/AppConstant';

const OrderList = () => {

    const allOrder = useSelector(orderSelector);

    const { dispatch, navigate, user, page, axiosJwt, newFilters, currentPage } = useTable();

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {
            if (!user?.accessToken) return;

            getData(cancelToken);

        }
        handle();
        return () => {
            cancelToken.cancel('Operation canceled by the user.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters])

    const getData = (cancelToken) => {

        const paramsString = queryString.stringify(newFilters);

        if ((newFilters?.time_start && newFilters?.time_ended) || newFilters?.title_like ||
            newFilters?.status) {
            getSearchOrders(paramsString, user?.accessToken, dispatch, axiosJwt, cancelToken);
        } else {
            getOrders(paramsString, cancelToken, user?.accessToken, dispatch, axiosJwt, page,
                currentPage);
        }
    }

    const handleView = (param) => {
        navigate(`details/${param}`);
    };

    const handleDelete = (param) => { }

    return (
        <>
            <div className='card-body pt-0'>
                <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                    <div className='table-responsive'>
                        <table className={`table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer `}>
                            <thead>
                                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                    <th className='min-w-25px'>Stt</th>
                                    <th className='min-w-80px sorting'>Mã đơn hàng</th>
                                    <th className='min-w-80px'>Khách hàng</th>
                                    <th className='min-w-80px'>Trạng thái</th>
                                    <th className='min-w-80px'>Tổng tiền</th>
                                    <th className='min-w-80px'>Thời gian tạo</th>
                                    <th className='min-w-80px'>Thời gian hoàn thành</th>
                                    <th className='text-end min-w-120px sorting_disabled'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='fw-semibold text-gray-600'>
                                {
                                    allOrder?.orders?.map((order, index) => {
                                        return (
                                            <tr className='odd' key={index}>
                                                <td>{ordinalNumbers(index, newFilters?.limit, newFilters?.page)}</td>
                                                <td>
                                                    <div className='text-gray-800 text-hover-primary fw-bold'>
                                                        {order?.paymentCode}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                                            <div className='symbol-label'>
                                                                <img
                                                                    src={`${order?.customerPhoto}`}
                                                                    alt="Customer"
                                                                    className='symbol-label'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='ms-5 text-gray-800 text-hover-primary fs-5 fw-bold'>
                                                            {order?.customerName}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='badge badge-light-danger'>{order?.status}</div>
                                                </td>
                                                <td>
                                                    <span className='fw-bold'>{conversionNumberToVND(order?.total)}</span>
                                                </td>
                                                <td>
                                                    <span className='fw-bold'>{formatDateTime(order?.dateCreate)}</span>
                                                </td>
                                                <td>
                                                    <span className='fw-bold'>{formatDateTime(order?.dateComplete)}</span>
                                                </td>
                                                <td>
                                                    <Actions
                                                        onEditOrEnableClick={() => handleView(order?.paymentCode)}
                                                        onDeleteOrDisenableClick={() => handleDelete(order?.paymentCode)}
                                                        title={'View'}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <Limit options={OPTION_LIMIT}
                            value={newFilters.limit.toString()}
                            totalPage={allOrder?.totalPage}
                        />
                        <Pagination totalPage={allOrder?.totalPage}
                            currentPage={newFilters.page}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderList
