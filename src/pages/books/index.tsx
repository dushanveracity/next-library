import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { Book } from "../../models/Book";
import { collection, getDocs, query } from "firebase/firestore";
import db from "../../config/firebase.config";
import AddEdit from "./add-edit";
import { FaRegEdit, FaSort, FaTrash } from "react-icons/fa";

const books: React.FC<any> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [addEditModal, setAddEditModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<
    "titleAsc" | "authorAsc" | "titleDesc" | "authorDesc"
  >("titleAsc");

  useEffect(() => {
    const getBooks = async () => {
      const snapshot = await getDocs(query(collection(db, "books")));
      let booksRes: Book[];
      booksRes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];

      booksRes.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        const authorA = a.author.toUpperCase();
        const authorB = b.author.toUpperCase();

        switch (sort) {
          case "titleAsc":
            return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
          case "titleDesc":
            return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
          case "authorAsc":
            return authorA < authorB ? -1 : authorA > authorB ? 1 : 0;
          case "authorDesc":
            return authorA > authorB ? -1 : authorA < authorB ? 1 : 0;
          default:
            return 0;
        }
      });

      setBooks(booksRes.slice((page - 1) * 8, page * 8));
    };

    getBooks();
  }, [addEditModal, page, sort]);

  useEffect(() => {
    if (!addEditModal) {
      setSelectedBook(null);
    }
  }, [setAddEditModal]);

  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setAddEditModal(true);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="p-10 border boder-white rounded w-1/3 h-1/2 relative">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg mb-3">Book List</h3>
          <button
            className="bg-green-600 font-semibold px-3 py-2 rounded"
            onClick={() => setAddEditModal(true)}
          >
            New Book
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2">
              <th className="py-5 px-2 w-2/5">
                <span>Title</span>
                <button
                  onClick={() =>
                    setSort(sort === "titleAsc" ? "titleDesc" : "titleAsc")
                  }
                  className="float-right pt-1"
                >
                  <FaSort />
                </button>
              </th>
              <th className="py-5 px-2 w-2/5">
                <span>Author</span>
                <button
                  onClick={() =>
                    setSort(sort === "authorAsc" ? "authorDesc" : "authorAsc")
                  }
                  className="float-right pt-1"
                >
                  <FaSort />
                </button>
              </th>
              <th className="w-1/2 py-5 px-2" colSpan={0}></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className="border-b border-gray-400">
                <td className="py-3 px-2">{book.title}</td>
                <td className="py-3 px-2">{book.author}</td>
                <td className="py-3 px-2 flex items-center gap-2">
                  <button onClick={() => openEditModal(book)}>
                    <FaRegEdit />
                  </button>
                  <button>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 w-full py-6 absolute bottom-2 right-6">
          {page > 1 && (
            <button
              onClick={() => setPage((page) => page - 1)}
              className="py-1 px-2 rounded text-center border hover:bg-gray-700"
            >
              {page - 1}
            </button>
          )}
          <button className="py-1 px-2 rounded text-center border hover:bg-gray-700">
            {page}
          </button>
          <button
            onClick={() => setPage((page) => page + 1)}
            disabled={books.length < 8}
            className="py-1 px-2 rounded text-center border hover:bg-gray-700"
          >
            {page + 1}
          </button>
        </div>
      </div>
      {addEditModal && (
        <AddEdit setModal={setAddEditModal} bookData={selectedBook} />
      )}
    </main>
  );
};

export default books;
