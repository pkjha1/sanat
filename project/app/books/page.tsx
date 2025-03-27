import Link from "next/link"

// Mock data for books
const books = [
  {
    id: 1,
    title: "Bhagavad Gita",
    author: "Vyasa",
    description: "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata.",
    coverImage: "/placeholder.svg?height=300&width=200",
    category: "Scripture",
  },
  {
    id: 2,
    title: "Upanishads",
    author: "Various",
    description: "The Upanishads are late portions of the Vedas that form the foundations of Hindu spiritual thought.",
    coverImage: "/placeholder.svg?height=300&width=200",
    category: "Scripture",
  },
  {
    id: 3,
    title: "Ramayana",
    author: "Valmiki",
    description:
      "The Ramayana is one of the two major Sanskrit epics of ancient India, the other being the Mahabharata.",
    coverImage: "/placeholder.svg?height=300&width=200",
    category: "Epic",
  },
]

export default function BooksPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Spiritual Books</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link href={`/books/${book.id}`} key={book.id}>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img src={book.coverImage || "/placeholder.svg"} alt={book.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                  {book.category}
                </span>
                <h2 className="text-xl font-bold mt-2">{book.title}</h2>
                <p className="text-sm text-gray-500">by {book.author}</p>
                <p className="mt-2 text-gray-600 line-clamp-3">{book.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

