import heroImage from "../../../assets/hero/hero-image.png";

const Hero = () => {
  return (
    <>
      <section className="flex h-screen items-center justify-center">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Description */}
            <div className="max-w-full lg:max-w-[50%]">
              <div className="text-center lg:text-left">
                <p className="font-semibold uppercase text-darkBlue">
                  My Journals
                </p>
                <h1 className="leading-0 mt-2 leading-[48px] text-darkBlue md:mt-4 md:leading-[64px]">
                  Temukan <span className="text-softYellow">Jurnal</span> Sesuai
                  Preferensi <span className="text-softYellow">Anda</span>
                </h1>
                <p className="mt-2 text-base leading-[24px] text-[#999aa4] md:mx-auto md:mt-4 md:w-[90%] md:leading-[28px] lg:mx-0 lg:leading-[32px]">
                  Jangan lewatkan kesempatan untuk mengeksplorasi berbagai
                  pengetahuan pada jurnal.
                </p>
              </div>
              <div className="mt-4 flex flex-col md:mt-8 md:justify-center lg:flex-row lg:justify-start">
                <a
                  href="/"
                  className="border-primary rounded-full border bg-softYellow px-6 py-4 text-center text-sm font-semibold text-darkBlue transition duration-300 hover:cursor-pointer hover:brightness-90 md:px-8"
                >
                  Eksplorasi
                </a>
              </div>
            </div>
            {/* Image */}
            <div className="mx-auto hidden md:max-w-[60%] lg:block lg:max-w-[50%]">
              <img className="w-full" src={heroImage} alt="hero-image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
