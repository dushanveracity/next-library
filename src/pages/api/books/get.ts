import { collection, getDocs, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../config/firebase.config";
import { Book } from "@/models/Book";

type ResponseData = {
  books?: Book[];
  error: string;
};

export default async function handler(
  req: NextRequest,
  res: NextResponse<ResponseData>
) {
  // @ts-ignore
  const { page, sort } = req.query;

  if (!page || !sort) {
    // @ts-ignore
    res.status(400).json({ error: "Please provide page and sort parameters." });
  }

  const snapshot = await getDocs(query(collection(db, "books")));
  let books: Book[];
  books = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Book[];

  books.sort((a, b) => {
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

  books = books.slice((Number(page) - 1) * 8, Number(page) * 8);

  // @ts-ignore
  res.status(200).json({ books: books });
}
