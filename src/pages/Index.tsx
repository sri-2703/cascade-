import { useState } from "react";
import { Song } from "@/components/TopBar"; // re-use type from TopBar
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [results, setResults] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar onResults={setResults} />  {/* ✅ TopBar handles search */}
        <main className="pt-20 pb-24 min-h-screen">
          <HeroSection />

          {/* Display search results */}
          <div className="mt-6">
            {results.length === 0 ? (
              <p>No results yet</p>
            ) : (
              <ul>
                {results.map((song, idx) => (
                  <li
                    key={idx}
                    className="mb-4 flex items-center gap-4 cursor-pointer"
                    onClick={() => setCurrentSong(song)} // click to play
                  >
                    <img src={song.image} alt={song.name} className="w-16 h-16" />
                    <div>
                      <p className="font-bold">{song.name}</p>
                      <p>{song.artist} - {song.album}</p>
                      {song.preview && <audio controls src={song.preview}></audio>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FeaturedSection />
        </main>
      </div>

      <MusicPlayer song={currentSong} />
    </div>
  );
};

export default Index;
