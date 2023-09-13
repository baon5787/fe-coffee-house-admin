import React from 'react'
import { Card } from '~/components/card';
import { SearchDateRange, SearchOrderStatus, SearchText } from '~/components/filters';
import { OrderList } from '~/features/order';

const Order = () => {
    return (
        <>
            <Card>
                <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                    <SearchText
                        placeholder={"Search Product Name"}
                    />
                    {
                        <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                            <SearchDateRange />
                            <SearchOrderStatus />
                        </div>
                    }
                </div>
                <OrderList />
            </Card>
        </>
    )
}

export default Order;
