import React, { useEffect, useRef, useState } from 'react'
import styles from './Product.module.css';
import { BsFillPencilFill } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'
import Selection from '~/components/Selection';

import { storage } from '~/config/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { CheckBox, Header, InputGroup } from '~/components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSucces } from '~/redux/authSlice';
import { createAxios } from '~/createInstance';
import { getStatus } from '~/api/ApiStatus';
import { getSizes } from '~/api/ApiSize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProductValidation, { InitialValues } from '~/validation/ProductValidation';
import { addProduct } from '~/api/ApiProduct';

const AddProduct = () => {

    const user = useSelector((state) => state.auth.login?.currentUser);
    const status = useSelector((state) => state.status.statuses?.statusAll);
    const sizes = useSelector((state) => state.size.sizes?.sizeAll);

    const [sizeAll, setSize] = useState(sizes.map((size) => {
        return { ...size, isChecked: false }
    }));
    const [baseImage, setBaseImage] = useState("");


    const inputFile = useRef();

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);

        const date = new Date();

        const imageRef = ref(storage, `images/product/` + date.getTime());
        uploadBytes(imageRef, file).then(() => {
            alert("upload success")
        })
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let axiosJwt = createAxios(user, dispatch, loginSucces, navigate);

    useEffect(() => {
        function axiosLoadData() {
            if (user?.accessToken) {
                getStatus(user?.accessToken, dispatch, axiosJwt);
                getSizes(user?.accessToken, dispatch, axiosJwt);
            }
        }
        axiosLoadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: InitialValues(status[0].value),
        resolver: yupResolver(ProductValidation(""))
    });

    const onSubmit = (data) => {
        //alert(JSON.stringify(data))
        addProduct(JSON.stringify(data), user?.accessToken, dispatch, navigate, axiosJwt)
    };

    const handleChange = (e) => {
        const { value, checked } = e.target;

        if (value === "ALL") {

            let values = [];

            let tempSize = sizeAll.map((size) => {

                checked && values.push(size.id.toString())

                return { ...size, isChecked: checked }
            });
            setSize(tempSize)
            setValue("size", values)
        } else {
            let tempSize = sizeAll.map((size) =>
                size.id.toString() === value ? { ...size, isChecked: checked } : size
            );
            setSize(tempSize)
        }
    }


    return (
        <>
            <div className='content d-flex flex-column flex-column-fluid fs-6'>
                <div className='container-xxl'>
                    <form className='form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
                            {/* begin::Thumbnail settings */}
                            <div className='card card-flush py-4'>
                                <Header name={"Hình ảnh sản phẩm"} />
                                <div className='card-body text-center pt-0'>
                                    {/* begin::Image input*/}
                                    <div
                                        className={`image-input image-input-outline mb-3 ${styles.image} ${baseImage !== "" ? 'image-input-changed' : 'image-input-empty'}`}
                                    >
                                        {/* begin::Preview existing avatar */}
                                        <div className='image-input-wrapper w-150px h-150px'
                                            style={{ backgroundImage: `${baseImage !== "" ? `url(${baseImage})` : ``}` }}
                                        ></div>
                                        {/* end::Preview existing avatar */}
                                        {/* begin::Label */}
                                        <label className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                            data-kt-image-input-action="change"
                                        >
                                            <i className='bi bi-pencil-fill fs-7'><BsFillPencilFill size={13} /></i>
                                            <input type="file" name="avatar" accept=".png, .jpg, .jpeg" ref={inputFile}
                                                onChange={(event) => uploadImage(event)}
                                            />
                                            <input type="hidden" name="avatar_remove" />
                                        </label>
                                        {/* end::Label */}
                                        {/* begin::Cancel */}
                                        <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                            data-kt-image-input-action="cancel" onClick={() => setBaseImage("")}
                                        >
                                            <i className={`bi bi-x fs-2`}>
                                                <VscChromeClose size={15} />
                                            </i>
                                        </span>
                                        {/* end::Cancel */}
                                        {/* begin::Remove */}
                                        <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                            data-kt-image-input-action="remove"
                                        >
                                            <i className='bi bi-x fs-2'></i>
                                        </span>
                                        {/* end::Remove */}
                                    </div>
                                    {/* end::Image input*/}
                                </div>
                            </div>
                            {/* end::Thumbnail settings */}
                            {/* begin::Status */}
                            <div className='card card-flush py-4'>
                                {/* begin::Card header */}
                                <Header name={"Trạng thái"}>
                                    <div className='card-toolbar'>
                                        <div className='rounded-circle bg-success w-15px h-15px'></div>
                                    </div>
                                </Header>
                                {/* end::Card header */}
                                {/* begin::Card body */}
                                <div className='card-body pt-0'>
                                    <Selection options={status} name={"status"} control={control} value={getValues("status")} />
                                </div>
                                {/* end::Card body */}
                            </div>
                            {/* end::Status */}
                            {/* begin::Category */}
                            <div className='card card-flush py-4'>
                                {/* begin::Card header */}
                                <Header name={"Loại sản phẩm"} />
                                {/* end::Card header */}
                                {/* begin::Card body */}
                                <div className='card-body pt-0'>
                                    <Selection options={status} name={"category"} control={control} value={getValues("category")} />
                                </div>
                                {/* end::Card body */}
                            </div>
                            {/* end::Category */}
                        </div>
                        {/* begin::Main column */}
                        <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
                            {/* begin::Tab content */}
                            <div className='tab-content'>
                                <div className='tab-pane fade active show'>
                                    <div className='d-flex flex-column gap-7 gap-lg-10'>
                                        {/* begin::General options */}
                                        <div className='card card-flush py-4'>
                                            {/* begin::Card body */}
                                            <div className='card-body pt-0'>
                                                <InputGroup className={"mb-10"}>
                                                    <label className='required form-label'>Tên sản phẩm</label>
                                                    <input type="text"
                                                        className='form-control mb-2'
                                                        placeholder="Vui lòng nhập tên sản phẩm"
                                                        {...register("name")}
                                                    />
                                                    {errors.name && <p>{errors.name.message}</p>}
                                                </InputGroup>
                                                <InputGroup className={"mb-10"}>
                                                    <label className='required form-label'>Kí hiệu sản phẩm</label>
                                                    <input type="text"
                                                        name='sku'
                                                        className='form-control mb-2'
                                                        placeholder="Vui lòng kí hiệu sản phẩm"
                                                        {...register("sku")}
                                                    />
                                                    {errors.sku && <p>{errors.sku.message}</p>}
                                                </InputGroup>
                                                <InputGroup className={"mb-10"}>
                                                    <label className='required form-label'>Giá sản phẩm</label>
                                                    <input type="number"
                                                        name='price'
                                                        className='form-control mb-2'
                                                        placeholder="Vui lòng nhập giá sản phẩm"
                                                        {...register("price")}
                                                    />
                                                    {errors.price && <p>{errors.price.message}</p>}
                                                </InputGroup>
                                                <InputGroup className={"mb-10"}>
                                                    <label className='required form-label'>Mô tả sản phẩm</label>
                                                    <textarea
                                                        name='description'
                                                        className='form-control form-control-solid min-h-150px'
                                                        placeholder="Vui lòng nhập nội dung sản phẩm"
                                                        {...register("description")}
                                                    />
                                                    {errors.description && <p>{errors.description.message}</p>}
                                                </InputGroup>
                                            </div>
                                            {/* end::Card body */}
                                        </div>
                                        {/* end::General options */}
                                        {/* begin::Product size */}
                                        <div className='card card-flush py-4'>
                                            <Header name={"Kích thước sản phẩm"} />
                                            <div className='card-body pt-0'>
                                                <div className='fv-row mb-10'>
                                                    <div className='row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9'>
                                                        {
                                                            sizeAll?.map((item, index) => {
                                                                return <CheckBox key={index}
                                                                    title={`${item.name} + ${item.price}`}
                                                                    value={item.id}
                                                                    register={{ ...register("size") }}
                                                                    onChange={(e) => handleChange(e)}
                                                                    isChecked={item?.isChecked || false}
                                                                />
                                                            })
                                                        }
                                                        <CheckBox title={"ALL"}
                                                            value={"ALL"}
                                                            onChange={(e) => handleChange(e)}
                                                            isChecked={sizeAll.filter((size) => size?.isChecked !== true).length <= 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end::Product size */}
                                    </div>
                                </div>
                            </div>
                            {/* end::Tab content */}
                            <div className='d-flex justify-content-end'>
                                <button type="submit" className='btn btn-primary'>
                                    <span className='indicator-label'>
                                        Save Changes
                                    </span>
                                    <span className='indicator-progress'>
                                        Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                        {/* end::Main column */}
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct;
