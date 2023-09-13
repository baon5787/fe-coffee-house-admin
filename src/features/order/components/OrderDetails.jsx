import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader } from '~/components/card';
import { getOrderDetailsByCode } from '../services/ApiOrder';
import { createAxios } from '~/api/AxiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import { loginSucces } from '~/redux/slice/AuthSlice';
import { formatDateTime } from '~/utils/HandleTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCircleUser, faTruck } from '@fortawesome/free-solid-svg-icons'
import { OrderItemList } from '~/components/table';
import { OrderStatusIcon, PaymentMethodIcon, PaymentStatusIcon, PhoneIcon } from '~/components/icons/Icons';

const OrderDetails = () => {

    const { code } = useParams();

    const user = useSelector(userSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let axiosJwt = createAxios(user, dispatch, loginSucces, navigate);

    const [orderDetail, setOrderDetail] = useState(null);

    useEffect(() => {
        if (!code) return;

        getOrderDetailsByCode(code, user?.accessToken, dispatch, axiosJwt).then((data) => {
            setOrderDetail(data);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='d-flex flex-column gap-7 gap-lg-10'>
                <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                    <Card className={'py-4 flex-row-fluid'}>
                        <CardHeader name={`Chi tiết hóa đơn`} />
                        <div className='card-body pt-0'>
                            <div className='table-responsive'>
                                <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                                    <tbody className='fw-semibold text-gray-600'>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <FontAwesomeIcon icon={faCalendarDays} />
                                                    </span>
                                                    Ngày đặt hàng
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {formatDateTime(orderDetail?.order?.dateCreate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <FontAwesomeIcon icon={faCalendarDays} />
                                                    </span>
                                                    Ngày hoàn thành
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {formatDateTime(orderDetail?.order?.dateComplete)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <OrderStatusIcon size={24} />
                                                    </span>
                                                    Trạng thái
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {orderDetail?.orderStatus}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                    <Card className={'py-4 flex-row-fluid'}>
                        <CardHeader name={`Chi tiết thanh toán`} />
                        <div className='card-body pt-0'>
                            <div className='table-responsive'>
                                <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                                    <tbody className='fw-semibold text-gray-600'>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <FontAwesomeIcon icon={faCalendarDays} />
                                                    </span>
                                                    Ngày hoàn thành
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {formatDateTime(orderDetail?.order?.dateComplete)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <PaymentMethodIcon size={24} />
                                                    </span>
                                                    Hình thức
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {orderDetail?.paymentMethod}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <PaymentStatusIcon size={24} />
                                                    </span>
                                                    Trạng thái
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {orderDetail?.paymentStatus}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                    <Card className={'py-4 flex-row-fluid'}>
                        <CardHeader name={`Khách hàng`} />
                        <div className='card-body pt-0'>
                            <div className='table-responsive'>
                                <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                                    <tbody className='fw-semibold text-gray-600'>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <FontAwesomeIcon icon={faCircleUser} />
                                                    </span>
                                                    Customer
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                <div className='d-flex align-items-center justify-content-end'>
                                                    <div className='symbol symbol-circle symbol-25px overflow-hidden me-3'>
                                                        <div className='symbol-label'>
                                                            <img
                                                                src={orderDetail?.order?.customerPhoto}
                                                                alt={orderDetail?.order?.customerName}
                                                                className='w-100'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='text-gray-600 text-hover-primary'>
                                                        {orderDetail?.order?.customerName}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <PhoneIcon size={24} />
                                                    </span>
                                                    Phone
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {orderDetail?.customerPhone}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                    <Card className={'py-4 flex-row-fluid'}>
                        <CardHeader name={`Nhân viên`} />
                        <div className='card-body pt-0'>
                            <div className='table-responsive'>
                                <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                                    <tbody className='fw-semibold text-gray-600'>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <FontAwesomeIcon icon={faCircleUser} />
                                                    </span>
                                                    User
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                <div className='d-flex align-items-center justify-content-end'>
                                                    <div className='symbol symbol-circle symbol-25px overflow-hidden me-3'>
                                                        <div className='symbol-label'>
                                                            <img
                                                                src={orderDetail?.userPhoto}
                                                                alt={orderDetail?.userName}
                                                                className='w-100'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='text-gray-600 text-hover-primary'>
                                                        {orderDetail?.userName}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <PhoneIcon size={24} />
                                                    </span>
                                                    Phone
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>
                                                {orderDetail?.userPhone}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                    <Card className={'py-4 flex-row-fluid overflow-hidden'}>
                        <div className='position-absolute top-0 end-0 bottom-0 opacity-10 d-flex align-items-center me-5'>
                            <span className='svg-icon'>
                                <FontAwesomeIcon icon={faTruck} className='h-100px w-100px' />
                            </span>
                        </div>
                        <CardHeader name={'Địa chỉ giao hàng'} />
                        <div className='card-body pt-0'>
                            {orderDetail?.shippingAdress}
                        </div>
                    </Card>
                </div>
                <Card className={'py-4 flex-row-fluid overflow-hidden'}>
                    <CardHeader name={`Đơn đặt hàng (${code})`} />
                    <div className='card-body pt-0'>
                        <div className='table-responsive'>
                            <OrderItemList
                                orderItems={orderDetail?.orderItems}
                                deliveryCharges={orderDetail?.deliveryCharges}
                                total={orderDetail?.order?.total}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default OrderDetails;
