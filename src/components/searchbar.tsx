function SearchBar({ onResults }: { onResults: (results: Song[]) => void }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    const res = await fetch(`http://localhost:5000/spotify/search?q=${query}`);
    const data = await res.json();
    onResults(data); // <-- this updates results in Index.tsx
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search for songs..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
