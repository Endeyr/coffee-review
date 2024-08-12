import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <section className="w-full h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message || "An Error occurred"}</i>
        </p>
        <Button>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Button>
      </div>
    </section>
  );
}
