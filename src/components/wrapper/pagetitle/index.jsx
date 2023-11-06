import React from 'react'
import { Link } from 'react-router-dom'

const PageTitle = () => {
    return (
        <div className='page--title'>
            <h1 className='page--title__title'>Product Form</h1>
            <ul className='breadcrumb font-medium text-base mb-1'>
                <li className='group breadcrumb-item'>
                    <Link className='group-hover:text-theme-primary'>Home</Link>
                </li>
                <li className='group breadcrumb-item'>
                    <Link className='group-hover:text-theme-primary'>eCommerce</Link>
                </li>
                <li className='group breadcrumb-item'>
                    <Link className='group-hover:text-theme-primary'>Category</Link>
                </li>
                <li className='breadcrumb-item !text-text-theme-dark'>
                    <div>Product List</div>
                </li>
            </ul>
        </div>
    )
}

export default PageTitle