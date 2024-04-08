import Hero from "src/components/Hero";
import CardList from "src/components/List";
import ListSubject from "src/components/ListSubject";
import Team from "src/components/Team";

export default function Home() {
  return (
    <div>
      <Hero />
      <CardList />
      <section className="">
        <div className="container divider mx-auto"></div>
      </section>
      <ListSubject />
      <Team />
    </div>
  );
}
