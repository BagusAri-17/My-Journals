import { Select } from "antd";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../configs/firebase";
import { useEffect, useState } from "react";

const AddJournal = () => {
  const [journalFile, setJournalFile] = useState(null);
  const [datas, setDatas] = useState({});
  const [progressing, setProgressing] = useState(null);

  const MAX_FILE_SIZE = 25000000;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, journalFile.name);
      const uploadTask = uploadBytesResumable(storageRef, journalFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressing(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setData Image URL
            setDatas((prev) => ({ ...prev, journal_file: downloadURL }));
          });
        },
      );
    };
    journalFile && uploadFile();
  }, [journalFile]);

  const schema = yup.object().shape({
    author: yup.string().required("Nama penulis harus diisi"),
    title: yup.string().required("Judul jurnal harus diisi"),
    category: yup.string().required("Kategori jurnal harus diisi"),
    publication: yup.string().required("Publikasi jurnal harus diisi"),
    abstract: yup.string().required("Abstrak jurnal harus diisi"),
    keywords: yup.array().required("Kata kunci jurnal harus diisi"),
    doi: yup.string().required("DOI jurnal harus diisi"),
    link: yup.string().required("Tautan jurnal harus diisi"),
    journal_file: yup
      .mixed()
      .test("required", "File harus diisi", (value) => {
        return value && value.length;
      })
      .test(
        "fileSize",
        "Ukuran file terlalu besar, maksimal 20 MB",
        (value) => {
          if (!value || !value[0]) return true;
          return value[0].size <= MAX_FILE_SIZE;
        },
      ),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitJournal = async (data) => {
    try {
      await addDoc(collection(db, "journaldata"), {
        ...datas,
        author: data.author,
        title: data.title,
        category: data.category,
        publication: data.publication,
        abstract: data.abstract,
        keywords: data.keywords,
        doi: data.doi,
        link: data.link,
        timestamp: serverTimestamp(),
      });
      return reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="mt-4 md:mt-8" onSubmit={handleSubmit(onSubmitJournal)}>
        <div className="mb-6 grid grid-cols-2 gap-4 md:gap-8">
          {/* Author Field */}
          <div>
            <label
              htmlFor="author"
              className="mb-2 block text-base font-medium text-darkBlue"
            >
              Penulis
            </label>
            <input
              {...register("author")}
              type="text"
              id="author"
              className={`block w-full rounded-lg border  bg-white p-4 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                errors.author ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tuliskan nama penulis"
              required=""
            />
            <span className="mt-1 text-xs text-red-500">
              {errors.author?.message}
            </span>
          </div>

          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-base font-medium text-darkBlue"
            >
              Judul
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className={`block w-full rounded-lg border  bg-white p-4 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tuliskan judul jurnal"
              required=""
            />
            <span className="mt-1 text-xs text-red-500">
              {errors.title?.message}
            </span>
          </div>
        </div>

        {/* Category Select */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="mb-2 block text-base font-medium text-darkBlue"
          >
            Kategori
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                bordered={false}
                className={`block w-full rounded-lg border  bg-white px-2 py-6 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
                defaultValue="Pilih kategori jurnal"
                options={[
                  {
                    value: "Penambangan Data Tekstual (Text Mining)",
                    label: "Penambangan Data Tekstual (Text Mining)",
                  },
                  {
                    value:
                      "Penemuan dan Manajemen Pengetahuan (Knowledge Discovery and Management)",
                    label:
                      "Penemuan dan Manajemen Pengetahuan (Knowledge Discovery and Management)",
                  },
                  {
                    value:
                      "Temu Kembali Informasi Musik (Music Information Retrieval)",
                    label:
                      "Temu Kembali Informasi Musik (Music Information Retrieval)",
                  },
                  {
                    value: "Sistem Multimedia (Multimedia System)",
                    label: "Sistem Multimedia (Multimedia System)",
                  },
                  {
                    value: "Keamanan Digital (Digital Security)",
                    label: "Keamanan Digital (Digital Security)",
                  },
                  {
                    value: "Jaringan Sensor Nirkabel (Wireless Sensor Network)",
                    label: "Jaringan Sensor Nirkabel (Wireless Sensor Network)",
                  },
                  {
                    value: "Komputasi Cerdas (Smart Computing)",
                    label: "Komputasi Cerdas (Smart Computing)",
                  },
                  {
                    value:
                      "Pemrosesan Data Besar dan Manajemen Bisnis (Big Data Processing and Bussiness Management)",
                    label:
                      "Pemrosesan Data Besar dan Manajemen Bisnis (Big Data Processing and Bussiness Management)",
                  },
                  {
                    value:
                      "Interaksi dan Pengalaman Pengguna (User Interaction and Experience)",
                    label:
                      "Interaksi dan Pengalaman Pengguna (User Interaction and Experience)",
                  },
                ]}
              />
            )}
          />
          <span className="mt-1 text-xs text-red-500">
            {errors.category?.message}
          </span>
        </div>

        {/* Publication Field */}
        <div className="mb-6">
          <label
            htmlFor="publication"
            className="mb-2 block text-base font-medium text-darkBlue"
          >
            Publikasi Jurnal
          </label>
          <input
            {...register("publication")}
            type="text"
            id="publication"
            className={`block w-full rounded-lg border  bg-white p-4 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
              errors.publication ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tuliskan publikasi jurnal"
            required=""
          />
          <span className="mt-1 text-xs text-red-500">
            {errors.publication?.message}
          </span>
        </div>

        {/* Abstract Field */}
        <div className="mb-6">
          <label
            htmlFor="abstract"
            className="mb-2 block text-base font-medium text-darkBlue"
          >
            Abstrak
          </label>
          <input
            {...register("abstract")}
            type="text"
            id="abstract"
            className={`block w-full rounded-lg border  bg-white p-4 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
              errors.abstract ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tuliskan abstrak jurnal"
            required=""
          />
          <span className="mt-1 text-xs text-red-500">
            {errors.abstract?.message}
          </span>
        </div>

        {/* Keywords Select */}
        <div className="mb-6">
          <label
            htmlFor="keywords"
            className="mb-2 block text-base font-medium text-darkBlue"
          >
            Kata Kunci
          </label>
          <Controller
            name="keywords"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="tags"
                bordered={false}
                className={`block w-full rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                  errors.keywords ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={
                  <span className="text-base text-gray-400">
                    Tuliskan kata kunci jurnal
                  </span>
                }
              />
            )}
          />
          <span className="mt-1 text-xs text-red-500">
            {errors.keywords?.message}
          </span>
        </div>

        {/* DOI Field */}
        <div className="mb-6">
          <label
            htmlFor="doi"
            className="mb-2 block text-base font-medium text-darkBlue"
          >
            DOI
          </label>
          <input
            {...register("doi")}
            type="text"
            id="doi"
            className={`block w-full rounded-lg border  bg-white p-4 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
              errors.doi ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tuliskan DOI jurnal"
            required=""
          />
          <span className="mt-1 text-xs text-red-500">
            {errors.doi?.message}
          </span>
        </div>

        {/* Link Field */}
        <div className="mb-6">
          <label
            htmlFor="link"
            className="mb-2 block text-base font-medium text-darkBlue"
          >
            Tautan
          </label>
          <input
            {...register("link")}
            type="text"
            id="link"
            className={`block w-full rounded-lg border  bg-white p-4 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
              errors.link ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tuliskan tautan jurnal"
            required=""
          />
          <span className="mt-1 text-xs text-red-500">
            {errors.link?.message}
          </span>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label
            htmlFor="journal-file"
            className="mb-2 block text-base font-medium text-darkBlue"
          >
            File Jurnal
          </label>
          <input
            {...register("journal_file")}
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              setJournalFile(file);
            }}
            type="file"
            id="journal-file"
            className={`block w-full rounded-lg border  bg-white p-4 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
              errors.journal_file ? "border-red-500" : "border-gray-300"
            }`}
            required=""
          />
          <span className="mt-1 text-xs text-red-500">
            {errors.journal_file?.message}
          </span>
        </div>

        {/* Button Submit */}
        <div className="mb-6">
          <button
            type="submit"
            className="rounded-lg bg-softYellow px-5 py-2.5 text-sm font-medium text-darkBlue duration-300 hover:brightness-90"
          >
            Unggah
          </button>
        </div>
      </form>
    </>
  );
};

export default AddJournal;
