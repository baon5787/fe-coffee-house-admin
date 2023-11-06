import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useJwt from '~/hooks/useJwt';
import useModal from '~/hooks/useModal';
import useParam from '~/hooks/useParam';
import { loadingCategorySelector } from '~/redux/selectors';
import ParentCategoryValidation, { InitialParentCategoryAdd, InitialParentCategoryUpdate } from '../validation/ParentCategoryValidation';
import useStatus from '~/hooks/useStatus';
import { isParam } from '~/utils/CheckValue';
import { addParentCategory, getParentCategoryByCode, updateParentCategory } from '../services/ApiCategories';
import { createPortal } from 'react-dom';
import Loading from '~/components/loading';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal';
import { Errors, Input, InputGroup, Label, Selection } from '~/components/form';
import { getTitleForm } from '~/utils/HandleValue';

const ModalFormParentCategory = (props, ref) => {

    const loadingSumbit = useSelector(loadingCategorySelector);

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

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const { allStatus } = useStatus();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        reset,
        control,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        reValidateMode: 'onBlur',
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
            const data = await getParentCategoryByCode(param, accessToken, dispatch,
                navigate, axiosJwt, handleCloseModal);
            console.log(data);
            if (data) {
                console.log('a')
                reset(InitialParentCategoryUpdate(data));
                console.log('b')
                setIsLoading(true);
            }
        } else {
            reset(InitialParentCategoryAdd());
            setIsLoading(true);
        }
    }

    const handleCloseModal = () => {
        setIsLoading(false);
        closeModal();
        resetParam();
    }

    const onSubmit = (data) => {

        if (isParam(param)) {
            updateParentCategory(param, data, accessToken, dispatch, axiosJwt, setError,
                handleCloseModal);
        } else {
            addParentCategory(data, accessToken, dispatch, axiosJwt, setError,
                handleCloseModal);
        }
    };

    if (!showing || !isLoading) return;

    return createPortal(
        <>
            {
                loadingSumbit && <Loading />
            }
            <Modal>
                <form className='flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader
                        title={`${getTitleForm(param)} danh mục cha`}
                        onClose={handleCloseModal}
                    />
                    <ModalBody>
                        <InputGroup className={'!mb-7'}>
                            <Label title={'Tên sản phẩm'}
                                className='text-6 mb-2'
                            />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'text'}
                                placeholder={'Vui lòng nhập tên loại sản phẩm chính'}
                                register={register('name')}
                            />
                            {errors.name && <Errors title={errors.name.message} />}
                        </InputGroup>
                        <InputGroup className={'!mb-7'}>
                            <Label title={'Tên sản phẩm'}
                                className='text-6 mb-2'
                            />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'text'}
                                placeholder={'Vui lòng nhập mã loại sản phẩm chính'}
                                register={register('code')}
                            />
                            {errors.code && <Errors title={errors.code.message} />}
                        </InputGroup>
                        <InputGroup>
                            <Label title={'Trạng thái loại sản phẩm'}
                                className='text-6 mb-2'
                            />
                            <Selection
                                options={allStatus}
                                name={'status'}
                                control={control}
                                value={getValues("status")}
                                placeholder='Chọn trạng thái loại sản phẩm'
                                noOptionsMessage='Không có trạng thái loại sản phẩm'
                            />
                            {errors.status && <Errors
                                title={errors.status.message}
                                className='text-start'
                            />}
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter
                        onClose={handleCloseModal}
                        param={param}
                    />
                </form>
            </Modal>
        </>,
        document.querySelector('body'),
    )
}

export default forwardRef(ModalFormParentCategory)