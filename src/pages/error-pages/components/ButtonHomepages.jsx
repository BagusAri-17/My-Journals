import { useNavigate } from "react-router-dom";

const ButtonHomepages = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="rounded-full bg-softYellow px-12 py-4 text-base font-semibold text-darkBlue duration-300 hover:brightness-90"
      >
        Beranda
      </button>
    </>
  );
};

export default ButtonHomepages;
