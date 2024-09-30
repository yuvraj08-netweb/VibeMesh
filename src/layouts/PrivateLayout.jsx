import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import PageLoader from "../components/Common/PageLoader";

const PrivateLayout = () => {
  const { loading, userDetails } = useSelector((state) => state.user);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof loading === "object") {
      return;
    }
    if (!loading && !userDetails) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userDetails?.fullName]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
