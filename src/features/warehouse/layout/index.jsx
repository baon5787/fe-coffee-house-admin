import { Outlet, useLocation } from "react-router-dom";
import Wrapper from "~/components/wrapper";
import { getTitlePageWareHouse } from "~/utils/HandleTitlePage";

const WarehouseLayout = () => {

    const location = useLocation();

    const titlePageWareHouse = getTitlePageWareHouse(location.pathname);

    return (
        <Wrapper titlePage={titlePageWareHouse}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default WarehouseLayout;