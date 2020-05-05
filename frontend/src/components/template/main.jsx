import React from "react";
import Header from "./Header";
import "./main.css";

export default (props) => (
  <>
    <Header {...props} />
    <main className="content container-fluid">
      <div className="p-3 m-3">{props.children}</div>
    </main>
  </>
);
