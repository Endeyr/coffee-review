import Container from "@/components/container";

const ContactPage = () => {
  return (
    <Container className="flex-col md:space-y-5">
      <h2 className="w-full text-center text-xl font-bold capitalize">
        Contact Us
      </h2>
      <div className="flex flex-col items-center justify-center gap-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus labore
          aspernatur, ea sapiente quae accusamus excepturi soluta officia ut,
          iste facilis recusandae corrupti sunt alias dicta adipisci animi
          expedita nulla?
        </p>
        <h3 className="text-center font-bold">Contact Form</h3>
        {/* shadcn Contact Form */}
        <div>
          <h3 className="mb-4 w-full text-center text-lg font-bold capitalize">
            Visit Us Today
          </h3>
          <div className="flex flex-col items-center justify-evenly gap-2">
            <p className="flex w-full justify-between">
              Visit Us:
              <span className="text-right">location</span>
            </p>
            <p className="flex w-full justify-between">
              Hours of Operation:{" "}
              <span className="text-right">Open 7 days a week</span>
            </p>
            <p className="flex w-full justify-between">
              Phone: <span className="text-right">555-555-5555</span>
            </p>
            <p className="flex w-full justify-between">
              Email: <span className="text-right">email@email.com</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ContactPage;
