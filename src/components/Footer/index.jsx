import { AiFillInstagram, AiFillYoutube, AiFillMail } from "react-icons/ai";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-darkBlue pb-10 pt-10">
        <div className="container">
          <div className="flex flex-wrap md:gap-8 lg:gap-0">
            <div className="mb-12 w-full md:w-1/3">
              <div className="mb-3 flex items-center gap-4">
                <h1 className="text-xl font-bold tracking-wider text-softYellow">
                  My Journals
                </h1>
              </div>
              <div className="flex flex-col gap-2 md:gap-1">
                <p className="text-white">
                  Sebuah website penyedia jurnal sesuai penjaluran informatika
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <a
                  className=" mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#eeeeee] text-white duration-300 hover:border-softYellow hover:bg-softYellow hover:text-darkBlue"
                  href=""
                >
                  <AiFillInstagram size={20} />
                </a>
                <a
                  className=" mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#eeeeee] text-white duration-300 hover:border-softYellow hover:bg-softYellow hover:text-darkBlue"
                  href=""
                >
                  <AiFillYoutube size={20} />
                </a>
                <a
                  className=" mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#eeeeee] text-white duration-300 hover:border-softYellow hover:bg-softYellow hover:text-darkBlue"
                  href=""
                >
                  <AiFillMail size={20} />
                </a>
              </div>
            </div>
            <div className="flex w-full flex-wrap md:w-1/2 lg:w-2/3">
              <div className="mb-12 w-full md:w-1/2 lg:w-1/3">
                <h1 className="mb-3 text-base font-bold text-softYellow">
                  Menu Kami
                </h1>
                <ul className="flex flex-col gap-2 md:gap-1">
                  <li className="">
                    <a className="text-sm text-white md:text-base" href="">
                      Beranda
                    </a>
                  </li>
                  <li className="">
                    <a className="text-sm text-white md:text-base" href="">
                      Daftar Jurnal
                    </a>
                  </li>
                  <li className="">
                    <a className="text-sm text-white md:text-base" href="">
                      Tentang Kami
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-12 w-full md:w-1/2 lg:w-1/3">
                <h1 className="mb-3 text-base font-bold text-softYellow">
                  Komunitas
                </h1>
                <div className="flex flex-col gap-2 md:gap-1">
                  <a className="text-sm text-white md:text-base" href="">
                    Grup Whatsapp
                  </a>
                </div>
              </div>
              <div className="mb-12 w-full md:w-1/2 lg:w-1/3">
                <h1 className="mb-3 text-base font-bold text-softYellow">
                  Bantuan
                </h1>
                <div className="flex flex-col gap-2 md:gap-1">
                  <a className="text-sm text-white md:text-base" href="/">
                    FAQ
                  </a>
                  <a className="text-sm text-white md:text-base" href="/">
                    Privacy & Terms
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-[#eeeeee] pt-4">
            <p className="text-sm text-softYellow">
              © 2023 My Journal | Website Jurnal
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
