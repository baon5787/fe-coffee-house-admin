import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Errors, FormCollapse, Input, InputGroup, InputPassword, Label, ListCheckBox } from '~/components/form';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal';
import { useBlur, useModal } from '~/hooks';
import UserValidation, { InitialUserValuesAdd } from '../validation/UserValidation';
import FormUserDetails from './FormUserDetails';
import useJwt from '~/hooks/useJwt';
import FormAddress from './FormAddress';
import useGender from '~/hooks/useGender';
import { useSelector } from 'react-redux';
import { provinceSelector } from '~/redux/selectors';
import { getSelectProvince } from '~/api/ApiSelect';
import { getValueString } from '~/utils/HandleValue';
import { createUser } from '../services/ApiUser';
import { getCheckBoxRoles } from '~/api/ApiCheckBox';
import { isEmptyArray } from '~/utils/CheckValue';

const ModalFormUser = (props, ref) => {

    const { showing, openModal, closeModal } = useModal();

    const { accessToken, dispatch, axiosJwt } = useJwt();

    useImperativeHandle(ref, () => ({
        addUser: () => {
            openModal();
        },
    }));

    const { allGender } = useGender(accessToken, dispatch, axiosJwt);

    const province = useSelector(provinceSelector);

    const [allProvince, setAllProvince] = useState([]);

    const [allDistrict, setAllDistrict] = useState([]);

    const [allWard, setAllWard] = useState([]);

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const loadProvince = async () => {
            let provinces = province;
            if (isEmptyArray(provinces)) {
                const data = await getSelectProvince(accessToken, dispatch, axiosJwt);
                provinces = data;
            }
            setAllProvince(provinces)
        }
        loadProvince()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const loadRole = () => {
            getCheckBoxRoles(accessToken, axiosJwt).then((data) => {
                setRoles(data);
            })
        }
        loadRole()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        reset(InitialUserValuesAdd())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        resolver: yupResolver(UserValidation(
            allProvince, allDistrict, allWard,
            allGender, accessToken, axiosJwt, dispatch
        )),
    });

    const { handleBlur } = useBlur(setValue);

    const onSubmit = async (data) => {
        console.log(data);

        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify(
            data
        )], {
            type: "application/json"
        }));
        formData.append("image", data.image);

        const title = await createUser(formData, accessToken, dispatch, axiosJwt, setError);

        // outputData(title, handleCloseModal);
    };

    const handleCloseModal = () => {
        reset(InitialUserValuesAdd())
        closeModal();
    }

    if (!showing) return;

    return createPortal(
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
                    <FormCollapse title='Profile'>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Email'} />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'text'}
                                name={'email'}
                                placeholder={'Email'}
                                onBlur={handleBlur}
                                values={getValueString(getValues('email'))}
                            />
                            {errors.email && <Errors title={errors.email.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Password'} />
                            <InputPassword
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                name={'password'}
                                placeholder={'Vui lòng nhập vào mật khẩu'}
                                onBlur={handleBlur}
                                values={getValueString(getValues('password'))}
                                autoComplete={'on'}
                            />
                            {errors.password && <Errors title={errors.password.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Confirm Password'} />
                            <InputPassword
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                name={'passwordConfirm'}
                                placeholder={'Vui lòng nhập lại mật khẩu'}
                                onBlur={handleBlur}
                                values={getValueString(getValues('passwordConfirm'))}
                                autoComplete={'on'}
                            />
                            {errors.passwordConfirm && <Errors title={errors.passwordConfirm.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Role'} />
                            <div className='fv-row mb-10'>
                                <ListCheckBox
                                    options={roles}
                                    register={{ ...register("roles") }}
                                    setValue={setValue}
                                    getValues={getValues("roles")}
                                    name={"roles"}
                                />
                            </div>
                            {errors.roles && <Errors title={errors.roles.message} />}
                        </InputGroup>
                    </FormCollapse>
                </ModalBody>
                <ModalFooter
                    focus={false}
                    loading={false}
                />
            </form>
        </Modal>
        , document.querySelector('body'),
    )
}

export default forwardRef(ModalFormUser);
