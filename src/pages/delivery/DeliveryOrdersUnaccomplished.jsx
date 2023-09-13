import React from 'react'
import { Card } from '~/components/card'
import { SearchDateRange, SearchText } from '~/components/filters'
import { OPTION_PAGE } from '~/constants/AppConstant'
import { DeliveryOrderList, SearchDeliveryOrderStatus } from '~/features/delivery'

const DeliveryOrdersUnaccomplished = () => {
    return (
        <>
            <Card>
                <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                    <SearchText
                        placeholder={"Search code order"}
                    />
                    <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                        <SearchDateRange />
                        <SearchDeliveryOrderStatus
                            option={OPTION_PAGE.UNACCOMPLISHED}
                        />
                    </div>
                </div>
                <DeliveryOrderList
                    option={OPTION_PAGE.UNACCOMPLISHED}
                />
            </Card>
        </>
    )
}

export default DeliveryOrdersUnaccomplished
