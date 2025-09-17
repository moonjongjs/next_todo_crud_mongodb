import { connectToDatabase } from "@/lib/mongodb";
import Todo from "@/models/Todo";


// GET (목록)
export async function GET() {
    await connectToDatabase();

    const todos = await Todo.find({}).sort({ 등록일: -1 });
    const resData = todos.map((item) => ({
      아이디: item._id.toString(),
      할일: item.할일,
      완료: item.완료 ? 1 : 0,
      기한: item.기한,
      등록일: item.등록일
    }));

    console.log("MONGODB_URI =", process.env.MONGODB_URI);
    
    return Response.json(resData);

}



// INSERT (입력)
export async function POST(data) {
  await connectToDatabase();
  
  const body = await data.json();

  const res = await Todo.create({
    // _id:  자동발급
    할일: body.w_todo,
    완료: body.w_completed,
    기한: body.w_expires,
    등록일: body.w_created_date
  });

  return Response.json(res ? 1 : 0);  // PHP echo 1 / 0 방식
}




// DELETE (삭제)
export async function DELETE(data) {
  await connectToDatabase();

  const { _id } = await data.json();   // 프론트에서 전달한 MongoDB _id
  const result = await Todo.findByIdAndDelete( _id );
  return Response.json(result ? 1 : 0);   // echo 1 / echo 0 응답

}



// UPDATE (수정)
export async function PUT(data) {
  await connectToDatabase();

  const body = await data.json();

  let result;

  if (body.flag === "PUT1") {
    // 완료 여부만 수정
    result = await Todo.findByIdAndUpdate(
      body.아이디,
      { 완료: body.w_completed },
      { new: true }
    );
  } else if (body.flag === "PUT2") {
    // 할일 + 만료일 수정
    result = await Todo.findByIdAndUpdate(
      body.아이디,
      { 할일: body.w_todo, 기한: body.w_expires },
      { new: true }
    );
  }

  return Response.json(result ? 1 : 0);  // PHP echo 1 / 0 방식
}
