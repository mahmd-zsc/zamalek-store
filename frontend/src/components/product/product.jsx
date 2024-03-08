import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
function Product() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  let [countOfCards, setCountOfCards] = useState(8);
  useEffect(() => {
    axios
      .get("https://mahmd-zsc.github.io/zamalek-api/api.json")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((rej) => {
        setLoading(false);
        setError(true);
      });
  }, []);
  return (
    <div className=" grid lg:grid-cols-4 h-[300px] gap-2 mt-10  ">
      {!loading ? <div></div> : null}
    </div>
  );
}

export default Product;
