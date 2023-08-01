import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { IconList } from "../../const/IconList";
import "./Login.css";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import { loginUser } from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = ({ username, password }) => {
    (async function getData() {
      try {
        const res = await loginUser(username, password);
        if (res?.data?.length === 0) {
          message.error("Login Failed, Try Again!");
        } else {
          message.success("Login Success!");
          localStorage.setItem("token", JSON.stringify(res.data[0]));
          navigate("/");
        }
      } catch (error) {}
    })();
  };
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);
  return (
    <div>
      {/* particles effect */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "rgb(35,39,65)",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="formContainer">
        <div className="loginTitle">News Administration</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={IconList["/user-manage"]} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input prefix={IconList["/lockOut"]} type="password" placeholder="Password" />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
