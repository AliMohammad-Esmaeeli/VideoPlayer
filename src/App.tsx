import { useState } from "react"

export default function App() {
  const [video, setVideo] = useState("");
  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden flex flex-col justify-center items-center">
      <main className="flex flex-col md:flex-row gap-7 mt-[26vh]">
        <video src={video} className="rounded-lg h-full w-96" controls autoPlay>
          <track src="" kind="subtitles" label="زیرنویس" />
        </video>
        <div className="flex flex-col justify-center items-center gap-3">
          <input
            onChange={(e) => setVideo(e.currentTarget.value)}
            type="text" name=""
            id=""
            placeholder="آدرس فیلم"
            dir="rtl"
            className="rounded-lg bg-slate-100 px-5 py-3"
          />
          <div className="flex justify-center items-center gap-5">
            <button className="rounded-lg px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg">پخش</button>
            <button className="rounded-lg px-5 py-3 bg-gradient-to-r from-orange-400 to-amber-400 shadow-lg">فایل زیر نویس</button>
          </div>
        </div>
      </main>
      <footer className="mt-auto flex flex-col justify-center items-center">
        <hr className="p-2 w-60 md:w-96" />
        <p className="text-xl text-center my-3">
          <a
            href="https://www.alimohammad.blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800"
          >
            Ali Mohammad Esmaeeli
          </a> {"  "}
          | Copyright-© {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
