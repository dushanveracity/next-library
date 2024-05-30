import { Book } from "../../models/Book";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import db from "../../config/firebase.config";

type Props = {
  bookData?: Book | null;
  setModal: Dispatch<SetStateAction<boolean>>;
};

const AddEdit: React.FC<Props> = ({ bookData, setModal }) => {
  const [book, setBook] = useState<Book>({
    author: "",
    title: "",
  });

  useEffect(() => {
    if(bookData) {
      setBook(bookData);
    }
  }, [bookData])

  const onSave = (e: any) => {
    e.preventDefault();
    if (bookData) {
      updateBook();
    } else {
      createBook();
    }
    setModal(false);
  };

  const createBook = async () => {
    await addDoc(collection(db, "books"), book);
  };

  const updateBook = async () => {
    await setDoc(doc(db, "books", book?.id), book);
  };

  return (
    <div className="bg-white/50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <button
        className="absolute top-10 right-10 text-2xl text-black"
        onClick={() => setModal(false)}
      >
        <CgClose />
      </button>
      <form
        onSubmit={(e) => {
          onSave(e);
        }}
        className="bg-black p-10 rounded flex flex-col gap-2"
      >
        <label htmlFor="title">Title</label>
        <input
          className="p-2 bg-black border rounded border-white"
          name="title"
          type="text"
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          value={book.title}
        />
        <label htmlFor="title">Author</label>
        <input
          className="p-2 bg-black border rounded border-white"
          name="author"
          type="text"
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          value={book.author}
        />
        <button type="submit" className="px-4 py-3 rounded bg-green-500 my-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddEdit;
