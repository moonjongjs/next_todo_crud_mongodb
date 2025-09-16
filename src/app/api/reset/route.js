import { connectToDatabase } from "@/lib/mongodb";
import Todo from "@/models/Todo";

// ✅ 모든 할일 삭제
export async function DELETE() {
  try {
    await connectToDatabase();

    const result = await Todo.deleteMany({}); // 전체 삭제
    console.log("✅ todos 삭제 완료:", result.deletedCount);

    return new Response(
      JSON.stringify({ message: "모든 할일 삭제 완료", count: result.deletedCount }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ reset error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
