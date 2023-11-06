import { memo, useEffect, useRef, useState } from "react";
import { CATEGORY, COUPON, DELIVERY, HEIGHT_LOGO, ORDER, PRODUCT, SIZE, USER, WAREHOUSE } from "~/constants/MenuItemSideBar";
import MenuItem from "./MenuItem";

const SideBar = ({ children }) => {
    const [height, setHeight] = useState(window.innerHeight - HEIGHT_LOGO);

    const sideBarRef = useRef();

    useEffect(() => {
        const handleUpdate = () => setHeight(window.innerHeight - HEIGHT_LOGO);
        window.addEventListener('resize', handleUpdate);
        return () => window.removeEventListener('resize', handleUpdate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerHeight])

    return (
        <div className='sidebar flex-[1_0_auto]' ref={sideBarRef}>
            <ul className='menu menu-column text-5 font-medium lg:mt-2 lg:mb-0 my-5 scroll-y max-lg:!h-sidebar'
                style={{ height: height }}
            >
                <MenuItem data={PRODUCT} sideBarRef={sideBarRef} />
                <MenuItem data={CATEGORY} sideBarRef={sideBarRef} />
                <MenuItem data={WAREHOUSE} sideBarRef={sideBarRef} />
                <MenuItem data={SIZE} sideBarRef={sideBarRef} />
                <MenuItem data={COUPON} sideBarRef={sideBarRef} />
                <MenuItem data={ORDER} sideBarRef={sideBarRef} />
                <MenuItem data={DELIVERY} sideBarRef={sideBarRef} />
                <MenuItem data={USER} sideBarRef={sideBarRef} />
            </ul>
        </div>
    )
}


export default memo(SideBar)