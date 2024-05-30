import { addDoc, collection, getDocs, query } from "firebase/firestore";
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
  const bookData = req.body;

  await addDoc(collection(db, "books"), bookData);

  res.status(200).json({ books: books });
}
