export default function Footer() {
  return (
    <footer>
      <div className="container-header">
        <div className="bg-gray-100 text-center py-4 mt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} My Blog
          </p>
        </div>
      </div>
    </footer>
  );
}
