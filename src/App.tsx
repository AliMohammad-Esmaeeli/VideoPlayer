import { useRef, useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import type { PlyrSource } from "plyr-react";

type SubtitleTrack = {
  kind: "subtitles" | "captions";
  label: string;
  src: string;
  srclang: string;
};

export default function App() {
  const [video, setVideo] = useState("");
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    params.get("link") && setVideo(params.get("link")!)
  }, [])

  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const [subtitle, setSubtitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const videoSrc: PlyrSource = {
    type: "video",
    sources: [
      {
        src: video,
        type: "video/mp4",
      },
    ],
    tracks: subtitle
      ? [
        {
          kind: "subtitles",
          label: "زیرنویس",
          src: subtitle,
          srclang: "fa",
        } as SubtitleTrack,
      ]
      : [],
  };

  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden flex flex-col justify-center items-center">
      <main className="flex flex-col md:flex-row gap-7 mt-[26vh]">
        <div className="h-full w-96">
          <Plyr
            ref={playerRef}
            source={videoSrc}
            options={{
              autoplay: false,
              controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "captions",
                "settings",
                "pip",
                "fullscreen",
              ],
              settings: ["captions"],
            }}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <input
            value={video}
            onChange={(e) => {
              e.preventDefault();
              if (e.currentTarget.value) {
                setVideo(e.currentTarget.value);
                window.location.search = `?link=${video}`;
              }
            }}
            type="text"
            placeholder="آدرس فیلم"
            dir="rtl"
            className="rounded-lg bg-slate-100 px-6 py-3"
          />
          <div className="flex justify-center items-center gap-4">
            <Button
              onPress={() => {
                setIsPlaying((prev) => !prev);
                const plyrInstance = playerRef.current?.plyr;
                if (plyrInstance) {
                  if (isPlaying) {
                    plyrInstance.pause();
                  } else {
                    plyrInstance.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}
              className="h-11 rounded-lg px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg"
            >
              <p className="text-lg text-slate-50">
                {isPlaying ? "توقف" : "پخش"}
              </p>
            </Button>
            <Button
              onPress={() => fileInputRef.current?.click()}
              className="h-11 rounded-lg px-5 py-3 bg-gradient-to-r from-orange-400 to-amber-400 shadow-lg"
            >
              <p className="text-lg text-slate-50">فایل زیر نویس</p>
            </Button>
            <input
              type="file"
              hidden
              accept=".srt,.vtt"
              ref={fileInputRef}
              onChange={(e) =>
                e.target.files?.[0] &&
                setSubtitle(URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
        </div>
      </main>
      <footer className="mt-auto flex flex-col justify-center items-center">
        <hr className="p-2 w-60 md:w-96" />
        <p className="text-xl text-center my-3">
          <a
            href="https://www.ali-mohammad.ir/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800"
          >
            Ali Mohammad Esmaeeli
          </a>{" "}
          {"  "}| Copyright-© {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
