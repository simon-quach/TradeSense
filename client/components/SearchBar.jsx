'use client';

const SearchBar = () => {
    const handleSearch = (event) => {
        event.preventDefault();
        // You would handle your search logic here, for example:
        const query = event.target.elements.search.value;
        console.log('Searching for:', query);
        // Then maybe redirect to a search results page or filter some data on the current page.
      };

    return (
    <form onSubmit={handleSearch}>
      <input
        name="search"
        className="p-4 w-full max-w-2x6 bg-slate-100 h-10 rounded-md"
        type="search" // Using the appropriate input type
        placeholder="Enter a stock(e.g. NVDA)" // Placeholder text is helpful for users
      />
    </form>
    );
}

export default SearchBar;
