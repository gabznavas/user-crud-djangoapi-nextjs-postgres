import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <div>
          <span>CRUD User</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login">Login</Link>
      </div>
    </header>
  );
}