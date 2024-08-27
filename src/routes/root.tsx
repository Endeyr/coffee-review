import Navbar from "@/components/navbar";
import type { IContext } from "@/types/routes/types";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Page layout
const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <section className="h-screen w-full">
      <Navbar />
      <div className="flex h-[91dvh] flex-col items-center justify-center gap-2">
        <Outlet
          context={
            {
              isLoggedIn,
              setIsLoggedIn,
            } satisfies IContext
          }
        />
      </div>
    </section>
  );
};
export default Root;
