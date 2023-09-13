import axios from 'axios';
import queryString from 'query-string';
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { ALL, DEFAULT_INDEX, OPTION_LIMIT, OPTION_PAGE } from '~/constants/AppConstant';
import useTable from '~/hooks/useTable';
import { couponSelector, couponStatusSelector } from '~/redux/selectors';
import { getCoupons, getDisenableCouponByCode, getDisenableCoupons, getEnableCouponByCode, getSearchCoupons, getSearchDisenableCoupons } from '../services/ApiCoupon';
import { checkDataAndFilter, formatDate, getClassNameStatus, getCouponCondition, getCouponPrice, getCouponTypeName, getTitleAction, getValueByStatus, isLengthChecked, ordinalNumbers } from '~/utils/HandleTable';
import { Actions } from '~/components/actions';
import styles from '../style/Coupon.module.css';
import { Limit, Pagination } from '~/components/filters';
import { CheckBox } from '~/components/table';
import { deleteChangeSelectCoupons } from '~/redux/slice/CouponSlice';
import Swal from 'sweetalert2';
import { success, warning } from '~/components/swal/Swal';
import { warningTitle } from '~/utils/StringConcatention';
import { disenable, enable, updateData } from '~/helper/AppString';
import { isObjectOneValue } from '~/utils/CheckValue';

const CouponList = ({ option, onUpdate }) => {

    const couponStatus = useSelector(couponStatusSelector);

    const allCoupon = useSelector(couponSelector);

    const { dispatch, user, page, axiosJwt, newFilters, currentPage } = useTable();

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {
            if (!user?.accessToken) return;

            getData(cancelToken);

        }
        handle();
        return () => {
            cancelToken.cancel('Operation canceled by the Coupon.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters])

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {

            if (!user?.accessToken) return;

            if (allCoupon === null || !allCoupon) return;

            if (checkDataAndFilter(allCoupon?.coupons, allCoupon?.totalPage, newFilters, dispatch)
                === updateData
            ) {
                getData(cancelToken);
            }
        }
        handle()

        return () => {
            cancelToken.cancel('Operation canceled by the Coupon.')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCoupon])

    const getData = async (cancelToken) => {

        const paramsString = queryString.stringify(newFilters);

        if (option === OPTION_PAGE.ENABLED) {
            if (newFilters?.title_like || newFilters?.status) {
                getSearchCoupons(paramsString, user?.accessToken, dispatch, axiosJwt, cancelToken);
            } else {
                getCoupons(paramsString, user?.accessToken, dispatch, axiosJwt, page,
                    currentPage, cancelToken);
            }
        }

        if (option === OPTION_PAGE.DISENABLE) {
            if (newFilters?.title_like || newFilters?.status) {
                getSearchDisenableCoupons(paramsString, user?.accessToken, dispatch, axiosJwt,
                    cancelToken);
            } else {
                getDisenableCoupons(paramsString, user?.accessToken, dispatch, axiosJwt, page,
                    currentPage, cancelToken);
            }
        }
    }

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        let newData;

        if (value === ALL) {
            newData = allCoupon?.coupons?.map((coupon) => {
                return { ...coupon, isChecked: checked }
            })
        } else {
            newData = allCoupon?.coupons?.map((coupon) =>
                coupon?.code === value ? { ...coupon, isChecked: checked } : coupon
            );
        }
        dispatch(deleteChangeSelectCoupons(newData));
    }

    const handleEditOrEnableClick = (code) => {
        if (option === OPTION_PAGE.ENABLED && onUpdate) {
            onUpdate(code);
            return;
        }

        const coupon = allCoupon?.coupons?.filter((coupon) => coupon?.code === code);

        if (!isObjectOneValue(coupon)) return;

        const title = `mã phiếu giảm giá ${coupon[DEFAULT_INDEX]?.code}`;

        if (option === OPTION_PAGE.DISENABLE) {
            Swal.fire(warning(warningTitle(enable, title))).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await getEnableCouponByCode(code, user?.accessToken, dispatch,
                        axiosJwt);
                    Swal.fire(success(`${data}${title}.`));
                }
            })
        }
    };

    const handleDeleteOrDisenableClick = (code) => {
        const coupon = allCoupon?.coupons?.filter((coupon) => coupon?.code === code);

        if (!isObjectOneValue(coupon)) return;

        const title = `mã phiếu giảm giá ${coupon[DEFAULT_INDEX]?.code}`;

        if (option === OPTION_PAGE.ENABLED) {
            Swal.fire(warning(warningTitle(disenable, title))).then(async (result) => {
                if (result.isConfirmed) {
                    const data = await getDisenableCouponByCode(code, user?.accessToken, dispatch,
                        axiosJwt);
                    Swal.fire(success(`${data}${title}.`));
                }
            })
        }
    }

    return (
        <>
            <div className='card-body pt-0'>
                <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                    <div className='table-responsive'>
                        <table className={`table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer ${styles.coupons}`}>
                            <thead>
                                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                    <th className='w-10px pe-2 sorting_disabled'>
                                        <CheckBox
                                            value={"ALL"}
                                            onChange={(e) => handleChangSelected(e)}
                                            checked={isLengthChecked(allCoupon?.coupons)}
                                        />
                                    </th>
                                    <th className='min-w-25px'>Stt</th>
                                    <th className='min-w-80px sorting'>Tên mã giảm giá</th>
                                    <th className='min-w-80px'>Điệu kiện</th>
                                    <th className='min-w-80px'>Giá giảm</th>
                                    <th className='min-w-80px'>Mã giảm giá</th>
                                    <th className='min-w-80px'>Tính giảm giá</th>
                                    <th className='min-w-80px'>Hạn sử dụng</th>
                                    <th className='min-w-80px'>Trạng thái</th>
                                    <th className='min-w-80px'>Danh mục</th>
                                    <th className='text-end min-w-120px sorting_disabled'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='fw-semibold text-gray-600'>
                                {
                                    allCoupon?.coupons?.map((coupon, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <CheckBox
                                                        value={coupon?.code}
                                                        checked={coupon?.isChecked}
                                                        onChange={(e) => handleChangSelected(e)}
                                                    />
                                                </td>
                                                <td>{ordinalNumbers(index, newFilters?.limit, newFilters?.page)}</td>
                                                <td>
                                                    <div className='text-gray-600 text-hover-primary mb-1 bg-hover-body text-truncate'>
                                                        {coupon?.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='text-gray-600 text-truncate'>
                                                        {getCouponCondition(coupon?.couponCategory, coupon?.condition)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='text-gray-600 text-truncate'>
                                                        {getCouponPrice(coupon?.couponType, coupon?.price)}
                                                    </div>
                                                </td>
                                                <td>{coupon?.code}</td>
                                                <td>{getCouponTypeName(coupon?.couponType)}</td>
                                                <td>{formatDate(coupon?.expired)}</td>
                                                <td>
                                                    <div className={`badge ${getClassNameStatus(coupon?.status)}`}>{getValueByStatus(couponStatus, coupon?.status)}</div>
                                                </td>
                                                <td>{coupon?.couponCategory}</td>
                                                <td className='text-end'>
                                                    <Actions
                                                        title={getTitleAction(option)}
                                                        onEditOrEnableClick={() => handleEditOrEnableClick(coupon?.code)}
                                                        onDeleteOrDisenableClick={() => handleDeleteOrDisenableClick(coupon?.code)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <Limit options={OPTION_LIMIT}
                            value={newFilters.limit.toString()}
                            totalPage={allCoupon?.totalPage}
                        />
                        <Pagination totalPage={allCoupon?.totalPage}
                            currentPage={newFilters.page}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponList
