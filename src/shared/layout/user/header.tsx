import Link from 'next/link'


export const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              My<span className="text-blue-600">Shop</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</Link>
          </nav>

          {/* Placeholder cho nút hoặc icon */}
          <div>
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
