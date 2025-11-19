import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlogCard from './BlogCard';

const SearchList = () => {
  const location = useLocation();

  // Get ?q=term
  const params = new URLSearchParams(location.search);
  const query = (params.get('q') || '').trim().toLowerCase();

  const { blog } = useSelector((store) => store.blog);

  // Compute filtered blogs once per query/blog change
  const filteredBlogs = useMemo(() => {
    if (!query) return blog;
    return blog.filter(
      (b) =>
        b.title?.toLowerCase().includes(query) ||
        b.subtitle?.toLowerCase().includes(query) ||
        b.category?.toLowerCase().includes(query)
    );
  }, [blog, query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div className="pt-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-5">
          {query ? `Search results for: "${query}"` : 'All Blogs'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 my-10">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((b, i) => <BlogCard key={i} blog={b} />)
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
