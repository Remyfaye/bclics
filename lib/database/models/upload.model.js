import { Schema, model, models } from "mongoose";

const UploadSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Upload = models.Upload || model("Upload", UploadSchema);

export default Upload;
