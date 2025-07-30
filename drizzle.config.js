// drizzle kit이 정보를 확인할 때 참조하는 파일

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/features/**/schema.ts", // 이 폴더 안에 있는 모든 파일을 참조 분할 방식
  out: "./app/sql/migrations", //drizzle kit이 생성한 sql 파일을 저장할 경로 뭔가 변경된점을 감지 하고 그때마다 sql 파일을 생성해줌 여기에 그 결과물
  dialect: "postgresql", 
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});