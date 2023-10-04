import React, { useEffect, useState } from 'react';
import { CardHeader } from '~/components/card';
import '../style/delivery.css';
import {
    getListStateTranstionOrder,
    getListStateTranstionPayment,
    getOrderDetailsByCodeAndUser,
    orderStatusChange
} from '../services/DeliveryOrderApi';
import axios from 'axios';
import { ERROR } from '~/constants/Paths';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import { loginSuccess } from '~/redux/slice/AuthSlice';
import { createAxios } from '~/api/AxiosClient';
import { INDEX_CANCELLED, ORDER_EVENT, ORDER_STATUS, PAYMENT_STATUS, STATUS_CANCELLED } from '~/constants/AppConstant';
import { getStateOrderName } from '~/utils/HandleValue';
import { formatDateTime } from '~/utils/HandleTable';
import Loading from '~/components/loading';
import StateTranstion from './StateTranstion';
import { swalMixin } from '~/components/swal/Swal';
import { getTitleStateTranstion } from '~/utils/StringConcatention';
import { MapBox } from './mapbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCircleUser, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { OrderItemList } from '~/components/table';
import { isEmptyArray, isStateOrderStatus, isStatePaymentStatus } from '~/utils/CheckValue';
import { PaymentMethodIcon, PhoneIcon } from '~/components/icons/Icons';

