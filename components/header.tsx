import Link from "next/link";

export default function Header() {
  return (
    <header
      className="fixed top-0 w-full shadow z-50 header-bg"
      style={{ height: "var(--header-height)" }}
    >
      <nav
        className="container-header p-4 flex justify-between items-center"
        style={{ height: "var(--header-height)" }}
      >
        <div className="font-bold text-xl">
          <Link href="/">atepoyo.com</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">記事一覧</Link>
          </li>
          <li>
            <Link href="/genres">ジャンル</Link>
          </li>
          <li>
            <Link href="/profile">プロフィール</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
