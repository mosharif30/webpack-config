import "./style.css";
import React, { useEffect, useState } from "react";
import image from "../../public/1.jpg";
import ReactDOM from "react-dom";
import axios from "axios";

const Header = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(process.env.NODE_ENV);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <>
      <img src={image} width="100px" height="100px" />
      <h1>data from axios</h1>
      {loading ? (
        <h1>wait for the server response...</h1>
      ) : (
        <>
          <h2>{data?.id}</h2>
          <h2>{data?.title}</h2>
        </>
      )}
    </>
  );
};

export default Header;
