import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { userLogout, userReset } from "@/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    if (user) {
      dispatch(userLogout());
      dispatch(userReset());
      navigate("/");
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <>
        <Link to={"/"}>Logo</Link>
      </>
      <>
        <Button>
          <Link to={"auth/login"}></Link>
        </Button>
        <Button>
          <Link to={"auth/register"}></Link>
        </Button>
        <Button onClick={onLogout}></Button>
      </>
      {/* Mobile Nav */}
    </>
  );
};
export default Navbar;
