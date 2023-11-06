import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { loadingCategorySelector } from '~/redux/selectors';
import useJwt from '~/hooks/useJwt';
import useModal from '~/hooks/useModal';
import useParam from '~/hooks/useParam';
import useStatus from '~/hooks/useStatus';
import {
    addSubCategory,
    getSubCategoryByCode, updateSubCategory
} from '../services/ApiCategories';
import { DEFAULT_INDEX, EMPTY_ARRAY } from '~/constants/AppConstant';
import { getSelectParentCategories } from '~/api/ApiSelect';
import { isObjectOneValue, isParam } from '~/utils/CheckValue';
import SubCategoryValidation, { InitialSubCategoryAdd, InitialSubCategoryUpdate } from '../validation/SubCategoryValidation';
import Loading from '~/components/loading';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal';
import { getTitleForm } from '~/utils/HandleValue';
import { Errors, Input, InputGroup, Label, Selection } from '~/components/form';


const ModalFormSubCategory = (props, ref) => {

    const loadingSumbit = useSelector(loadingCategorySelector);

    const { showing, openModal, closeModal } = useModal();

    const { param, setParam, resetParam } = useParam();

    useImperativeHandle(ref, () => ({
        addSubCategory: () => {
            openModal();
            setParam();
        },
        editSubCategory: (value) => {
            openModal();
            setParam(value);
        }
    }));

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const { allStatus } = useStatus();

    const [isLoading, setIsLoading] = useState(false);

    const [parents, setParents] = useState(EMPTY_ARRAY);

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        reset,
        control,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(SubCategoryValidation(accessToken, axiosJwt, dispatch,
            param, allStatus, parents)),
    });

    useEffect(() => {
        const handleLoad = async () => {
            if (!showing) return;

            const allParent = await getSelectParentCategories(accessToken, axiosJwt,
                handleCloseModal);

            if (allParent) {
                setParents(allParent);
                loadData();
            }
        }
        handleLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);

    const loadData = async () => {

        if (isParam(param)) {
            const data = await getSubCategoryByCode(param, accessToken, dispatch, navigate,
                axiosJwt, handleCloseModal);
            if (data) {
                reset(InitialSubCategoryUpdate(data));
                setIsLoading(true);
            }
        } else {
            reset(InitialSubCategoryAdd());
            setIsLoading(true);
        }
    }

    const onSubmit = (data) => {

        const parent = parents?.filter((parent) => parent?.value === data?.parent);
        if (!isObjectOneValue(parent)) {
            throw new Error('Vui lòng chọn lại loại sản phẩm cha');
        }

        const parentName = parent[DEFAULT_INDEX]?.label;

        if (isParam(param)) {
            updateSubCategory(param, data, accessToken, dispatch, axiosJwt, setError,
                parentName, handleCloseModal);
        } else {
            addSubCategory(data, accessToken, dispatch, axiosJwt, setError, parentName,
                handleCloseModal);
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
                <form className='flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader
                        title={`${getTitleForm(param)} danh mục con`}
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
                        <InputGroup className={'!mb-7'}>
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
                        <InputGroup>
                            <Label title={'Trạng thái loại sản phẩm'}
                                className='text-6 mb-2'
                            />
                            <Selection
                                options={parents}
                                name={'parent'}
                                control={control}
                                value={getValues("status")}
                                placeholder='Chọn danh mục cha'
                                noOptionsMessage='Không có danh mục cha'
                            />
                            {errors.parent && <Errors
                                title={errors.parent.message}
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

export default forwardRef(ModalFormSubCategory)