# 01 ToDoList NexttJS MongoDB CRUD

# Next.js + MongoDB Atlas 연결 전체 순서
1. MongoDB Atlas 회원가입
MongoDB Atlas 접속
Google 계정으로 가입
Organization, Project 자동 생성


2. Database Access => Custom Roles 탭메뉴 클릭 => + Add New Custom Role 버튼 클릭 추가

# 설정
![alt text](image-1.png)

- Custom Role Name : todoAppReadWrite
- Action or Role : 셀렉트박스 => 체크박스 Database Actions and Roles  체크 선택
- Database : todolist
- 체크박스 체크: Apply to any collection
- Add Custom Role : 버튼 클릭 저장

# 결과
![alt text](image-2.png)


3.  Database Access => Database Users 탭메뉴 클릭 => + ADD NEW DATABASE USER 버튼 클릭 추가

![alt text](image-3.png)

- Password Authentication : todolist_user
- Edit Password : moon0108#
- Built-in Role : 셀렉트 박스 => Read and write to any database  읽기 쓰기 선택  
- Custom Roles : 셀렉트 박스 =>  todoAppReadWrite  선택 => 등록된 2에서 등록한 커스텀 롤 이름 Custom Role Name 
- Update User : 버튼 클릭


4. Database => Clusters => Connect 클릭 => 팝업창 열림

![alt text](image-4.png)

- Connect to your application => Drivers 선택 클릭
   => 3. Add your connection string into your application code 아래  코드 복사

```js
mongodb+srv://<db_username>:<db_password>@cluster0.ajbsvel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
- 위 에서 등록한 비밀번호화 사용자이름 기재 하기
  Replace <db_password> with the password for the <db_username> database user. Ensure any option params are URL encoded.


5. Next.js 환경 변수 등록
프로젝트 루트에 .env.local 파일 생성
다음 내용 추가:

# .env.local 형식
```js
mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.xxxxx.mongodb.net/todolist?retryWrites=true&w=majority
```

# .env.local
```js
MONGODB_URI=mongodb+srv://todolist_user:moon0108%23@cluster0.ajbsvel.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0
```
.gitignore 에 .env.local 포함되어 있어야 함 (기본 Next.js에는 이미 있음)


6. DB 연결 유틸 작성
/lib/mongodb.js 파일에 mongoose 연결 코드 작성
(앞에서 드린 코드 그대로 사용)

# 폴더 구조 예시 (App Router 기준)
my-next-app/         # Next.js 프로젝트 루트
├─ app/              # Next.js App Router (페이지, API Route 등)
│  ├─ api/
│  │  └─ todos/
│  │     └─ route.js
│  └─ page.js
├─ lib/              # ← 여기에 mongodb.js 파일 생성
│  └─ mongodb.js
├─ models/           # Mongoose 스키마 관리
│  └─ Todo.js
├─ .env.local        # Atlas 연결 문자열
├─ package.json
└─ next.config.js

[lib]
    mongodb.js


7. 모델 & API 작성
/models/Todo.js : 스키마 정의
/app/api/todos/route.js : GET, POST
/app/api/todos/[id]/route.js : PUT, DELETE

[models]
  Todo.js
```js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    번호: { type: Number }, // 필요시 수동으로 관리
    할일: { type: String, required: true },
    완료: { type: Boolean, default: false },
    기한: { type: String },
    등록일: { type: Date, default: Date.now },
  },
  { collection: "todo_list_table" } // MySQL 테이블명 그대로 사용
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

```




8. 실행 확인
npm run dev

→ 브라우저에서 http://localhost:3000/api/todos
 열면 JSON 데이터 확인 가능

정리
Atlas 회원가입
무료 클러스터 생성
DB User(todolist_user) 생성
Custom Role (todoAppReadWrite) 부여
IP 접근 허용 (0.0.0.0/0)
커넥션 URI 복사
.env.local 에 MONGODB_URI 저장
Next.js에서 mongoose 연결
모델 + API Route 작성
로컬 실행 → 배포 (Vercel)


