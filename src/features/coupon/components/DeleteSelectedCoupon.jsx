import React from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { success, warning } from '~/components/swal/Swal';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { disenable, enable } from '~/helper/AppString';
import useTable from '~/hooks/useTable';
import { listCouponCode } from '~/redux/selectors';
import { successSeletedTitle, warningSeletedTitle } from '~/utils/StringConcatention';
import { getDisenableSelectedCoupons, getEnabledSelectedCoupons, getTitleDisenableSelectedCoupons, getTitleEnabledSelectedCoupons } from '../services/ApiCoupon';
import { ERROR } from '~/constants/Paths';
import { isEmptyArray } from '~/utils/CheckValue';

const DeleteSelectedCoupon = ({ option }) => {

    const codes = useSelector(listCouponCode);

    const { dispatch, user, axiosJwt } = useTable();

    const handleSelectedDeleteOrEnable = async () => {
        if (isEmptyArray(codes)) return;

        if (option === OPTION_PAGE.ENABLED) {
            const title = await getTitleDisenableSelectedCoupons(codes, user?.accessToken, axiosJwt);
            Swal.fire(warning(warningSeletedTitle(disenable, title)))
                .then(async (result) => {
                    if (result.isConfirmed) {
                        const data = await getDisenableSelectedCoupons(codes, user?.accessToken,
                            dispatch, axiosJwt);

                        if (data === ERROR) return;
                        Swal.fire(success(successSeletedTitle(`${data}${title}`)));
                    }
                });
        }

        if (option === OPTION_PAGE.DISENABLE) {
            const title = await getTitleEnabledSelectedCoupons(codes, user?.accessToken, axiosJwt);
            Swal.fire(warning(warningSeletedTitle(enable, title)))
                .then(async (result) => {
                    if (result.isConfirmed) {
                        const data = await getEnabledSelectedCoupons(codes, user?.accessToken,
                            dispatch, axiosJwt);

                        if (data === ERROR) return;
                        Swal.fire(success(successSeletedTitle(`${data}${title}`)));
                    }
                });
        }
    }

    return (
        <>
            <div className='d-flex justify-content-end align-items-center'>
                <div className='fw-bold me-5'><span className='me-2'>{codes?.length}</span>Selected</div>
                <button className='btn btn-danger' onClick={() => handleSelectedDeleteOrEnable()}>Delete Selected</button>
            </div>
        </>
    )
}

export default DeleteSelectedCoupon;
