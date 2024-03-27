import { ConfigProvider, theme } from "antd";
import "./App.css";
import Mainlayout from "./layouts/MainLayout";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <Mainlayout>
          <Hero />
          <div className="h-screen">Content</div>
        </Mainlayout>
      </ConfigProvider>
    </>
  );
}

export default App;
