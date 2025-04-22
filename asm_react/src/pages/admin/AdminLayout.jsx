import { Outlet } from "react-router-dom";
import AdminHeader from "./Header"; 
import Dashboard from "./Dashboard";

const AdminLayout = () => {
  return (
    <div className="d-flex">
        <AdminHeader />
      <div className="content flex-grow-1 p-3" style={{ marginLeft: "250px" }}>
        <div className="container">
       
          
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