const DeliveryOrderDetails = () => {

    const user = useSelector(userSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [orderInfo, setOderInfo] = useState([]);

    const [status, setStatus] = useState();

    const [stateTranstionsOrder, setStateTranstionsOrder] = useState();

    const [stateTranstionsPayment, setStateTranstionsPayment] = useState();

    const { code } = useParams();

    let axiosJwt = createAxios(user, dispatch, loginSuccess, navigate);

    useEffect(() => {
        const loadStateTrantion = async () => {
            const listStateTranstionOrder = await getListStateTranstionOrder(user?.accessToken,
                axiosJwt);
            if (listStateTranstionOrder === ERROR) return;
            setStateTranstionsOrder(listStateTranstionOrder);

            const listStateTranstionPayment = await getListStateTranstionPayment(user?.accessToken,
                axiosJwt);
            if (listStateTranstionPayment === ERROR) return;
            setStateTranstionsPayment(listStateTranstionPayment)
        }
        loadStateTrantion()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const loadMap = async () => {
            if (!code) return;

            const orderInfo = await getOrderDetailsByCodeAndUser(code, user?.accessToken, axiosJwt
                , cancelToken);

            if (orderInfo === ERROR) return;

            setOderInfo(orderInfo);
            setStatus({
                orderStatus: orderInfo?.order?.orderStatus,
                paymentStatus: orderInfo?.order?.paymentStatus
            })
            setLoading(false);
        }
        loadMap();
        return () => {
            cancelToken.cancel('Operation canceled by the user.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNextOrder = async (code, event) => {
        const data = await orderStatusChange(code, event, user?.accessToken, axiosJwt);
        if (data === ERROR) return;
        const Toast = swalMixin();
        Toast.fire({
            icon: 'success',
            title: getTitleStateTranstion(getStateOrderName(stateTranstionsOrder, status?.orderStatus)),
        })
        setStatus(data);
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    if (isEmptyArray(orderInfo)) return;

    return (
        <>
            <div className="row gy-5 g-xl-10">
                <div className="col-xl-4 mb-xl-10">
                    <div className='card mb-5 mb-xl-8'>
                        <div className='card-body text-center'>
                            <div className='symbol symbol-100px symbol-circle symbol-lg-160px symbol-fixed position-relative mb-6'>
                                <img
                                    src={`${orderInfo?.userPhoto}`}
                                    alt="user"
                                />
                            </div>
                            <h4 className='text-gray-900 text-hover-primary fs-2 fw-bold me-1 mb-6'>
                                {orderInfo?.userName}
                            </h4>
                            <div className='btn btn-light-primary fw-bold mx-auto'>Shipping</div>
                        </div>
                        <div className='card bg-secondary mb-0'>
                            <CardHeader name={`Note Order`} />
                            <div className='card-body pt-3'>
                                <p className='fw-bold text-gray-600 text-hover-primary'>
                                    {orderInfo?.noteOrder}
                                </p>
                            </div>
                            <div className='card-footer border-0 py-4 bg-danger rounded-xl'>
                                <div className='d-flex align-items-center'>
                                    <span className='svg-icon p-3 bg-white rounded-circle svg-icon-2x svg-icon-gray-400 m-3'>
                                        <FontAwesomeIcon icon={faTruckFast} className='text-danger' />
                                    </span>
                                    <div className='media-body'>
                                        <h5 className='my-0 text-white'>
                                            {orderInfo?.order?.address}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card mb-5 mb-xl-8'>
                        <CardHeader name={`Quá trình vận chuyển`} />
                        <div className='card-body pt-5 stepper stepper-pills stepper-column'>
                            <div className="stepper-nav flex-cente pt-xl-4">
                                {
                                    status?.orderStatus === ORDER_STATUS.CANCELLED ? (
                                        <StateTranstion
                                            index={INDEX_CANCELLED}
                                            state={STATUS_CANCELLED}
                                            statusEnd={ORDER_STATUS.CANCELLED}
                                            statusName={status?.orderStatus}
                                        />
                                    ) : (
                                        stateTranstionsOrder?.map((state, index) => {
                                            return <StateTranstion
                                                index={index}
                                                state={state}
                                                statusEnd={ORDER_STATUS.DELIVERED}
                                                statusName={status?.orderStatus}
                                                key={index}
                                            />
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='card mb-5 mb-xl-8'>
                        <CardHeader name={`Quá trình thanh toán`} />
                        <div className='card-body pt-5 stepper stepper-pills stepper-column'>
                            <div className="stepper-nav flex-cente pt-xl-4">
                                {
                                    status?.paymentStatus === PAYMENT_STATUS.CANCELLED ?
                                        (
                                            <StateTranstion
                                                index={INDEX_CANCELLED}
                                                state={STATUS_CANCELLED}
                                                statusEnd={PAYMENT_STATUS.CANCELLED}
                                                statusName={status?.paymentStatus}
                                            />
                                        ) : (
                                            stateTranstionsPayment?.map((state, index) => {
                                                return <StateTranstion
                                                    index={index}
                                                    state={state}
                                                    statusEnd={PAYMENT_STATUS.SUCCESS}
                                                    statusName={status?.paymentStatus}
                                                    key={index}
                                                />
                                            })
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8 mb-5 mb-xl-10">
                    <div className='card pt-4 mb-6 mb-xl-9'>
                        <CardHeader name={`Thông tin khách hàng`} />
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
                                                                src={orderInfo?.order?.customerPhoto}
                                                                alt={orderInfo?.order?.customerName}
                                                                className='w-100'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='text-gray-600 text-hover-primary'>
                                                        {orderInfo?.order?.customerName}
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
                                            <td className='fw-bold text-end'>{orderInfo?.customerPhone}</td>
                                        </tr>
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
                                                {formatDateTime(orderInfo?.order?.dateCreate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-muted'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='svg-icon svg-icon-2 me-2'>
                                                        <PaymentMethodIcon size={24} />
                                                    </span>
                                                    Hình thức thanh toán
                                                </div>
                                            </td>
                                            <td className='fw-bold text-end'>{orderInfo?.paymentMethod}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='card pt-4 mb-6 mb-xl-9'>
                        <CardHeader name={`Đơn đặt hàng`} />
                        <div className='card-body pt-0'>
                            <div className='table-responsive'>
                                <OrderItemList
                                    orderItems={orderInfo?.orderItems}
                                    deliveryCharges={orderInfo?.deliveryCharges}
                                    total={orderInfo?.order?.total}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='card pt-4 mb-6 mb-xl-9'>
                        <CardHeader name={`Bảng chỉ hướng đi`} />
                        <div className='card-body pt-2'>
                            <MapBox
                                address={orderInfo?.order?.address}
                                customerName={orderInfo?.order?.customerName}
                            />
                        </div>
                    </div >
                </div >
                {
                    (isStateOrderStatus(status?.orderStatus) || isStatePaymentStatus(status?.paymentStatus)) && (
                        <div className='col-xl-12 status'>
                            <div className='d-flex align-items-center justify-content-between '>
                                {
                                    isStatePaymentStatus(status?.paymentStatus) && (
                                        <div
                                            className='btn btn-primary'
                                            onClick={() => handleNextOrder(orderInfo?.order?.paymentCode, ORDER_EVENT.CANCELLED)}
                                        >
                                            Hủy hóa đơn
                                        </div>
                                    )
                                }
                                <div
                                    className='btn btn-primary'
                                    onClick={() => handleNextOrder(orderInfo?.order?.paymentCode, ORDER_EVENT.NEXT)}
                                >
                                    {
                                        getStateOrderName(stateTranstionsOrder, status?.orderStatus)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    )
}

export default DeliveryOrderDetails
