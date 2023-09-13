import React from 'react'
import Swal from 'sweetalert2';
import useJwt from '~/hooks/useJwt';
import { isEmptyArray } from '~/utils/CheckValue';
import { success, warning } from '../swal/Swal';
import { successSeletedTitle, warningSeletedTitle } from '~/utils/StringConcatention';

const DeleteSelected = ({ listCheckBox, option, apiTitle, apiDeleteSelected }) => {

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const handleDeleteSelected = async () => {
        if (isEmptyArray(listCheckBox)) return;

        const title = await apiTitle(listCheckBox, accessToken, dispatch, navigate, axiosJwt);

        if (!title) return;

        Swal.fire(warning(warningSeletedTitle(option, title)))
            .then(async (result) => {
                if (result.isConfirmed) {
                    const data = await apiDeleteSelected(listCheckBox, accessToken, dispatch,
                        navigate, axiosJwt);
                    if (data) {
                        Swal.fire(success(successSeletedTitle(`${data}${title}`)));
                    }
                }
            })
    }

    return (
        <div className='d-flex justify-content-end align-items-center'>
            <div className='fw-bold me-5'><span className='me-2'>{listCheckBox?.length}</span>Selected</div>
            <button className='btn btn-danger' onClick={() => handleDeleteSelected()}>Delete Selected</button>
        </div>
    )
}

export default DeleteSelected;
