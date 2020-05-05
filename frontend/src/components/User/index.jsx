import React, { Component } from "react";
import Main from "../template/main";
import api from "../../server/api";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir!",
};

const inicialState = {
  user: {name: "", email: "" },
  list: [],
};

export default class User extends Component {
  state = { ...inicialState };

  async componentWillMount() {
    try {
      const result = await api.get("/users");
      this.setState({ list: result.data });
    } catch (erro) {
      alert(erro);
    }
  }

  clear() {
    this.setState({ user: inicialState.user });
  }

  async save() {
    const user = this.state.user;
    const method = user.id ? "put" : "post";
    const url = user.id ? `/users/${user.id}` : `/users`;
    try {
      const result = await api[method](url, user);
      console.log(result.data)
      const list = this.getUpdateList(result.data);
      this.setState({ user: inicialState.user, list });
    } catch (erro) {
      alert(erro);  
    }
  }

  getUpdateList(user) {
    const list = this.state.list.filter((u) => u.id != user.id);
    console.log(list)
    list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                id="name"
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                id="email"
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o email..."
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  delete(user) {
    api
      .delete(`/users/${user.id}`)
      .then((response) => {
        const list = this.state.list.filter((u) => u !== user);
        this.setState({ list });
      })
      .catch((error) => {
        alert(error);
      });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRow()}</tbody>
      </table>
    );
  }

  renderRow() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.delete(user)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
