import { Button } from "antd";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const getData = () => {
    // axios.get("http://localhost:3001/posts/1").then((res) => {
    //   console.log(res.data);
    // });
    axios.post("http://localhost:3001/posts", {
      id: 2,
      title: "GOGOGOGOGOG",
      author: "EvenQian",
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Button type="primary">PRESS ME</Button>
    </div>
  );
};

export default Home;
