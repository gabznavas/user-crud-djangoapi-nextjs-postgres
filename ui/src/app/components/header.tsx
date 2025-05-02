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
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <div>
          <span>CRUD User</span>
        </div>
      </div>

      {
        isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-red transition-colors cursor-pointer" onClick={handleLogout}>Logout</button>
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