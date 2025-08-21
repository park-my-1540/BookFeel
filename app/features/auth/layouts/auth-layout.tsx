import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import { Heading2 } from "~/components/ui/Typography";
export default function AuthLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpen(location.pathname.endsWith("/join"));
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, []);

  const goJoin = () => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    setOpen(true);
    delayTimerRef.current = setTimeout(() => {
      navigate("/auth/join");
    }, 100);
  };

  const goLogin = () => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    setOpen(false);
    delayTimerRef.current = setTimeout(() => {
      navigate("/auth/login");
    }, 100);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "shadow-2xl rounded-xl overflow-hidden relative bg-white w-[1024px] h-5/6 boxCenter container",
        open ? "right-panel-active" : ""
      )}
    >
      <div className="sign-in-container w-full lef-0">
        <Outlet />
      </div>

      <div className="overlay-container absolute top-0 left-[50%] w-[50%] h-full overflow-hidden">
        <div className="overlay bg-gradient-to-l from-pink to-main text-white">
          <div className="overlay-panel overlay-left">
            <Heading2 className=" text-white">Welcome Back!</Heading2>
            <p className="">
              찜한 책과 플레이리스트를 이어서 즐겨요. 로그인해 주세요.
            </p>

            <Button
              variant="outline"
              size={"xl"}
              className="border-white bg-transparent mt-10"
              onClick={goLogin}
            >
              LOGIN
            </Button>
          </div>

          <div className="overlay-panel overlay-right">
            <Heading2 className=" text-white">Hello, Friend!</Heading2>
            <p>좋아하는 책과 플레이리스트를 모아두세요.</p>

            <Button
              variant="outline"
              size={"xl"}
              className="border-white bg-transparent mt-10"
              onClick={goJoin}
            >
              JOIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
