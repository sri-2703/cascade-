import { useState } from "react";

export interface Song {
  name: string;
  artist: string;
  album: string;
  image: string;
  preview: string | null;
}

interface TopBarProps {
  onResults: (results: Song[]) => void;
}

const TopBar = ({ onResults }: TopBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(`http://localhost:5000/spotify/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      onResults(data); // <-- pass results up to Index.tsx
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="relative flex items-center p-2 border-b">
      <input
        type="text"
        placeholder="Search for songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default TopBar;
