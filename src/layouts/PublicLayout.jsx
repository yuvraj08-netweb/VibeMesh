import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import PageLoader from "../components/Common/PageLoader";

const PublicLayout = () => {
  const { loading, userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof loading === "object") {
      return;
    }
    if (userDetails) {
      navigate("/userArea");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userDetails]);

  if (loading) {
    return <PageLoader/>;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicLayout;
