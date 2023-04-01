import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "~/api/ApiProduct";
import Actions from "~/components/Actions";
import { createAxios } from "~/createInstance";
import { loginSucces } from "~/redux/authSlice";

const Home = () => {


    const user = useSelector((state) => state.auth.login?.currentUser);

    const products = useSelector((state) => state.products.product?.allProduct);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let axiosJwt = createAxios(user, dispatch, loginSucces, navigate);

    useEffect(() => {
        const handle = () => {
            if (user?.accessToken) {
                getProducts(user?.accessToken, dispatch, axiosJwt);
            }
        }
        handle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteMess = (event, sku) => {
        deleteProduct(sku, user?.accessToken, dispatch, axiosJwt);
    }

    function handleClick(event, code) {
        console.log('Function ran in Child component' + code);
    }

    return (
        <>
            <div className='content d-flex flex-column flex-column-fluid fs-6" id="kt_content'>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body p-10'>
                            <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                                <div className='table-responsive'>
                                    <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'>
                                        <thead>
                                            <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                                <th className='min-w-25px'>Số thứ tự</th>
                                                <th className='min-w-125px sorting'>Tên sản phẩm</th>
                                                <th className='min-w-80px sorting'>Giá</th>
                                                <th className='min-w-125px'>Kí hiệu</th>
                                                <th className='min-w-125px'>Status</th>
                                                <th className='text-end min-w-70px sorting_disabled'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='fw-semibold text-gray-600'>
                                            {
                                                products?.map((item, index) => {
                                                    return (
                                                        <tr className='odd' key={index}>
                                                            <td>{index}</td>
                                                            <td>
                                                                <div className='d-flex align-items-center'>
                                                                    <Link className='symbol symbol-50px'>
                                                                        <span className='symbol-label' style={{ backgroundImage: `url(http://localhost:8080${item.imagebase64.replace("../", "/")})` }} ></span>
                                                                    </Link>
                                                                    <div className='ms-5'>
                                                                        <Link className='text-gray-800 text-hover-primary fs-5 fw-bold'>
                                                                            {item.name}
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{item.price}</td>
                                                            <td>{item.sku}</td>
                                                            <td><div className='badge badge-light-success'>{item.status}</div></td>
                                                            <td className='text-end'>
                                                                <Actions deleteMess={event => deleteMess(event, item.sku)} editProduct={event => handleClick(event, item.sku)} />
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;