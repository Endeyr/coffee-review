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
      <header className="sticky top-0 z-50 hidden justify-between border-b bg-white dark:bg-black md:block">
        <div className="flex h-16 items-center p-[50px]">
          <div className="mx-auto w-full space-y-20">
            <div className="flex justify-between">
              {/* Left Side */}
              <div className="flex items-center justify-start gap-4">
                <Button>
                  <Link to={"/"}>Home</Link>
                </Button>
              </div>
              {/* Right Side */}
              <nav className="flex items-center justify-end">
                <ul className="flex items-center gap-4 space-x-1">
                  {!user ? (
                    <>
                      <li>
                        <Button>
                          <Link to={"/google/map"}>Map</Link>
                        </Button>
                      </li>
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
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Nav */}
    </>
  );
};
export default Navbar;
