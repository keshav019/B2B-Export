import UserHome from "../user/UserHome";
import VendorHome from '../vendor/VendorHome';
import AdminHome from '../admin/AdminHome';
import { useSelector } from "react-redux";
const Home = () => {
    const { data } = useSelector(state => state.user);
    if (data && data.role === "vendor") {
        return (<>
            <VendorHome />
        </>)
    }
    if (data && data.role === "admin") {
        return (<>
            <AdminHome />
        </>)
    }
    return (<>
        <UserHome />
    </>)

}
export default Home;