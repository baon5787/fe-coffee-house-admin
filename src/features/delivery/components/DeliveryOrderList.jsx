import axios from 'axios';
import queryString from 'query-string';
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import useTable from '~/hooks/useTable';
import { deliveryOrderSelector } from '~/redux/selectors';
import { getOrderConfirmation, getOrdersAccomplishedOfUser, getOrdersUnaccomplishedOfUser, getOrdersUnconfimred, getSearchOrdersAccomplishedOfUser, getSearchOrdersUnaccomplishedOfUser } from '../services/DeliveryOrderApi';
import { conversionNumberToVND, formatDateTime } from '~/utils/HandleTable';
import styles from '../style/delivery.module.css';
import { ERROR, PATH } from '~/constants/Paths';
import Swal from 'sweetalert2';
import { success } from '~/components/swal/Swal';
import { OPTION_LIMIT, OPTION_PAGE } from '~/constants/AppConstant';
import Tippy from '@tippyjs/react';
import { Limit, Pagination } from '~/components/filters';
// import 'tippy.js/dist/tippy.css'

const DeliveryOrderList = ({ option }) => {

  const allDeliveryOrder = useSelector(deliveryOrderSelector);

  const { navigate, dispatch, user, page, axiosJwt, newFilters, currentPage } = useTable();

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

    if (option === OPTION_PAGE.UNCONFIMRED) {
      getOrdersUnconfimred(paramsString, cancelToken, user?.accessToken, dispatch, axiosJwt, page,
        currentPage);
    }

    if (option === OPTION_PAGE.UNACCOMPLISHED) {
      if ((newFilters?.time_start && newFilters?.time_ended) || newFilters?.title_like ||
        newFilters?.status) {
        getSearchOrdersUnaccomplishedOfUser(paramsString, user?.accessToken, dispatch, axiosJwt,
          cancelToken);
      } else {
        getOrdersUnaccomplishedOfUser(paramsString, cancelToken, user?.accessToken, dispatch,
          axiosJwt, page, currentPage);
      }
    }

    if (option === OPTION_PAGE.ACCOMPLISHED) {
      if ((newFilters?.time_start && newFilters?.time_ended) || newFilters?.title_like ||
        newFilters?.status) {
        getSearchOrdersAccomplishedOfUser(paramsString, user?.accessToken, dispatch, axiosJwt,
          cancelToken);
      } else {
        getOrdersAccomplishedOfUser(paramsString, cancelToken, user?.accessToken, dispatch, axiosJwt,
          page, currentPage);
      }
    }
  }

  const handleOrderConfirmationOrView = async (code) => {
    if (option === OPTION_PAGE.UNCONFIMRED) {
      const title = await getOrderConfirmation(code, user?.accessToken, axiosJwt);

      if (title === ERROR) return;

      Swal.fire(success(title)).then(async (result) => {
        if (result.isConfirmed) {
          navigate(`/${PATH.DELIVERY}/${PATH.ORDERS}/${code}`)
        }
      })
    } else {
      navigate(`/${PATH.DELIVERY}/${PATH.ORDERS}/${code}`)
    }
  }

  return (
    <>
      <div className='card-body pt-0'>
        <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
          <div className='table-responsive'>
            <table className={`table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer ${styles.delivery_order}`}>
              <thead>
                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                  <th className='min-w-80px sorting'>Mã đơn hàng</th>
                  <th className='min-w-80px'>Khách hàng</th>
                  <th className='min-w-80px'>Trạng thái hóa đơn</th>
                  <th className='min-w-80px'>Trạng thái thanh toán</th>
                  <th className='min-w-80px'>Tổng tiền</th>
                  <th className='min-w-100px'>Thời gian tạo</th>
                  <th className='min-w-80px'>Địa chỉ khách hàng</th>
                  <th className='text-end min-w-120px sorting_disabled'>Actions</th>
                </tr>
              </thead>
              <tbody className='fw-semibold text-gray-600'>
                {
                  allDeliveryOrder?.deliveryOrders?.map((order, index) => {
                    return (
                      <tr className='odd' key={index}>
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
                                  alt="Cutomer"
                                  className='symbol-label'
                                />
                              </div>
                            </div>
                            <div className={`${styles.grid}`}>
                              <div className='cursor-pointer ms-5 text-gray-800 text-hover-primary fs-5 fw-bold text-truncate'>
                                {order?.customerName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className='badge badge-light-danger'>{order?.status}</div>
                        </td>
                        <td>
                          <div className='badge badge-light-danger'>{order?.paymentStatus}</div>
                        </td>
                        <td>
                          <span className='fw-bold'>{conversionNumberToVND(order?.total)}</span>
                        </td>
                        <td>
                          <span className='fw-bold'>{formatDateTime(order?.dateCreate)}</span>
                        </td>
                        <td >
                          <Tippy
                            content={order?.address}
                            placement='bottom'
                            className='popover bs-popover-auto'
                          >
                            <div className={`${styles.grid}`}>
                              <div className='text-truncate text-gray-800 fs-5 fw-bold cursor-pointer'>
                                {order?.address}
                              </div>
                            </div>
                          </Tippy>
                        </td>
                        <td className='text-end'>
                          <div className='btn btn-sm btn-light btn-active-light-primary'
                            onClick={() => handleOrderConfirmationOrView(order?.paymentCode)}
                          >
                            {option === OPTION_PAGE.UNCONFIMRED ? 'Xác nhận' : 'Xem'}
                          </div>
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
              totalPage={allDeliveryOrder?.totalPage}
            />
            <Pagination totalPage={allDeliveryOrder?.totalPage}
              currentPage={newFilters.page}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DeliveryOrderList