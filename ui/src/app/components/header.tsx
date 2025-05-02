import Link from "next/link";
import useToken from "../hooks/use-token";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout } = useToken();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  return (
    <header className="flex justify-between items-center p-4 bg-blue-900">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-white font-bold">CRUD</span>
        </div>
      </div>

      {
        isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button className="cursor-pointer bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login">Login</Link>
          </div>
        )
      }
    </header>
  );
}