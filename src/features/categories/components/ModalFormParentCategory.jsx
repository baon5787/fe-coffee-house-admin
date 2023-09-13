import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom';
import { Errors, Input, InputGroup, Label, Selection } from '~/components/form';
import { useBlur, useModal, useParam } from '~/hooks';
import ParentCategoryValidation, { InitialValuesAdd, InitialValuesUpdate } from '../validation/ParentCategoryValidation';
import { useSelector } from 'react-redux';
import { loadingCategorySelector } from '~/redux/selectors';
import { useForm } from 'react-hook-form';
import {
    addParentCategory, getParentCategoryByCode, updateParentCategory
} from '../services/ApiCategories';
import Loading from '~/components/loading';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal';
import { getValueString } from '~/utils/HandleValue';
import useJwt from '~/hooks/useJwt';
import useStatus from '~/hooks/useStatus';
import { isParam } from '~/utils/CheckValue';

export const ModalFormParentCategory = (props, ref) => {

    const { showing, openModal, closeModal } = useModal();

    const { param, setParam, resetParam } = useParam();

    useImperativeHandle(ref, () => ({
        addParentCategory: () => {
            openModal();
            setParam();
        },
        editParentCategory: (value) => {
            openModal();
            setParam(value);
        }
    }));

    const loadingSumbit = useSelector(loadingCategorySelector);

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const { allStatus } = useStatus(accessToken, dispatch, axiosJwt);

    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        getValues,
        setValue,
        setError,
        reset,
        control,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(ParentCategoryValidation(accessToken, axiosJwt, dispatch,
            param, allStatus)),
    });


    useEffect(() => {
        const handleLoad = () => {
            if (!showing) return;

            loadData();
        }
        handleLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    const loadData = async () => {

        if (isParam(param)) {
            const data = await getParentCategoryByCode(param, accessToken, dispatch, navigate,
                axiosJwt, handleCloseModal);
            if (data) {
                reset(InitialValuesUpdate(data));
                setIsLoading(true);
            }
        } else {
            reset(InitialValuesAdd());
            setIsLoading(true);
        }
    }

    const { handleBlur } = useBlur(setValue);


    const onSubmit = (data) => {

        if (isParam(param)) {
            updateParentCategory(param, data, accessToken, dispatch, axiosJwt, setError,
                handleCloseModal);
        } else {
            addParentCategory(data, accessToken, dispatch, axiosJwt, setError, handleCloseModal);
        }
    };

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
                        title={isParam(param) ? 'Update Parent Category' : 'Add Parent Category'}
                        onClose={handleCloseModal}
                    />
                    <ModalBody>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Name'} />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'text'}
                                name={'name'}
                                placeholder={'Name Parent Category'}
                                onBlur={handleBlur}
                                values={getValueString(getValues("name"))}
                            />
                            {errors.name && <Errors title={errors.name.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Code'} />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'text'}
                                name={'code'}
                                placeholder={'Code Parent Category'}
                                onBlur={handleBlur}
                                values={getValueString(getValues('code'))}
                            />
                            {errors.code && <Errors title={errors.code.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Status'} />
                            <Selection options={allStatus}
                                name={"status"}
                                control={control}
                                value={getValues("status")}
                                placeholder='Chọn trạng thái sản phẩm'
                                noOptionsMessage='Không có trạng thái sản phẩm'
                            />
                            {errors.status && <Errors title={errors.status.message} />}
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter
                        focus={false}
                        loading={false}
                    />
                </form>
            </Modal>
        </>,
        document.querySelector('body'),
    )
}

export default forwardRef(ModalFormParentCategory);