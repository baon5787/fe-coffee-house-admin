import React from 'react'
import { conversionNumberToVND } from '~/utils/HandleTable'
import { getSubtotalOrder } from '~/utils/HandleValue'
import PropTypes from 'prop-types';

const OrderItemList = ({ orderItems, deliveryCharges, total }) => {
    if (!orderItems) return;

    return (
        <>
            <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
                <thead>
                    <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                        <th className='min-w-175px'>Sản phẩm</th>
                        <th className='min-w-70px text-end'>Số lượng</th>
                        <th className='min-w-100px text-end'>Giá</th>
                        <th className='min-w-100px text-end'>Tạm tính</th>
                    </tr>
                </thead>
                <tbody className='fw-semibold text-gray-600'>
                    {
                        orderItems?.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='symbol symbol-50px'>
                                                <img
                                                    src={order?.image}
                                                    alt={order?.productName}
                                                    className='symbol-label'
                                                />
                                            </div>
                                            <div className='ms-5'>
                                                <div className='fw-bold text-gray-600 text-hover-primary'>
                                                    {order?.productName}
                                                </div>
                                                <div className='fs-7 text-muted'>Size : {order?.sizeName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-end'>
                                        {order?.quantity}
                                    </td>
                                    <td className='text-end'>
                                        {conversionNumberToVND(order?.price + order?.sizePice)}
                                    </td>
                                    <td className='text-end'>
                                        {conversionNumberToVND((order?.price + order?.sizePice) * order?.quantity)}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot className='fw-semibold text-gray-600'>
                    <tr >
                        <td className='text-end' colSpan={3}>
                            Tạm tính
                        </td>
                        <td className='text-end'>
                            {getSubtotalOrder(orderItems)}
                        </td>
                    </tr>
                    <tr >
                        <td className='text-end' colSpan={3}>
                            Phí vận chuyển
                        </td>
                        <td className='text-end'>
                            {conversionNumberToVND(deliveryCharges)}
                        </td>
                    </tr>
                    <tr>
                        <td className='fs-3 text-dark text-end' colSpan={3}>
                            Tổng cộng
                        </td>
                        <td className='text-dark fs-3 fw-bolder text-end'>
                            {conversionNumberToVND(total)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

OrderItemList.propTypes = {
    orderItems: PropTypes.array,
    deliveryCharges: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
}

export default OrderItemList
