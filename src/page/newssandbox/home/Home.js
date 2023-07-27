import { Button } from "antd";
import axios from "axios";

const Home = () => {
  const getData = () => {
    // axios.get("http://localhost:3001/posts/1").then((res) => {
    //   console.log(res.data);
    // });
    // axios.post("http://localhost:3001/posts", {
    //   id: 2,
    //   title: "GOGOGOGOGOG",
    //   author: "EvenQian",
    // });

    axios.get("http://localhost:3001/posts?_embed=comments").then((res) => {
      console.log(res.data);
    });
    axios.get("http://localhost:3001/comments?_expand=post").then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <Button type="primary" onClick={getData}>
        PRESS ME
      </Button>
    </div>
  );
};

export default Home;
