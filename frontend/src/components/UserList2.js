import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

function UserList2() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [usersPerPage, setUsersPerPage] = useState(25);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setUsersPerPage(data.length);
        setAllUsers(data);
      });
  }, []);

  useEffect(() => {
    let toShow = [...allUsers];
    if (toShow.length === 0) return;
    if (filter) {
      toShow = toShow.filter((u) => u.first_name.includes(filter));
    }
    if (sort) {
      toShow = toShow.sort(sortByField(sort.field, sort.symbol));
    }
    let pagesAmount = Math.ceil(toShow.length / usersPerPage) + 1;

    if (currentPage * usersPerPage > toShow.length) {
      setCurrentPage(pagesAmount - 1);
    }
    toShow = toShow.slice(
      usersPerPage * (currentPage - 1),
      currentPage * usersPerPage
    );

    setTotalPages(pagesAmount);

    setUsers(toShow);
  }, [usersPerPage, filter, sort, currentPage, allUsers]);

  function sortByField(property, symbol) {
    return function (a, b) {
      if (a[property] > b[property]) return Number(`${symbol}1`);
      if (a[property] < b[property]) return -Number(`${symbol}1`);
      return 0;
    };
  }

  const deleteUsers = (id) => {
    fetch(`http://127.0.0.1:8000/users/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <>
      <div className="options">
        <label>
          Show
          <select onChange={(e) => setUsersPerPage(e.target.value)}>
            <option disabled selected>
              -- select an option --
            </option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          users
        </label>
        <input
          type="text"
          placeholder="search..."
          onChange={(e) => setFilter(e.target.value)}
        ></input>
        name
        <button
          className={
            sort?.field === "first_name" && sort?.symbol === "+"
              ? "arrow-active"
              : "arrow"
          }
          onClick={() => {
            setSort({ field: "first_name", symbol: "+" });
          }}
        >
          <i>↑</i>
        </button>
        <button
          className={
            sort?.field === "first_name" && sort?.symbol === "-"
              ? "arrow-active"
              : "arrow"
          }
          onClick={() => {
            setSort({ field: "first_name", symbol: "-" });
          }}
        >
          <i>↓</i>
        </button>
        last name
        <button
          className={
            sort?.field === "last_name" && sort?.symbol === "+"
              ? "arrow-active"
              : "arrow"
          }
          onClick={() => {
            setSort({ field: "last_name", symbol: "+" });
          }}
        >
          <i>↑</i>
        </button>
        <button
          className={
            sort?.field === "last_name" && sort?.symbol === "-"
              ? "arrow-active"
              : "arrow"
          }
          onClick={() => {
            setSort({ field: "last_name", symbol: "-" });
          }}
        >
          <i className="Button">↓</i>
        </button>
        age
        <button
          className={
            sort?.field === "age" && sort?.symbol === "+"
              ? "arrow-active"
              : "arrow"
          }
          onClick={() => {
            setSort({ field: "age", symbol: "+" });
          }}
        >
          <i>↑</i>
        </button>
        <button
          className={
            sort?.field === "age" && sort?.symbol === "-"
              ? "arrow-active"
              : "arrow"
          }
          onClick={() => {
            setSort({ field: "age", symbol: "-" });
          }}
        >
          <i>↓</i>
        </button>
        pages:
        {[...Array(totalPages).keys()].slice(1).map((page) => (
          <button
            className={
              currentPage === page ? "pagination-active" : "pagination"
            }
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {users.map((u) => (
        <div
          className="users"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "50%",
            height: "100%",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: 200 }}> {u.first_name}</div>
          <div style={{ width: 300 }}> {u.last_name}</div>
          <div style={{ width: 150 }}>{u.age}</div>
          <button className="delete" onClick={() => deleteUsers(u.id)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
}

export default UserList2;
