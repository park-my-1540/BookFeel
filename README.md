# 📚 Bookfeel

**"오늘의 기분에 맞는 책, 지금 빌릴 수 있을까?"**  
BookFeel은 **Gemini AI**로 감정 키워드를 분석해 책을 추천하고, **도서관 API**로 대출 가능 여부를 확인하며, **플레이리스트와 커뮤니티**로 독서 경험을 확장하는 감성 독서 플랫폼입니다.
[Bookfeel 바로가기](https://book-feel.vercel.app/)

---

<img width="1766" height="969" alt="스크린샷 2025-08-21 오후 12 32 40" src="https://github.com/user-attachments/assets/62e80f7f-2093-4cdf-92ec-1665e9e7ed51" />

---

## ✨ 주요 기능

1. **도서 검색**
   - **알라딘 Open API** 기반 책 검색
   - 제목, 저자, 출판사 등 필터/상세검색
   - 검색어 자동완성 및 최근 검색어 관리
   - 장바구니 담기 → **Toss Payments** 결제 연동

2. **키워드 기반 도서 추천**
   - **Gemini API**를 활용한 감정 키워드 분석
   - 키워드 입력 → 맞춤 도서 추천

3. **도서 대출**
   - **도서관 정보나루 Open API** 연동
   - 지역(행정구역 코드) 선택 후 → 도서관 코드(libCode) 수집
   - ISBN 기반 소장 여부 확인 + 대출 가능 여부 최종 체크
4. **플레이리스트**
   - 도서에 맞는 유튜브 플레이리스트 추천
   - 사용자가 직접 플레이리스트 등록 및 좋아요 가능

5. **커뮤니티**
   - 게시판, 댓글, 좋아요, 필터링
   - 사용자 간 플레이리스트/도서 공유
   
5. **유저 시스템**
   - 로그인, 프로필 수정
   - 소셜 로그인 (Google, Kakao)
---
## 🛠 기술 스택
1. **Frontend**
- Remix + React + TypeScript
- Zustand → 상태 관리
- Shadcn UI + Lucide Icons → UI 컴포넌트
2. **Backend / DB**
- Supabase
3. **외부 API**
- Aladin Open API → 도서 데이터
- Gemini API → 감정 키워드 추천
- 도서관 정보나루 Open API → 도서관 소장/대출 여부 확인
4. **Infra**
- Vercel 배포
- Supabase Auth → 로그인/프로필 관리
- Toss Payments → 결제 위젯 연동
---
## 로컬 실행 방법

```bash
git clone https://github.com/your-username/bookfeel.git
cd bookfeel
npm install
npm run dev
