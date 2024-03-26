import { ConfigProvider, theme } from "antd";
import "./App.css";
import Mainlayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <Mainlayout>
          <div className="h-screen">Content</div>
          <div className="h-screen">Content</div>
        </Mainlayout>
      </ConfigProvider>
    </>
  );
}

export default App;
