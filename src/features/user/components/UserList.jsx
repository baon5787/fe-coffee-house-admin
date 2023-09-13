import axios from 'axios';
import queryString from 'query-string';
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ALL, OPTION_LIMIT, OPTION_PAGE, USER_SORT_FIELD } from '~/constants/AppConstant';
import useTable from '~/hooks/useTable';
import { usersSelector } from '~/redux/selectors';
import { getSearchUsers, getUsers } from '../services/ApiUser';
import { formatDateTime, getTitleAction, isLengthChecked } from '~/utils/HandleTable';
import style from '../style/User.module.css'
import { CheckBox, LimitAndPagination, Table, Tbody, Thead } from '~/components/table';
import { deleteChangeSelectUsers } from '~/redux/slice/UserSlice';
import { getSortDir } from '~/utils/HandleValue';
import { SortName } from '~/components/filters';
import { isFilter } from '~/utils/CheckValue';
import Action from '~/components/action';


const UserList = ({ option }) => {

    const allUser = useSelector(usersSelector);

    const { navigate, dispatch, user, page, axiosJwt, newFilters, currentPage } = useTable();

    const [sortFilterEmail, setSortFilterEmail] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, USER_SORT_FIELD.EMAIL));

    const [sortFilterJoinedDate, setSortFilterJoinedDate] = useState(getSortDir(newFilters?.sortDir,
        newFilters?.sortField, USER_SORT_FIELD.JOINED_DATE));

    useLayoutEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const handle = () => {
            if (!user?.accessToken) return;

            getData(cancelToken);

        }
        handle();
        return () => {
            cancelToken.cancel('Operation canceled by the user.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newFilters])

    const getData = (cancelToken) => {

        const paramsString = queryString.stringify(newFilters);

        if (option === OPTION_PAGE.ENABLED) {
            if (isFilter(newFilters)) {
                getSearchUsers(paramsString, user?.accessToken, dispatch, axiosJwt, cancelToken);
            } else {
                getUsers(paramsString, user?.accessToken, dispatch, axiosJwt, page, currentPage,
                    cancelToken);
            }
        }
    }

    const handleEditOrEnableClick = (email) => {
        navigate(email);
    }

    const handleDeleteOrDisenableClick = (email) => {

    }

    const handleChangSelected = (e) => {
        const { value, checked } = e.target;

        let newData;

        if (value === ALL) {
            newData = allUser?.users?.map((item) => {
                return { ...item, isChecked: checked }
            })
        } else {
            newData = allUser?.users?.map((item) =>
                item?.sku === value ? { ...item, isChecked: checked } : item
            );
        }
        dispatch(deleteChangeSelectUsers(newData));
    }

    return (
        <div className='card-body pt-0'>
            <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                <div className='table-responsive'>
                    <Table className={`dataTable no-footer ${style.user}`}>
                        <Thead >
                            <th>
                                <CheckBox
                                    value={ALL}
                                    onChange={(e) => handleChangSelected(e)}
                                    checked={isLengthChecked(allUser?.users)}
                                />
                            </th>
                            <SortName
                                sortDir={newFilters?.sortDir}
                                sortField={newFilters?.sortField}
                                sortFilter={sortFilterEmail}
                                setSortFilter={setSortFilterEmail}
                                name={USER_SORT_FIELD.EMAIL}
                                className={'min-w-125px'}
                                title={'Customer Name'}
                            />
                            <th className='min-w-80px'>Gender</th>
                            <SortName
                                sortDir={newFilters?.sortDir}
                                sortField={newFilters?.sortField}
                                sortFilter={sortFilterJoinedDate}
                                setSortFilter={setSortFilterJoinedDate}
                                name={USER_SORT_FIELD.JOINED_DATE}
                                className={'min-w-125px'}
                                title={'Joined Date'}
                            />
                            <th className='min-w-125px'>Roles</th>
                            <th className='text-end min-w-70px sorting_disabled'>Actions</th>
                        </Thead>
                        <Tbody data={allUser?.users}>
                            {
                                (user, index) => <tr key={index}>
                                    <td>
                                        <CheckBox
                                            value={user?.email}
                                            checked={user?.isChecked}
                                            onChange={(e) => handleChangSelected(e)}
                                        />
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='symbol symbol-50px bg-hover-body'
                                            >
                                                <span className='symbol-label'
                                                    style={{ backgroundImage: `url(${user?.photo})` }}
                                                ></span>
                                            </div>
                                            <div className='ms-5 bg-hover-body min-w-0'>
                                                <div className='text-gray-800 text-hover-primary fs-5 fw-bold text-truncate'>
                                                    {user?.fullName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user?.gender}</td>
                                    <td>
                                        <span className='fw-bold'>{formatDateTime(user?.joinedDate)}</span>
                                    </td>
                                    <td className='text-truncate'>
                                        <span className='fw-bold'>{user?.rolesName?.join(', ')}</span>
                                    </td>
                                    <td className='text-end'>
                                        <Action
                                            title={getTitleAction(option)}
                                            onEditOrEnableClick={() => handleEditOrEnableClick(user?.email)}
                                            onDeleteOrDisenableClick={() => handleDeleteOrDisenableClick(user?.email)}
                                        />
                                    </td>
                                </tr>
                            }
                        </Tbody>
                    </Table>
                </div>
                <LimitAndPagination
                    options={OPTION_LIMIT}
                    value={newFilters?.limit.toString()}
                    currentPage={newFilters?.page}
                    totalPage={allUser?.totalPage}
                />
            </div>
        </div>
    )
}

export default UserList;
