import React from 'react'
import Checkbox from './Checkbox'

const ListCheckBox = ({ option = [], className }) => {
    return (
        <div className={`grid ${className}`}>
            {
                option.map((item, index) => {
                    return (
                        <label className='btn btn-active-light-primary border-btn-outline-dashed !flex !p-6 !text-start shadow-none'
                            key={index}
                        >
                            <Checkbox />
                            <span className='ml-5'>
                                <span className='!text-4 !font-semibold 1text-gray-800 !block'>
                                    {item.value}
                                </span>
                            </span>
                        </label>
                    )
                })
            }
        </div>
    )
}

export default ListCheckBox