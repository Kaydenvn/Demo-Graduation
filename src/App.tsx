import { ConfigProvider, theme } from "antd";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <Header />
      </ConfigProvider>
    </>
  );
}

export default App;
