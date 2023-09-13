import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faPencil } from '@fortawesome/free-solid-svg-icons'
import { Card, CardHeader } from '~/components/card';
import ModalFormUserDetails from './ModalFormUserDetails';
import useJwt from '~/hooks/useJwt';
import { getUserByEmail } from '../services/ApiUser';
import { useParams } from 'react-router-dom';
import { getNameBySelect, getRolesName } from '~/utils/HandleValue';
import Loading from '~/components/loading';
import useGender from '~/hooks/useGender';

const UserDetails = () => {

    const [isShow, setIsShow] = useState(true);

    const [isFormUserDetails, setIsFormUserDetails] = useState(false);

    const hanldeToggleFormUserDetails = () => setIsFormUserDetails(!isFormUserDetails);

    const { email } = useParams();

    const [userDetails, setUserDetails] = useState();

    const { accessToken, dispatch, axiosJwt } = useJwt();

    const [loading, setLoading] = useState(true)

    const { allGender } = useGender(accessToken, dispatch, axiosJwt);

    useEffect(() => {
        const loadUserDetails = () => {
            getUserByEmail(email, accessToken, dispatch, axiosJwt)
                .then((data) => {
                    setUserDetails(data)
                    setLoading(false);
                })
        }
        loadUserDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    if (loading) return <Loading />

    return (
        <>
            <div className='d-flex flex-column flex-lg-row'>
                <div className='flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10'>
                    <div className='card mb-5 mb-xl-8'>
                        <div className='card-body'>
                            <div className='d-flex flex-center flex-column py-5'>
                                <div className='symbol symbol-100px symbol-circle mb-7'>
                                    <img
                                        src={userDetails?.avater}
                                        alt="avatar"
                                    />
                                </div>
                                <div className='fs-3 text-gray-800 text-hover-primary fw-bold mb-3'>
                                    {`${userDetails?.firstName} ${userDetails?.lastName}`}
                                </div>
                                <div className='mb-9'>
                                    <div className='badge badge-lg badge-light-primary d-inline'>
                                        {getRolesName(userDetails?.roles)}
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex flex-stack fs-4 py-3'>
                                <div className={`fw-bold rotate collapsible ${isShow ? 'active' : 'collapsed'}`}
                                    onClick={() => setIsShow(!isShow)}
                                >
                                    Details
                                    <span className='ms-2 rotate-180'>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </span>
                                </div>
                                <div
                                    className='btn btn-sm btn-light-primary'
                                    onClick={() => hanldeToggleFormUserDetails()}
                                >
                                    Edit
                                </div>
                            </div>
                            <div className='separator'></div>
                            <div className={`collapse ${isShow ? 'show' : ''}`}>
                                <div className='pb-5 fs-6'>
                                    <div className='fw-bold mt-5'>Email</div>
                                    <div className='text-gray-600'>{userDetails?.email}</div>
                                    <div className='fw-bold mt-5'>Birthday</div>
                                    <div className='text-gray-600'>
                                        {` ${userDetails?.day} - ${userDetails?.month} - ${userDetails?.year}`}
                                    </div>
                                    <div className='fw-bold mt-5'>Address</div>
                                    <div className='text-gray-600'>{userDetails?.fullAddress}</div>
                                    <div className='fw-bold mt-5'>Gender</div>
                                    <div className='text-gray-600'>
                                        {getNameBySelect(allGender, userDetails?.gender)}
                                    </div>
                                    <div className='fw-bold mt-5'>Phone</div>
                                    <div className='text-gray-600'>{userDetails?.phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-lg-row-fluid ms-lg-15'>
                    <Card className='pt-4 mb-6 mb-xl-9'>
                        <CardHeader name='Profile' />
                        <div className='card-body pt-0 pb-5'>
                            <table className='table align-middle table-row-dashed gy-5'>
                                <tbody className='fs-6 fw-semibold text-gray-600'>
                                    <tr>
                                        <td>Email</td>
                                        <td>{userDetails?.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td>******</td>
                                        <td className='text-end'>
                                            <button className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'>
                                                <span className='svg-icon'>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Roles</td>
                                        <td>{getRolesName(userDetails?.roles)}</td>
                                        <td className='text-end'>
                                            <button className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'>
                                                <span className='svg-icon'>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
            <ModalFormUserDetails
                isShowing={isFormUserDetails}
                hide={hanldeToggleFormUserDetails}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                allGender={allGender}
            />
        </>
    )
}

export default UserDetails
