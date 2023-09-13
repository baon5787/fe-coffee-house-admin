import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isDimensionsSelector, isSideBarSelector } from "~/redux/selectors";
import logos from '~/images/logos/logo_img.png';
import { Menu, MenuItem } from "./components";
import { CATEGORY, COUPON, DELIVERY, ORDER, PRODUCT, SIZE, USER, WAREHOUSE } from "~/constants/MenuItemSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const Sidebar = (props, ref) => {

    const isDimensions = useSelector(isDimensionsSelector);

    const isSideBar = useSelector(isSideBarSelector);

    return (
        <>
            <aside ref={ref}
                className={
                    `${isDimensions ? isSideBar ? 'drawer drawer-start drawer-on' : 'drawer drawer-start'
                        : ''}`
                }
            >
                <div className='top flex-column-auto pt-9 pb-7 px-9'>
                    <Link to="/">
                        <div className='logo gap-sm-2'>
                            <img alt="Logo" src={logos} />
                            <h2 className='fw-bold fs-2 my-sm-0 text-gray-700'>COFFEE SHOP</h2>
                        </div>
                    </Link>
                </div>
                <Menu>
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={PRODUCT} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={CATEGORY} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={WAREHOUSE} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={SIZE} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={COUPON} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={ORDER} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={DELIVERY} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} data={USER} />
                </Menu>
            </aside >
        </>
    )
}

export default forwardRef(Sidebar);