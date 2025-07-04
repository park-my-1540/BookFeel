# 📚 Bookfeel

무드에 어울리는 책을 추천해주는 감성 독서 플랫폼

---

## ✨ 주요 기능

1. **도서 구매 및 찜하기**
   - 장바구니 및 결제 페이지
   - 유저 후기 작성
   - TossPayments 연동 (또는 가상 결제)

2. **도서 리스트 및 인기 순위**
   - 전체 도서 목록, 필터/정렬
   - 주간 인기 리스트, 태그 기반 검색

3. **🎵 감성 플레이리스트**
   - 유저가 직접 등록한 유튜브 플레이리스트
   - 도서와 어울리는 배경 음악 함께 감상

4. **🧠 GPT 추천**
   - 현재 기분 선택 → GPT가 감정 기반 도서 추천

---

## 🛠 기술 스택

- **Next.js (App Router)**
- **TailwindCSS + shadcn/ui**
- **TypeScript**
- **OpenAI GPT API**
- **(선택) TossPayments 결제 연동**

---

## 🧪 로컬 실행 방법

```bash
git clone https://github.com/your-username/bookfeel.git
cd bookfeel
npm install
npm run dev
