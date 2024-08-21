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
      <nav className="flex justify-between">
        <div className="flex items-center m-2">
          <Button>
            <Link to={"/"}>Home</Link>
          </Button>
        </div>
        <ul className="flex items-center gap-2 m-2">
          {!user ? (
            <>
              <li>
                <Button>
                  <Link to={"/auth/login"}>Login</Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link to={"/auth/register"}>Register</Link>
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Button onClick={onLogout}>Logout</Button>
            </li>
          )}
        </ul>
      </nav>
      {/* Mobile Nav */}
    </>
  );
};
export default Navbar;
