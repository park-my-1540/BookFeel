import { Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
      <Outlet />
    </div>
  );
}
