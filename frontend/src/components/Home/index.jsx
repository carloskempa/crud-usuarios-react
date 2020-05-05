import React from "react";
import Main from "../template/main";

export default (props) => (
  <Main
    icon="home"
    title="Inicio"
    subtitle="Segundo Projeto do Capítulo do React."
  >
    <div className="display-4">Bem Vindo!</div>
    <hr />
    <div className="mb-0">
      Sistema para exemplificar a contrução de um cadastro desenvolvido em React
    </div>
  </Main>
);
