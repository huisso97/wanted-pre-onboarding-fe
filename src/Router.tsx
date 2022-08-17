import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import { getToken } from "./utils/token";

function Router() {
  const isToken = getToken();
  return (
    <Routes>
      <Route path="/" element={isToken ? <Navigate replace to="/todo" /> : <Login />} />
      <Route path="/todo" element={isToken ? <Todo /> : <Navigate replace to="/" />} />
      <Route path="/signup" element={isToken ? <Navigate replace to="/todo" /> : <Signup />} />
    </Routes>
  );
}
export default Router;
