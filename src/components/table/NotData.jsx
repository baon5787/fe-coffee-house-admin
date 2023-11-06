import React from 'react'
import tables from '~/assets/image/tables'

const NotData = ({ className, title, colspan }) => {
    return (
        <tbody className={`${className ? className : ''}`} >
            <tr>
                <td colSpan={colspan} className='text-center'>
                    <div className='flex justify-center pb-5'>
                        <img src={tables?.notData} alt="Nt Data" className='w-40' />
                    </div>
                    <span>{title}</span>
                </td>
            </tr>
        </tbody>
    )
}

export default NotData