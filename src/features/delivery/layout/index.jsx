import { Outlet, useLocation, useParams } from "react-router-dom";
import Wrapper from "~/components/wrapper";
import { getTitlePageDelivery } from "~/utils/HandleTitlePage";

const DeliveryOrdersLayout = () => {
    const location = useLocation();
    const { code } = useParams();
    const titlePageProduct = getTitlePageDelivery(location.pathname, code);

    return (
        <Wrapper titlePage={titlePageProduct}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default DeliveryOrdersLayout;