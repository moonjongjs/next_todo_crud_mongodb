import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  할일: { type: String, default: null, required: true },
  완료: { type: Number, default: 0 },
  기한: { type: String, default: null, required: true },
  등록일: { type: String, default: null , required: true}
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
