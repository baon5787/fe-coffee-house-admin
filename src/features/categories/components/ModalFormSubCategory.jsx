import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Errors, InputGroup, Label, Selection, Input } from '~/components/form';
import { useBlur, useModal, useParam } from '~/hooks';
import SubCategoryValidation, { InitialValuesAdd, InitialValuesUpdate } from '../validation/SubCategoryValidation';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { loadingCategorySelector } from '~/redux/selectors';
import { DEFAULT_INDEX } from '~/constants/AppConstant';
import { getSelectParentCategories } from '~/api/ApiSelect';
import { addSubCategory, getSubCategoryByCode, updateSubCategory } from '../services/ApiCategories';
import { createPortal } from 'react-dom';
import Loading from '~/components/loading';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal';
import useJwt from '~/hooks/useJwt';
import useStatus from '~/hooks/useStatus';
import { isObjectOneValue, isParam } from '~/utils/CheckValue';

const ModalFormSubCategory = (props, ref) => {

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

    const loadingSumbit = useSelector(loadingCategorySelector);

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const { allStatus } = useStatus(accessToken, dispatch, axiosJwt);

    const [parents, setParents] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        getValues,
        setError,
        setValue,
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

            const allParent = await getSelectParentCategories(accessToken, dispatch, axiosJwt)
            setParents(allParent);

            loadData();
        }
        handleLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    const loadData = async () => {

        if (isParam(param)) {
            const data = await getSubCategoryByCode(param, accessToken, dispatch, navigate,
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

        const parent = parents?.filter((parent) => parent?.value === data?.parent);
        if (!isObjectOneValue(parent)) {
            throw new Error('Vui lòng chọn lại loại sản phẩm cha');
        }

        if (isParam(param)) {
            updateSubCategory(param, data, accessToken, dispatch, axiosJwt, setError,
                parent[DEFAULT_INDEX]?.label, handleCloseModal);
        } else {
            addSubCategory(data, accessToken, dispatch, axiosJwt, setError,
                parent[DEFAULT_INDEX]?.label, handleCloseModal);
        }
    }

    const handleCloseModal = () => {
        setIsLoading(false);
        closeModal();
        resetParam();
    }

    if (!showing || !isLoading) return;

    console.log(showing);

    return createPortal(
        <>
            {
                loadingSumbit && <Loading />
            }
            <Modal>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader
                        title={isParam(param) ? 'Update Sub Category' : 'Add Sub Category'}
                        onClose={handleCloseModal}
                    />
                    <ModalBody>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Name'} />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'text'}
                                name={'name'}
                                placeholder={'Name Sub Category'}
                                onBlur={handleBlur}
                                values={getValues("name") ? getValues("name") : ""}
                            />
                            {errors.name && <Errors title={errors.name.message} />}
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Code'} />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'text'}
                                name={'code'}
                                placeholder={'Code Sub Category'}
                                onBlur={handleBlur}
                                values={getValues("code") ? getValues("code") : ""}
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
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Parent Category'} />
                            <Selection options={parents}
                                name={"parent"}
                                control={control}
                                value={getValues("parent")}
                                placeholder='Chọn danh mục cha'
                                noOptionsMessage='Không có danh mục cha'
                            />
                            {errors.parent && <Errors title={errors.parent.message} />}
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

export default forwardRef(ModalFormSubCategory);