import Hero from "src/components/Hero";
import CardList from "src/components/List";
import Team from "src/components/Team";

export default function Home() {
  return (
    <div>
      <Hero />
      <CardList title="Mô Hình" description="Các mô hình trong xưởng C3" />
      <section className="">
        <div className="container divider mx-auto"></div>
      </section>
      <CardList
        title="Các Môn Học"
        description="Thông tin về các môn học và tài liệu tham khảo"
      />
      <Team />
    </div>
  );
}
