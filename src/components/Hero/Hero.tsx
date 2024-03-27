import React from "react";

export default function Hero() {
  return (
    <section>
      <div className="container mx-auto mt-2">
        <div
          className="hero h-96 md:h-[500px] rounded-box overflow-hidden"
          style={{
            backgroundImage: `url("https://raw.githubusercontent.com/Kaydenvn/graduationFE/main/public/bg.jpeg?token=GHSAT0AAAAAACOTUFM66G65PKUKGFC2SUXYZQEOADA")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-secondary-content">
            <div className="max-w-xl">
              <h1 className="mb-5 sm:mb-7 text-4xl sm:text-5xl font-bold">
                Trang Quản Lí Xưởng C3
              </h1>
              <p className="mb-5 sm:mb-7 sm:text-lg">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>
              <button className="btn btn-warning sm:btn-wide">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
