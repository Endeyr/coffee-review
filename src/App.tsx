import { useAppSelector } from "./app/hooks";

// Home Page
function App() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <div className="text-center">
        {user ? <h2>Welcome, {user.username}</h2> : <h2>Home</h2>}
      </div>
    </>
  );
}

export default App;
