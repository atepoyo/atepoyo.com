export default function Footer() {
  return (
    <footer>
      <div className="container-header">
        <div className="text-center py-4 mt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} atepoyo.com
          </p>
        </div>
      </div>
    </footer>
  );
}
