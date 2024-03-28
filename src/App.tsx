import { ConfigProvider, theme } from "antd";
import "./App.css";
import Mainlayout from "./layouts/MainLayout";
import Hero from "./components/Hero";
import CardList from "./components/List";

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <Mainlayout>
          <Hero />
          <CardList title="Mô Hình" description="Các mô hình trong xưởng C3" />
          <section className="">
            <div className="container divider mx-auto"></div>
          </section>
          <CardList
            title="Các Môn Học"
            description="Thông tin về các môn học và tài liệu tham khảo"
          />
          <div className="h-screen">Content</div>
        </Mainlayout>
      </ConfigProvider>
    </>
  );
}

export default App;
