import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  // Get token from local storage
  const storedData = JSON.parse(localStorage.getItem("userdata"));
  const {auth}= useSelector((state)=>state)
  useEffect(() => {
    if (!auth.isAuthenticated || auth .isAuthenticated=== null) {
      navigate("/product");
    }
  }, [navigate, storedData]);

  // Directly return the JSX
  return <Outlet />;
}

export default ProtectedRoute;
