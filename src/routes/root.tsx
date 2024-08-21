import Navbar from "@/components/navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Page layout
const Root = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <section className="w-full h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <Outlet
          context={{
            username,
            setUsername,
            isLoggedIn,
            setIsLoggedIn,
            notificationMessage,
            setNotificationMessage,
            isLoading,
            setIsLoading,
            errorMessage,
            setErrorMessage,
          }}
        />
      </div>
    </section>
  );
};
export default Root;
