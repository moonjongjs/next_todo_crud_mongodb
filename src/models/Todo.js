import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  아이디: { type: String, default: null, required: true },
  할일: { type: String, default: null, required: true },
  완료: { type: Number, default: 0 , required: true},
  기한: { type: String, default: null, required: true },
  등록일: { type: String, default: null , required: true}
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
