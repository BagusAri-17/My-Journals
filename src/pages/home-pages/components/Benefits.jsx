import { FaBoltLightning } from "react-icons/fa6";
import { FaKey, FaSearch } from "react-icons/fa";
const Benefits = () => {
  return (
    <>
      <section className="py-20">
        <div className="container">
          <div>
            <h2 className="text-center font-semibold leading-[40px] text-darkBlue md:leading-[60px]">
              Keuntungan menggunakan <span className="block">My Journals</span>
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-8 md:mt-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-[#F4F6FC] p-8">
              <FaKey size={40} className="text-softYellow" />
              <p className="mt-2 text-2xl font-medium text-darkBlue md:mt-4">
                Akses Mudah
              </p>
              <p className="mt-2 text-base leading-7 text-darkBlue/80 md:mt-4">
                Pengguna dapat dengan mudah mengakses berbagai jurnal dan
                artikel ilmiah tanpa batasan geografis atau waktu.
              </p>
            </div>
            <div className="bg-[#F4F6FC] p-8">
              <FaBoltLightning size={40} className="text-softYellow" />
              <p className="mt-2 text-2xl font-medium text-darkBlue md:mt-4">
                Pembaruan Cepat
              </p>
              <p className="mt-2 text-base leading-7 text-darkBlue/80 md:mt-4">
                Menyediakan mekanisme untuk memperbarui dan mempublikasikan
                informasi dengan cepat, memungkinkan penelitian yang lebih
                dinamis dan responsif.
              </p>
            </div>
            <div className="bg-[#F4F6FC] p-8">
              <FaSearch size={40} className="text-softYellow" />
              <p className="mt-2 text-2xl font-medium text-darkBlue md:mt-4">
                Fasilitas Pencarian
              </p>
              <p className="mt-2 text-base leading-7 text-darkBlue/80 md:mt-4">
                Pengguna dapat dengan cepat menemukan jurnal yang relevan dengan
                menggunakan fitur pencarian canggih, menghemat waktu dan usaha.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;
