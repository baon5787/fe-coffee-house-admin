import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal'
import SizeValidation, { InitialSizeAdd, InitialSizeUpdate } from '../validation/SizeValidation'
import { useBlur, useModal, useParam } from '~/hooks'
import { addSize, getSizeByCode, updateSize } from '../services/ApiSize'
import { isParam } from '~/utils/CheckValue';
import useJwt from '~/hooks/useJwt';
import { useSelector } from 'react-redux';
import { loadingSizeSelector } from '~/redux/selectors';
import Loading from '~/components/loading';
import InputGroup from '~/components/form/InputGroup';
import Label from '~/components/form/Label';
import Input from '~/components/form/Input';
import Errors from '~/components/form/Errors';

const ModalFormSize = (props, ref) => {

    const { showing, openModal, closeModal } = useModal();

    const { param, setParam, resetParam } = useParam();

    useImperativeHandle(ref, () => ({
        addSize: () => {
            openModal();
            setParam();
        },
        editSize: (value) => {
            openModal();
            setParam(value);
        }
    }));

    const loadingSumbit = useSelector(loadingSizeSelector);

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        getValues,
        setError,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(SizeValidation(accessToken, axiosJwt, dispatch, param)),
    });

    const { handleBlur } = useBlur(setValue);

    useEffect(() => {
        const handleLoad = async () => {

            if (param === null) return;
            loadData(param);
        }
        handleLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    const loadData = async (code) => {
        if (isParam(param)) {
            const size = await getSizeByCode(code, accessToken, dispatch, navigate, axiosJwt,
                handleCloseModal);
            if (size) {
                reset(InitialSizeUpdate(size));
                setIsLoading(true);
            }
        } else {
            reset(InitialSizeAdd());
            setIsLoading(true);
        }
    }

    const onSubmit = (data) => {
        if (isParam(param)) {
            updateSize(param, data, accessToken, dispatch, axiosJwt, setError,
                handleCloseModal);
        } else {
            addSize(data, accessToken, dispatch, axiosJwt, setError, handleCloseModal);
        }
    }

    const handleCloseModal = () => {
        setIsLoading(false);
        closeModal();
        resetParam();
    }

    if (!showing || !isLoading) return;

    return createPortal(
        <>
            {
                loadingSumbit && <Loading />
            }
            <Modal>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader
                        title={isParam(param) ? 'Update Size' : 'Add Size'}
                        onClose={handleCloseModal}
                    />
                    <ModalBody>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Name'} />
                            <Input
                                className={'form-control form-control-solid'}
                                type={'text'}
                                name={'name'}
                                placeholder={'Name Size'}
                                onBlur={handleBlur}
                                values={getValues('name') ? getValues('name') : ''}
                            />
                            {errors?.name && <Errors title={errors?.name?.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Code'} />
                            <Input
                                className={'form-control form-control-solid'}
                                type={'text'}
                                name={'code'}
                                placeholder={'Code Size'}
                                onBlur={handleBlur}
                                values={getValues('code') ? getValues('code') : ''}
                            />
                            {errors?.code && <Errors title={errors?.code?.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Price'} />
                            <Input
                                className={'form-control form-control-solid'}
                                type={'number'}
                                name={'price'}
                                placeholder={'Price Size'}
                                onBlur={handleBlur}
                                values={getValues('price') ? getValues('price') : 0}
                            />
                            {errors?.price && <Errors title={errors?.price?.message} />}
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter
                        focus={false}
                        loading={false}
                    />
                </form>
            </Modal>
        </>
        , document.querySelector('body'),
    )
}

export default forwardRef(ModalFormSize)
