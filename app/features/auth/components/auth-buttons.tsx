import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKakaoTalk, faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
export default function AuthButtons() {
  return (
    <div className='w-full flex flex-col items-center gap-10'>
      <div className='w-full flex justify-center gap-4'>
        <Link
          to='/auth/social/kakao/start'
          className='p-3 rounded-full border border-borderGray'
        >
          <FontAwesomeIcon icon={faKakaoTalk} size='lg' />
        </Link>
        <Link
          to='/auth/social/google/start'
          className='p-3 rounded-full border border-borderGray'
        >
          <FontAwesomeIcon icon={faGooglePlusG} size='lg' />
        </Link>
      </div>
    </div>
  );
}
