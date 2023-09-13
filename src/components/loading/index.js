import React from 'react'

const Loading = () => {
    return (
        <>
            <div data-kt-app-page-loading="on">
                <div className='page-loader flex-column bg-dark bg-opacity-25'>
                    <span className='spinner-border text-primary' role="status"></span>
                    <span className='text-gray-800 fs-6 fw-semibold mt-5'>Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Loading;