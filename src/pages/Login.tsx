import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../api/axios";
import userStore from "../store/userStore";
import axios from "axios";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3333/login", values);

      const token = response.data.accessToken;

      userStore.setToken(token);
      setAuthToken(token);

      message.success("Uspešno prijavljivanje!");
      navigate("/reports");
    } catch (error) {
      message.error("Neuspešan login. Proveri podatke.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="Prijava" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Unesi email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lozinka"
            name="password"
            rules={[{ required: true, message: "Unesi lozinku!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Prijavi se
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
