import Container from "../container";

const Hero = () => {
  return (
    <Container id="hero-section">
      <div className="flex h-full w-full flex-col items-start justify-between gap-4 xl:w-1/2">
        <h2 className="my-4 w-full text-center text-4xl font-bold capitalize outline-black">
          Title
        </h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, iste
          distinctio dolor tempora error explicabo obcaecati nulla quisquam
          exercitationem eius eos modi autem delectus officiis non amet dolores
          repellat nemo.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, iste
          distinctio dolor tempora error explicabo obcaecati nulla quisquam
          exercitationem eius eos modi autem delectus officiis non amet dolores
          repellat nemo.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, iste
          distinctio dolor tempora error explicabo obcaecati nulla quisquam
          exercitationem eius eos modi autem delectus officiis non amet dolores
          repellat nemo.
        </p>
        {/* Shadcn modal */}
      </div>
    </Container>
  );
};
export default Hero;
