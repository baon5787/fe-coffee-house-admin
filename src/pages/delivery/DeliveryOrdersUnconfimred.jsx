import React from 'react'
import { Card } from '~/components/card';
import { SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { DeliveryOrderList } from '~/features/delivery';

const DeliveryOrdersUnconfimred = () => {
    return (
        <Card>
            <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                <SearchText
                    placeholder={"Search name cusomter"}
                />
            </div>
            <DeliveryOrderList
                option={OPTION_PAGE.UNCONFIMRED}
            />
        </Card>
    )
}

export default DeliveryOrdersUnconfimred; 
