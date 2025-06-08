import Link from "next/link";

export default function Header() {
  return (
    <header className="header-bg">
      <div className="container-header">
        <nav
          className="flex justify-between items-center"
          style={{
            height: "var(--header-height)",
            padding: "var(--header-padding) 0",
          }}
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
      </div>
    </header>
  );
}
