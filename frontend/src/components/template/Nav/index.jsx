import React from "react";
import NavItem from "../NavItem";
import "./nav.css";

export default (props) => (
  <aside className="menu-area">
    <nav className="menu">
      <NavItem nome="Inicio" icon="home" url="/" />
      <NavItem nome="Usuários" icon="users" url="/users" />
    </nav>
  </aside>
);
