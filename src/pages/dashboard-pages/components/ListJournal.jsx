import { useState, useEffect } from "react";
import { db, storage } from "../../../configs/firebase";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Select } from "antd";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ListJournal = () => {
  const [progressing, setProgressing] = useState(null);
  const [journalFile, setJournalFile] = useState(null);
  const [data, setData] = useState([]);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editedJournal, setEditedJournal] = useState({
    author: "",
    title: "",
    category: "",
    publication: "",
    abstract: "",
    keywords: "",
    doi: "",
    link: "",
    journal_file: "",
  });
  const MAX_FILE_SIZE = 25000000;

  useEffect(() => {
    // Fetch data from Firebase Database
    const unsub = onSnapshot(
      collection(db, "journaldata"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (err) => {
        console.log(err);
      },
    );

    return () => {
      unsub();
    };
  }, []);

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
      let journalUrl = editedJournal.journal_file;

      if (journalFile) {
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
            // Get URL from upload image
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              journalUrl = downloadURL;

              // Update Data
              updateDoc(doc(db, "journaldata", editedJournal.id), {
                author: data.author,
                title: data.title,
                category: data.category,
                publication: data.publication,
                abstract: data.abstract,
                keywords: data.keywords,
                doi: data.doi,
                link: data.link,
                journal_file: journalUrl,
                timestamp: serverTimestamp(),
              });

              setEditModalVisible(false);
            });
          },
        );
      } else {
        await updateDoc(doc(db, "journaldata", editedJournal.id), {
          author: data.author,
          title: data.title,
          category: data.category,
          publication: data.publication,
          abstract: data.abstract,
          keywords: data.keywords,
          doi: data.doi,
          link: data.link,
          journal_file: journalUrl,
          timestamp: serverTimestamp(),
        });

        setEditModalVisible(false);
      }
    } catch (err) {
      console.error("Error updating document: ", err);
    }
  };

  const showEditModals = (id) => {
    const journalToEdit = data.find((journal) => journal.id === id);
    setEditedJournal(journalToEdit);
    setEditModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "journaldata", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="relative mt-4 overflow-x-auto rounded-md shadow md:mt-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-softYellow text-xs uppercase text-darkBlue">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                DOI
              </th>
              <th scope="col" className="px-6 py-3">
                Link
              </th>
              <th scope="col" className="px-6 py-3">
                File Journal
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((items, index) => (
              <tr key={index} className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-darkBlue"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-darkBlue"
                >
                  {items.author}
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-darkBlue"
                >
                  {items.title}
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-darkBlue"
                >
                  {items.category}
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-darkBlue"
                >
                  <a href={items.doi} target="_blank">
                    Doi Jurnal
                  </a>
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-darkBlue"
                >
                  <a href={items.link} target="_blank">
                    Sumber Jurnal
                  </a>
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-darkBlue"
                >
                  <a href={items.journal_file} download target="_blank">
                    File Jurnal
                  </a>
                </th>
                <th
                  scope="row"
                  className="space-x-2 space-y-2 px-6 py-4 font-medium text-darkBlue"
                >
                  <button
                    onClick={() => handleDelete(items.id)}
                    type="button"
                    className="rounded bg-red-500 px-2 py-1 text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => showEditModals(items.id)}
                    type="button"
                    className="rounded bg-green-500 px-2 py-1 text-white"
                  >
                    Edit
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {isEditModalVisible && (
          <div className="fixed inset-0 z-50 mt-10 flex h-[calc(100%-4rem)] max-h-full items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className="fixed inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 w-full max-w-xl rounded-lg bg-white px-6 py-4 shadow-lg">
              <form
                className="mt-2 md:mt-4"
                onSubmit={handleSubmit(onSubmitJournal)}
              >
                <h2 className="mb-4 text-xl font-semibold">Edit Jurnal</h2>
                <div className="mb-2 grid grid-cols-2 gap-4 md:gap-8">
                  {/* Author */}
                  <div>
                    <label
                      htmlFor="author"
                      className="mb-2 block text-sm font-medium text-darkBlue"
                    >
                      Author
                    </label>
                    <input
                      defaultValue={editedJournal.author}
                      {...register("author")}
                      type="text"
                      id="author"
                      className={`block w-full rounded-lg border  bg-white p-2.5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                        errors.author ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tuliskan nama penulis"
                      required=""
                    />
                    <span className="mt-1 text-xs text-red-500">
                      {errors.author?.message}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-darkBlue"
                    >
                      Judul
                    </label>
                    <input
                      {...register("title")}
                      defaultValue={editedJournal.title}
                      type="text"
                      id="title"
                      className={`block w-full rounded-lg border  bg-white p-2.5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
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

                {/* Category */}
                <div className="mb-2">
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-darkBlue"
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
                        className={`block w-full rounded-lg border  bg-white py-5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
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
                            value:
                              "Jaringan Sensor Nirkabel (Wireless Sensor Network)",
                            label:
                              "Jaringan Sensor Nirkabel (Wireless Sensor Network)",
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

                <div className="mb-2 grid grid-cols-2 gap-4 md:gap-8">
                  {/* Publication */}
                  <div className="mb-2">
                    <label
                      htmlFor="publication"
                      className="mb-2 block text-sm font-medium text-darkBlue"
                    >
                      Publikasi Jurnal
                    </label>
                    <input
                      {...register("publication")}
                      defaultValue={editedJournal.publication}
                      type="text"
                      id="publication"
                      className={`block w-full rounded-lg border  bg-white p-2.5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                        errors.publication
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Tuliskan publikasi jurnal"
                      required=""
                    />
                    <span className="mt-1 text-xs text-red-500">
                      {errors.publication?.message}
                    </span>
                  </div>

                  {/* Abstract Field */}
                  <div className="mb-2">
                    <label
                      htmlFor="abstract"
                      className="mb-2 block text-sm font-medium text-darkBlue"
                    >
                      Abstrak
                    </label>
                    <input
                      {...register("abstract")}
                      defaultValue={editedJournal.abstract}
                      type="text"
                      id="abstract"
                      className={`block w-full rounded-lg border  bg-white p-2.5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                        errors.abstract ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tuliskan abstrak jurnal"
                      required=""
                    />
                    <span className="mt-1 text-xs text-red-500">
                      {errors.abstract?.message}
                    </span>
                  </div>
                </div>

                {/* Keywords Select */}
                <div className="mb-2">
                  <label
                    htmlFor="keywords"
                    className="mb-2 block text-sm font-medium text-darkBlue"
                  >
                    Kata Kunci
                  </label>
                  <Controller
                    name="keywords"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue={editedJournal.keywords}
                        mode="tags"
                        bordered={false}
                        className={`block w-full rounded-lg border border-gray-300 bg-white py-1.5 text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
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

                <div className="mb-2 grid grid-cols-2 gap-4 md:gap-8">
                  {/* DOI Field */}
                  <div className="mb-2">
                    <label
                      htmlFor="doi"
                      className="mb-2 block text-sm font-medium text-darkBlue"
                    >
                      DOI
                    </label>
                    <input
                      {...register("doi")}
                      defaultValue={editedJournal.doi}
                      type="text"
                      id="doi"
                      className={`block w-full rounded-lg border  bg-white p-2.5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
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
                  <div className="mb-2">
                    <label
                      htmlFor="link"
                      className="mb-2 block text-sm font-medium text-darkBlue"
                    >
                      Tautan
                    </label>
                    <input
                      {...register("link")}
                      defaultValue={editedJournal.link}
                      type="text"
                      id="link"
                      className={`block w-full rounded-lg border  bg-white p-2.5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                        errors.link ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tuliskan tautan jurnal"
                      required=""
                    />
                    <span className="mt-1 text-xs text-red-500">
                      {errors.link?.message}
                    </span>
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-2">
                  <label
                    htmlFor="journal-file"
                    className="mb-2 block text-sm font-medium text-darkBlue"
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
                    className={`block w-full rounded-lg border  bg-white p-2.5 text-sm text-darkBlue shadow-sm outline-none focus:border-darkBlue ${
                      errors.journal_file ? "border-red-500" : "border-gray-300"
                    }`}
                    required=""
                  />
                  <span className="mt-1 text-xs text-red-500">
                    {errors.journal_file?.message}
                  </span>
                </div>

                <div className="space-x-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-softYellow px-5 py-2.5 text-sm font-medium text-darkBlue duration-300 hover:brightness-90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditModalVisible(false)}
                    type="button"
                    className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white duration-300 hover:brightness-90"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListJournal;
