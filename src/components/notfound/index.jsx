import React from 'react'
import { Card, CardBody } from '../card'
import { Link } from 'react-router-dom'
import statuses from '~/assets/image/statuses'

const NotFound = ({ msg }) => {
    return (
        <div className='flex flex-col justify-center items-center text-center'>
            <Card>
                <CardBody className='py-10'>
                    <h1 className='font-bold xl:text-[2.5rem] text-2hx text-text-gray-900 mb-4'>
                        Page Not Found
                    </h1>
                    <div className='font-medium text-6 text-text-gray-500 mb-7'>
                        {msg}
                    </div>
                    <div className='mb-10'>
                        <img src={statuses[404]} alt="error 404" className='w-full' />
                    </div>
                    <div className='mb-0'>
                        <Link to={'/index'} className='btn btn-primary'>Go</Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default NotFound