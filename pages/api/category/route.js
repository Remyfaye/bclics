import mongoose from "mongoose";
import { Category } from "../../../models/Category";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { name } = await req.json();
  //   console.log(categoryName);

  const createdCategory = await Category.create({ name });
  console.log(createdCategory);
  return Response.json(createdCategory);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGODB_URL);

  const categories = await Category.find();
  //   console.log(categories);
  return Response.json(categories);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { _id } = await req.json();
  console.log(_id);

  await Category.findByIdAndDelete(_id);
  return Response.json(true);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { _id, name } = await req.json();
  //   const id = body.catId;
  //   const name = body.categoryName;
  //   console.log(name);
  await Category.findByIdAndUpdate({ _id }, { name });
  return Response.json(true);
}
