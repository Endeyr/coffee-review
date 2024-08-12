import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <section className="w-full h-screen">
      <div className="flex items-center justify-center h-full">
        <Outlet />
      </div>
    </section>
  );
};
export default Root;
