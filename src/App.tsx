import CallToAction from "./components/home/callToAction";
import Hero from "./components/home/hero";
import Identity from "./components/home/identity";
import Services from "./components/home/services";
import Testimonials from "./components/home/testimonials";

// Home Page
function App() {
  return (
    <>
      <Hero />
      <Services />
      <Identity />
      <Testimonials />
      <CallToAction />
    </>
  );
}

export default App;
