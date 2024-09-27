import React from "react";
import SegmentForm from "./components/SegmentForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SegmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
