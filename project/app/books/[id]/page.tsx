import Link from "next/link"

// Mock data for books
const books = [
  {
    id: 1,
    title: "Bhagavad Gita",
    author: "Vyasa",
    description:
      "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a conversation between Pandava prince Arjuna and his guide and charioteer Krishna on a variety of philosophical issues. Faced with a fratricidal war, a despondent Arjuna turns to his charioteer Krishna for counsel on the battlefield. Krishna, through the course of the Gita, imparts to Arjuna wisdom, the path to devotion, and the doctrine of selfless action.",
    coverImage: "/placeholder.svg?height=300&width=200",
    category: "Scripture",
    language: "Sanskrit",
    pages: 700,
    publishedYear: "~400 BCE",
    chapters: 18,
  },
  {
    id: 2,
    title: "Upanishads",
    author: "Various",
    description:
      'The Upanishads are late portions of the Vedas that form the foundations of Hindu spiritual thought. They primarily discuss philosophy, meditation, and the nature of God; they form the core spiritual thought of Vedantic Hinduism. Considered by many as the most important part of the Vedas, the Upanishads are referred to as Vedānta ("the end of the Vedas"). The concepts of Brahman (ultimate reality) and Ātman (soul, self) are central ideas in the Upanishads.',
    coverImage: "/placeholder.svg?height=300&width=200",
    category: "Scripture",
    language: "Sanskrit",
    pages: 200,
    publishedYear: "~800-500 BCE",
    chapters: 13,
  },
  {
    id: 3,
    title: "Ramayana",
    author: "Valmiki",
    description:
      "The Ramayana is one of the two major Sanskrit epics of ancient India, the other being the Mahabharata. The epic, traditionally ascribed to the Maharishi Valmiki, narrates the life of Rama, a legendary prince of Ayodhya city in the kingdom of Kosala. The epic follows his fourteen-year exile to the forest urged by his father King Dasharatha, on the request of Rama's stepmother Kaikeyi; his travels across forests in the Indian subcontinent with his wife Sita and brother Lakshmana, the kidnapping of Sita by Ravana – the king of Lanka, that resulted in war; and Rama's eventual return to Ayodhya to be crowned king.",
    coverImage: "/placeholder.svg?height=300&width=200",
    category: "Epic",
    language: "Sanskrit",
    pages: 24000,
    publishedYear: "~7th-5th century BCE",
    chapters: 7,
  },
]

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const bookId = Number.parseInt(params.id)
  const book = books.find((b) => b.id === bookId)

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Book not found</h1>
        <p className="mb-8">The book you're looking for doesn't exist or has been removed.</p>
        <Link href="/books" className="text-amber-600 hover:underline">
          ← Back to all books
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Link href="/books" className="text-amber-600 hover:underline mb-8 inline-block">
        ← Back to all books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img src={book.coverImage || "/placeholder.svg"} alt={book.title} className="w-full rounded-lg shadow-md" />

          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Book Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Author:</span>
                <span className="font-medium">{book.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{book.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Language:</span>
                <span className="font-medium">{book.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pages:</span>
                <span className="font-medium">{book.pages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Published:</span>
                <span className="font-medium">{book.publishedYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chapters:</span>
                <span className="font-medium">{book.chapters}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
              Add to Reading List
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-6">by {book.author}</p>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="mb-6">{book.description}</p>

            <h2 className="text-xl font-semibold mb-4">Significance</h2>
            <p className="mb-6">
              This sacred text holds immense spiritual significance in Hindu philosophy and has influenced countless
              generations with its timeless wisdom. It continues to be studied and revered by spiritual seekers around
              the world.
            </p>

            <h2 className="text-xl font-semibold mb-4">Key Teachings</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>The nature of the self and the ultimate reality</li>
              <li>The path of selfless action (Karma Yoga)</li>
              <li>The importance of devotion (Bhakti Yoga)</li>
              <li>The pursuit of knowledge (Jnana Yoga)</li>
              <li>The practice of meditation and self-discipline</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-2">Commentaries</h3>
                <p className="text-sm text-gray-600">
                  Explore scholarly interpretations and commentaries on this text.
                </p>
                <a href="#" className="text-amber-600 text-sm hover:underline mt-2 inline-block">
                  View Commentaries →
                </a>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-2">Audio Recitations</h3>
                <p className="text-sm text-gray-600">Listen to traditional recitations of this sacred text.</p>
                <a href="#" className="text-amber-600 text-sm hover:underline mt-2 inline-block">
                  Listen Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

