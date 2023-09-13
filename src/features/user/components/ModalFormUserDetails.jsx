import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal';
import PropTypes from 'prop-types'
import useJwt from '~/hooks/useJwt';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormUserDetails from './FormUserDetails';
import { useBlur } from '~/hooks';
import { getOptionSelect } from '~/utils/HandleValue';
import { getSelectDistrict, getSelectProvince, getSelectWard } from '~/api/ApiSelect';
import { useSelector } from 'react-redux';
import { provinceSelector } from '~/redux/selectors';
import FormAddress from './FormAddress';
import { InitialUserDetails, UserDetailsValidation } from '../validation/UserDetailsValidation';
import { updateUser } from '../services/ApiUser';
import { isEmptyArray } from '~/utils/CheckValue';

const ModalFormUserDetails = ({ isShowing, hide, userDetails, setUserDetails, allGender }) => {

    const { accessToken, dispatch, axiosJwt } = useJwt();

    const province = useSelector(provinceSelector);

    const [allProvince, setAllProvince] = useState([]);
    const [allDistrict, setAllDistrict] = useState([]);
    const [allWard, setAllWard] = useState([]);

    useEffect(() => {
        const loadUserDetails = async () => {

            if (!isShowing) return;

            if (!userDetails?.phovine || !userDetails?.district || !userDetails?.ward) return;

            const optionProvince = getOptionSelect(allProvince, userDetails?.phovine);

            const optionDistricts = getOptionSelect(allDistrict, userDetails?.district);

            const optionWard = getOptionSelect(allWard, userDetails?.ward);

            if (!isEmptyArray(optionProvince) && !isEmptyArray(optionDistricts)
                && !isEmptyArray(optionWard)) return;

            let provinces = province;
            if (isEmptyArray(provinces)) {
                const data = await getSelectProvince(accessToken, dispatch, axiosJwt);
                provinces = data;
            }

            const districts = await getSelectDistrict(userDetails?.phovine, accessToken, axiosJwt);

            const wards = await getSelectWard(userDetails?.phovine, userDetails?.district, accessToken,
                axiosJwt);

            setAllProvince(provinces);
            setAllDistrict(districts)
            setAllWard(wards)
        }
        loadUserDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowing])

    useEffect(() => {
        reset(InitialUserDetails(userDetails))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowing])

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(UserDetailsValidation(
            userDetails?.email, allProvince, allDistrict, allWard,
            allGender, accessToken, axiosJwt, dispatch
        )),
    });

    const { handleBlur } = useBlur(setValue);

    const onSubmit = async (data) => {
        console.group(data);

        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify(
            data
        )], {
            type: "application/json"
        }));
        formData.append("image", data.image);

        updateUser(userDetails?.email, formData, accessToken, dispatch,
            axiosJwt, setUserDetails, setError);
        // outputData(title, hide);
    };

    const handleCloseModal = () => {
        reset(InitialUserDetails(userDetails))
        hide();
    }

    return isShowing && createPortal(
        <Modal>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader
                    title='Add User'
                    onClose={handleCloseModal}
                />
                <ModalBody className='d-flex flex-column'>
                    <FormUserDetails
                        errors={errors}
                        getValues={getValues}
                        setValue={setValue}
                        setError={setError}
                        onBlur={handleBlur}
                        register={register}
                        allGender={allGender}
                    />
                    <FormAddress
                        errors={errors}
                        allProvince={allProvince}
                        allDistrict={allDistrict}
                        allWard={allWard}
                        setAllDistrict={setAllDistrict}
                        setAllWard={setAllWard}
                        getValues={getValues}
                        setValue={setValue}
                        accessToken={accessToken}
                        axiosJwt={axiosJwt}
                        onBlur={handleBlur}
                    />
                </ModalBody>
                <ModalFooter focus={false} />
            </form>
        </Modal>
        , document.querySelector('body')
    )
}

ModalFormUserDetails.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    userDetails: PropTypes.object.isRequired,
    setUserDetails: PropTypes.func.isRequired,
    allGender: PropTypes.any.isRequired
}

export default ModalFormUserDetails;
