import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { SearchCouponStatus, SearchText } from '~/components/filters'
import { Card } from '~/components/card'
import { OPTION_PAGE } from '~/constants/AppConstant'
import { CouponList, DeleteSelectedCoupon, ModalFormCoupon } from '~/features/coupon'
import { isSelectedCouponSelector } from '~/redux/selectors'

const Coupon = () => {

    const refModal = useRef();

    const handleAdd = () => {
        refModal.current.addCoupon();
    }

    const handleUpdate = (code) => {
        refModal.current.editCoupon(code);
    }

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
                                    option={OPTION_PAGE.ENABLED}
                                />
                            ) : (
                                <>
                                    <SearchCouponStatus />
                                    <div className='btn btn-primary'
                                        onClick={() => handleAdd()}
                                    >
                                        Add Coupon
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <CouponList
                    option={OPTION_PAGE.ENABLED}
                    onUpdate={handleUpdate}
                />
            </Card>
            < ModalFormCoupon ref={refModal} />
        </>
    )
}

export default Coupon
