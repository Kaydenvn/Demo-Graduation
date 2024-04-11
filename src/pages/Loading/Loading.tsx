import { Spin } from "antd";

const Loading = () => {
  return (
    <Spin
      size="large"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default Loading;
