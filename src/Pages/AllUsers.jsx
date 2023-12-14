import React, { useEffect, useState } from "react";
import UserList from '../components/UserList';
import UserService from "../services/UserService";
import { useLocation } from 'react-router-dom';

const SearchResultPage = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('term');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let response;
        if (searchTerm === "") {
          response = await UserService.getAllUsers(currentPage, pageSize);
        } else {
          response = await UserService.getFilteredUsers(searchTerm, currentPage, pageSize);
        }

        setSearchResults(response.users);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto my-8">
      <br />
      <h2 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
      <UserList users={searchResults} />
  
      {totalPages > 1 && (
        <nav aria-label="Page navigation example">
          <ul className="flex space-x-4 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === page ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </ul>
          <p className="text-gray-600 mt-2">Page {currentPage + 1} of {totalPages}</p>
        </nav>
      )}
    </div>
  );
};

export default SearchResultPage;
