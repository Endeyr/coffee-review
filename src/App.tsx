import { useAppSelector } from "./app/hooks";
import MapProvider from "./components/google/provider";

// Home Page
function App() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <div className="text-center">
        {user ? <h2>Welcome, {user.username}</h2> : <h2>Home</h2>}
      </div>
      {/* Hero */}
      {/* Services */}
      {/* Identity */}
      {/* Testimonials */}
      {/* CallToAction */}
      <MapProvider />
    </>
  );
}

export default App;
