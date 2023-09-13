import { Outlet, useLocation } from "react-router-dom";
import Wrapper from "~/components/wrapper";
import { getTitlePageCoupon } from "~/utils/HandleTitlePage";


const CouponLayout = () => {
    const location = useLocation();
    const titlePageProduct = getTitlePageCoupon(location.pathname);

    return (
        <Wrapper titlePage={titlePageProduct}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default CouponLayout;