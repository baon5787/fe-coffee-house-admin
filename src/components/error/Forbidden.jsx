import React from 'react'
import { CardBody } from '../card'
import statuses from '~/assets/image/statuses'

const Forbidden = ({ msg }) => {
    return (
        <CardBody
            className=''
        >
            <div className='mb-10'>
                <div className='text-2hx xl:text-[2.5rem] font-semibold text-text-gray-800 text-center mb-5'>
                    <span className='me-2'>Page Forbidden</span>
                </div>
                <div className='text-2 xl:text-[1.5rem] font-medium text-text-gray-500 mb-7 text-center'>
                    {msg}
                </div>
            </div>
            <img src={statuses[403]} alt="Error 403" className='mx-auto h-[300px]' />
        </CardBody>
    )
}

export default Forbidden