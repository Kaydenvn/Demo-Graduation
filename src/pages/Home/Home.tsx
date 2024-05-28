import { Link } from "react-router-dom";
import Hero from "src/components/Hero";
import CardList from "src/components/List";
import ListSubject from "src/components/ListSubject";
import Team from "src/components/Team";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="justify-center text-center w-full mt-10">
        <Link
          to="/boschlabs"
          className="text-center text-2xl font-bold text-soft"
        >
          {">>>"} Trang giới thiệu về Bosch Lab {"<<<"}
        </Link>
      </div>
      <ListSubject />
      <section className="">
        <div className="container divider mx-auto"></div>
      </section>
      <CardList />
      <Team />
    </div>
  );
}
