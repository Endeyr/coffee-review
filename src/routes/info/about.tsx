import Container from "@/components/container";

const AboutPage = () => {
  return (
    <Container className="flex-col justify-start">
      <h2 className="w-full text-center text-xl font-bold capitalize">
        About Us
      </h2>
      <div className="items-start justify-center gap-4 xl:grid xl:grid-cols-2">
        <div className="mt-2 hidden xl:block">{/* Image */}</div>
        <div className="flex flex-col items-start justify-start gap-2">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dignissimos architecto cupiditate accusantium deserunt accusamus
            quos nostrum, minus excepturi dolorem at eveniet consectetur odit
            itaque quasi perspiciatis modi animi facilis officia.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            nemo repellat rerum tempore perspiciatis placeat ut facere. Quia
            inventore earum eligendi iusto, atque alias temporibus accusamus
            placeat, esse tempore non?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            reiciendis id impedit ratione temporibus cum voluptatibus rerum
            aliquid in repellendus? Quis quam nihil provident minima voluptas
            aperiam esse laborum magni.
          </p>
          <p>
            {/* Call to Action link */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            obcaecati sed cupiditate a accusamus modi totam eos quia laborum,
            quam doloribus laudantium veniam repudiandae deleniti temporibus
            tenetur enim quas commodi.
          </p>
        </div>
      </div>
    </Container>
  );
};
export default AboutPage;
