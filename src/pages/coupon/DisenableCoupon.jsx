import React from 'react'
import { useSelector } from 'react-redux';
import { Card } from '~/components/card';
import { SearchCouponStatus, SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { CouponList, DeleteSelectedCoupon } from '~/features/coupon';
import { isSelectedCouponSelector } from '~/redux/selectors';

const DisenableCoupon = () => {

    const isSelected = useSelector(isSelectedCouponSelector);

    return (
        <>
            <Card>

                <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                    <SearchText
                        placeholder={"Search Coupon Name"}
                    />
                    <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                        {
                            isSelected ? (
                                <DeleteSelectedCoupon
                                    option={OPTION_PAGE.DISENABLE}
                                />
                            ) : (
                                <>
                                    <SearchCouponStatus />
                                </>
                            )
                        }
                    </div>
                </div>
                <CouponList
                    option={OPTION_PAGE.DISENABLE}
                />
            </Card>
        </>
    )
}

export default DisenableCoupon
