import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Errors, Input, InputGroup, Label } from '~/components/form'
import Loading from '~/components/loading'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '~/components/modal'
import Selects from '~/components/select'
import { useBlur, useModal, useParam } from '~/hooks'
import useJwt from '~/hooks/useJwt'
import { loadingWarehouseSelector } from '~/redux/selectors'
import { getValueNumber, setArraySelect } from '~/utils/HandleValue'
import WarehouseValidation, { InitialWarehouseUpdate } from '../validation/WarehouseValidation'
import { isValueNumber, isValueString } from '~/utils/CheckValue'
import { getWarehouseByProductIdAndSizeId, updateWarehouse } from '../services/ApiWarehouse'
import { DEFAULT_INDEX } from '~/constants/AppConstant'

const ModalFormWarehouse = (props, ref) => {

    const { showing, openModal, closeModal } = useModal();

    const { param, setParam, resetParam } = useParam();

    useImperativeHandle(ref, () => ({
        editWarehouse: (value) => {
            openModal();
            setParam(value);
        }
    }));

    const {
        handleSubmit,
        getValues,
        setError,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(WarehouseValidation()),
    });

    const loadingSumbit = useSelector(loadingWarehouseSelector);

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const [products, setProducts] = useState([]);

    const [sizes, setSizes] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleLoad = async () => {
            if (param === null || !isValueNumber(param?.productId) || !isValueNumber(param?.sizeId)
                || !isValueString(accessToken) || !showing) return;

            const data = await getWarehouseByProductIdAndSizeId(param?.productId, param?.sizeId,
                accessToken, dispatch, navigate, axiosJwt, handleCloseModal);
            if (data) {
                setProducts(setArraySelect(data?.productName))
                setSizes(setArraySelect(data?.sizeName))
                reset(InitialWarehouseUpdate(data));
                setIsLoading(true);
            }
        }
        handleLoad()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    const { handleBlur } = useBlur(setValue);

    const onSubmit = (data) => {

        if (!param.productId || !param.sizeId) return

        updateWarehouse(param?.productId, param?.sizeId, data, accessToken, dispatch, axiosJwt,
            setError, handleCloseModal);
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
                        title={`Update Warehouse`}
                        onClose={handleCloseModal}
                    />
                    <ModalBody>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Product Name'} />
                            <Selects
                                options={products}
                                value={products[DEFAULT_INDEX]}
                            />
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Size Name Category'} />
                            <Selects
                                options={sizes}
                                value={sizes[DEFAULT_INDEX]}
                            />
                        </InputGroup>
                        <InputGroup className={'mb-7'} >
                            <Label className={'fs-6 mb-2'} title={'Quantity'} />
                            <Input
                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                type={'number'}
                                name={'quantity'}
                                placeholder={'Quantity'}
                                onBlur={handleBlur}
                                values={getValueNumber(getValues('quantity'))}
                            />
                            {errors?.quantity && <Errors title={errors?.quantity?.message} />}
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

export default forwardRef(ModalFormWarehouse)
