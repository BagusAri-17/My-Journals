import { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import Logo from "../../assets/logo.png";

const Header = () => {
  // Handling NavToggle
  const [isOpen, setOpen] = useState(false);

  // Window on Scroll
  window.onscroll = () => {
    const header = document.querySelector("nav");
    const fixedNav = header.offsetTop;

    if (window.scrollY > fixedNav) {
      header.classList.add("border-b");
    } else {
      header.classList.remove("border-b");
    }
  };

  return (
    <>
      <nav className="fixed left-0 top-0 z-20 w-full border-gray-200 bg-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4">
          <a href="/" className="flex items-center gap-4">
            <img src={Logo} className="h-10" alt="Umah Buku Logo" />
            <p className="font-bold">My Journals</p>
          </a>
          <div className="flex md:hidden">
            <Hamburger
              color={"#3A2E26"}
              size={32}
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>
          <div
            className={
              isOpen
                ? `w-full items-center justify-between shadow md:flex md:w-auto`
                : "hidden w-full items-center justify-between md:flex md:w-auto"
            }
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:border-0 md:bg-white md:p-0">
              <li>
                <a href="/" className="nav-item">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/daftar-jurnal" className="nav-item">
                  Daftar Jurnal
                </a>
              </li>
              <li>
                <a href="/tentang-kami" className="nav-item">
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
