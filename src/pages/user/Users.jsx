import React, { useRef } from 'react'
import { Card } from '~/components/card'
import { SearchText } from '~/components/filters'
import { OPTION_PAGE } from '~/constants/AppConstant'
import { ModalFormUser, UserList } from '~/features/user'

const Users = () => {
    const refModal = useRef();

    const handleAddUser = () => {
        refModal.current.addUser();
    }
    return (
        <>
            <Card>
                <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                    <SearchText
                        placeholder={"Search User Email"}
                    />
                    <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                        <div className='btn btn-primary'
                            onClick={() => handleAddUser()}
                        >Add User</div>
                    </div>
                </div>
                <UserList
                    option={OPTION_PAGE.ENABLED}
                />
            </Card>
            < ModalFormUser ref={refModal} />
        </>
    )
}

export default Users
