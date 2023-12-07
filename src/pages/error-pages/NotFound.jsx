import { Flex } from "antd";
import ButtonHomepages from "./components/ButtonHomepages";

const NotFound = () => {
  return (
    <>
      <Flex align="center" justify="center" className="h-screen">
        <Flex vertical align="center">
          <div className="text-center">
            <h1 className="mb-24 text-[200px] font-bold text-softYellow md:mb-0">
              4<span className="text-darkBlue">0</span>4
            </h1>
            <h2 className="mt-2 text-5xl font-semibold text-darkBlue md:mt-4">
              Upss... Halaman Tidak Ditemukan
            </h2>
            <p className="mt-4 text-center text-lg md:mt-6">
              Mohon maaf, halaman yang anda buka tidak ditemukan{" "}
              <span className="block">
                Pastikan url yang anda masukkan benar
              </span>
            </p>
          </div>
          <div className="mt-8 md:mt-12">
            <ButtonHomepages />
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default NotFound;
