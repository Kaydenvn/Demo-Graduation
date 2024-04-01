import LoginForm from "src/components/LoginForm";
import Background from "src/assets/bg.jpeg";

export default function Login() {
  return (
    <section
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="container flex items-center justify-center">
        <LoginForm />
      </div>
    </section>
  );
}
