import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Chat } from "./pages";

const AllRoutes = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AllRoutes; 