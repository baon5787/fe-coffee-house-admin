import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { CloseIcon } from '~/components/icons';
import { Modal } from '~/components/modal';
import { useBlur, useModal, useParam } from '~/hooks';
import { loadingProductSizeSelector } from '~/redux/selectors';
import { getProductSizeByProductIdAndSizeId, updateProductSize } from '../services/ApiProductSize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProductSizeValidation, { InitialProductSizeUpdate } from '../validation/ProductSizeValidation';
import { Errors, Input, InputGroup, Label } from '~/components/form';
import { getValueNumber, setArraySelect } from '~/utils/HandleValue';
import Selects from '~/components/select';
import useJwt from '~/hooks/useJwt';
import Loading from '~/components/loading';
import { DEFAULT_INDEX } from '~/constants/AppConstant';

const ModalFormProductSize = (props, ref) => {

    const { showing, openModal, closeModal } = useModal();

    const { param, setParam, resetParam } = useParam();

    useImperativeHandle(ref, () => ({
        editProductSize: (value) => {
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
        resolver: yupResolver(ProductSizeValidation()),
    });

    const loadingSumbit = useSelector(loadingProductSizeSelector);

    const { accessToken, dispatch, navigate, axiosJwt } = useJwt();

    const [products, setProducts] = useState([]);

    const [sizes, setSizes] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleLoad = async () => {
            if (param === null || !param?.productId || !param?.sizeId || !accessToken
                || !showing) return;

            const data = await getProductSizeByProductIdAndSizeId(param?.productId, param?.sizeId,
                accessToken, dispatch, navigate, axiosJwt, handleCloseModal);
            if (data) {
                setProducts(setArraySelect(data?.productName))
                setSizes(setArraySelect(data?.sizeName))
                reset(InitialProductSizeUpdate(data));
                setIsLoading(true);
            }
        }
        handleLoad()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    const { handleBlur } = useBlur(setValue);

    const onSubmit = (data) => {

        if (!param.productId || !param.sizeId) return

        updateProductSize(param?.productId, param?.sizeId, data, accessToken, dispatch, axiosJwt,
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
                    <div className='modal-header'>
                        <h2 className='fw-bold'>Add a Customer</h2>
                        <div className='btn btn-icon btn-sm btn-active-icon-primary'
                            onClick={handleCloseModal}
                        >
                            <span className='svg-icon svg-icon-1'>
                                <CloseIcon size={24} />
                            </span>
                        </div>
                    </div>
                    <div className='modal-body py-10 px-lg-17'>
                        <div className='scroll-y pe-7 mh-250px'>
                            <InputGroup className={'mb-7'} >
                                <Label className={'fs-6 mb-2'} title={'Product Name Category'} />
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
                        </div>
                    </div>
                    <div className='modal-footer flex-center'>
                        <button type="submit" className='btn btn-primary'>
                            <span className='indicator-label'>
                                Submit
                            </span>
                        </button>
                    </div>
                </form>
            </Modal>
        </>,
        document.querySelector('body'),
    )
}

export default forwardRef(ModalFormProductSize);
