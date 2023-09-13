import { Outlet, useLocation } from "react-router-dom";
import Wrapper from "~/components/wrapper";
import { getTitlePageUser } from "~/utils/HandleTitlePage";


const UserLayout = () => {

    const location = useLocation();

    const titlePageSize = getTitlePageUser(location.pathname);

    return (
        <Wrapper titlePage={titlePageSize}>
            <Outlet context={location.pathname} />
        </Wrapper>
    )
}

export default UserLayout;