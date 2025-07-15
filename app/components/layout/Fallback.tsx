import emptyImage from "@/assets/icon_book.png";

export default function Fallback() {
  return (
    <div className='flex flex-col items-center justify-center pt-28'>
      <img width={80} height={80} src={emptyImage} alt='noResult' />
      <p className='text-textSecondary pt-5'>문제가 발생했습니다.</p>
    </div>
  );
}
