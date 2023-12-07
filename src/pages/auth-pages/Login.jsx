import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import authService from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email harus diisi")
      .email("Email tidak valid"),
    password: yup
      .string()
      .required("Kata sandi harus diisi")
      .min(8, "Kata sandi minimal 8 karakter"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleLogin = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        user
          .getIdToken()
          .then((idToken) => {
            authService.storeCredentialsToCookie(idToken);
            return navigate("/dashboard/utama");
          })
          .catch((error) => {
            console.error("Error getting ID token:", error);
          });
      })
      .catch((err) => {
        toast.error("Login gagal, silakan masukkan email dan sandi yang benar");
      });
  };

  return (
    <>
      <ToastContainer />
      <section className="flex min-h-screen items-stretch text-white ">
        <div
          className="relative hidden w-1/2 items-center bg-gray-500 bg-cover bg-no-repeat lg:flex"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="absolute inset-0 z-0 bg-darkBlue/60" />
          <div className="z-10 w-full px-24">
            <h1 className="text-left text-5xl font-bold tracking-wide">
              Keep it special
            </h1>
            <p className="my-4 text-3xl">
              Capture your personal memory in unique way, anywhere.
            </p>
          </div>
        </div>
        <div className="z-0 flex w-full items-center justify-center bg-darkBlue px-4 text-center md:px-16 lg:w-1/2">
          <div className="z-20 w-full py-6 lg:w-3/4">
            <button onClick={() => navigate(-1)} className="flex gap-3">
              <AiOutlineArrowLeft color="#ffffff" size={20} />
              <p className="text-grey-900 text-base font-semibold">Kembali</p>
            </button>
            <div className="py-12">
              <h3 className="font-bold text-softYellow">Login to Admin</h3>
            </div>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onHandleLogin)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-left text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  className={`block w-full rounded-lg border bg-transparent p-4 text-softYellow sm:text-sm ${
                    errors.email ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="name@company.com"
                  required=""
                />
                <p className="mt-1 text-left text-xs text-red-500">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-left text-sm font-medium text-white"
                >
                  Kata Sandi
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`block w-full rounded-lg border bg-transparent p-4 text-softYellow sm:text-sm ${
                    errors.password ? "border-red-500" : "border-white/10"
                  }`}
                  required=""
                />
                <p className="mt-1 text-left text-xs text-red-500">
                  {errors.password?.message}
                </p>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-softYellow px-5 py-4 text-center text-base font-bold text-darkBlue duration-300 hover:brightness-90"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
