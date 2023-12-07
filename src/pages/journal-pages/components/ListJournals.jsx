import { useState, useEffect } from "react";
import { db } from "../../../configs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { FaFilePdf } from "react-icons/fa";

// Library for timeStamp
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import imageCover from "../../../assets/cover-image.png";

const ListJournals = () => {
  const [data, setData] = useState([]);
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
  return (
    <>
      <section className="my-40">
        <div className="container">
          <div>
            <h2 className="text-center font-semibold leading-[40px] text-darkBlue md:leading-[60px]">
              Daftar Jurnal
            </h2>
          </div>
          <div className="w-full pt-20">
            <div className="flex h-full w-full items-center justify-center p-2">
              <div className="mx-auto grid grid-cols-1">
                {data.map((items, index) => {
                  return (
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-12 items-center gap-8 border-b border-t border-b-gray-300 border-t-gray-300 p-6 duration-300"
                    >
                      <div className="col-span-8">
                        <p className=" text-sm text-darkBlue">
                          {dayjs(items.timestamp.toDate()).fromNow()}
                        </p>
                        <p className="mt-4 text-base text-darkBlue md:mt-6">
                          {items.author}
                        </p>
                        <a href={items.link}>
                          <h5 className="mt-2 text-2xl font-bold tracking-tight text-darkBlue md:mt-4">
                            {items.title}
                          </h5>
                        </a>
                        <p className="mt-2 line-clamp-3 text-base text-[#999aa4] md:mt-4">
                          {items.abstract}
                        </p>
                        <p className="mt-2 text-base font-bold text-darkBlue md:mt-4">
                          {items.category}
                        </p>
                        <div className="mt-2 md:mt-4">
                          <a
                            download
                            href={items.journal_file}
                            className="flex w-[20%] justify-center gap-2 rounded-full border border-gray-300 p-2 text-base text-darkBlue"
                          >
                            <FaFilePdf size={20} />
                            PDF
                          </a>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <img className="w-[250px]" src={imageCover} alt="" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListJournals;
