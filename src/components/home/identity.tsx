import Container from "../container";

const Identity = () => {
  return (
    <Container className="grid-col-3 grid">
      {/* Image */}
      <div className="col-span-2 col-start-2 flex flex-col items-center justify-start gap-2">
        <h2 className="my-2 w-full text-center text-lg font-bold capitalize">
          Who are we?
        </h2>
        <p className="px-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
          qui odit, ut nulla perferendis obcaecati voluptas velit alias nesciunt
          porro, necessitatibus aliquam possimus totam minima magni quidem,
          optio sit officia.
        </p>
        <p className="px-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
          qui odit, ut nulla perferendis obcaecati voluptas velit alias nesciunt
          porro, necessitatibus aliquam possimus totam minima magni quidem,
          optio sit officia.
        </p>
        <p className="px-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
          qui odit, ut nulla perferendis obcaecati voluptas velit alias nesciunt
          porro, necessitatibus aliquam possimus totam minima magni quidem,
          optio sit officia.
        </p>
      </div>
    </Container>
  );
};
export default Identity;
