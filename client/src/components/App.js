import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    fetch("/swipes")
    .then((r) => r.json())
    .then((swipes) => console.log(swipes));
  }, [])
  return <h1>Project Client</h1>;
}

export default App;
