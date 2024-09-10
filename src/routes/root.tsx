import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { IContext } from "@/types/routes/types";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Page layout
const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <section className="relative min-h-screen w-full">
      <Navbar />
      <main className="mx-auto">
        <Outlet
          context={
            {
              isLoggedIn,
              setIsLoggedIn,
            } satisfies IContext
          }
        />
      </main>
      <Footer />
    </section>
  );
};
export default Root;
