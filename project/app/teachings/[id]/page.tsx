import Link from "next/link"

// Mock data for teachings
const teachings = [
  {
    id: 1,
    title: "The Path of Karma Yoga",
    teacher: "Swami Vivekananda",
    description:
      "An exploration of selfless action as a spiritual path, based on the teachings of the Bhagavad Gita. Karma Yoga is one of the four classical paths to spiritual liberation in Hinduism, focusing on selfless action as a means to achieve moksha. This teaching delves into how performing one's duties without attachment to results can lead to spiritual growth and inner peace.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Philosophy",
    duration: "45 minutes",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    keyPoints: [
      "Understanding the concept of selfless action",
      "The role of duty (dharma) in spiritual practice",
      "How to practice detachment from results",
      "Integrating Karma Yoga into daily life",
      "The relationship between Karma Yoga and other spiritual paths",
    ],
    relatedTeachings: [2, 3],
  },
  {
    id: 2,
    title: "Understanding Meditation",
    teacher: "Paramahansa Yogananda",
    description:
      "A comprehensive guide to meditation techniques and their benefits for spiritual growth. This teaching covers various meditation methods from different traditions, with a focus on concentration techniques, mindfulness practices, and mantra meditation. It also explores the scientific benefits of regular meditation and how it can transform one's consciousness.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Meditation",
    duration: "30 minutes",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    keyPoints: [
      "Different types of meditation techniques",
      "The science behind meditation's benefits",
      "How to establish a regular meditation practice",
      "Common obstacles in meditation and how to overcome them",
      "Advanced meditation techniques for experienced practitioners",
    ],
    relatedTeachings: [1, 3],
  },
  {
    id: 3,
    title: "The Essence of Vedanta",
    teacher: "Swami Chinmayananda",
    description:
      "An introduction to the core principles of Vedanta philosophy and its relevance in modern life. Vedanta, meaning 'the end of the Vedas,' represents the culmination of Hindu philosophical thought. This teaching explores the concepts of Brahman (ultimate reality), Atman (individual soul), Maya (illusion), and the path to self-realization according to Advaita Vedanta.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Philosophy",
    duration: "60 minutes",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    keyPoints: [
      "The core principles of Advaita Vedanta",
      "Understanding the nature of reality and consciousness",
      "The concept of Maya (illusion) and its role in our perception",
      "The path to self-realization according to Vedanta",
      "Practical applications of Vedantic principles in daily life",
    ],
    relatedTeachings: [1, 2],
  },
]

export default function TeachingDetailPage({ params }: { params: { id: string } }) {
  const teachingId = Number.parseInt(params.id)
  const teaching = teachings.find((t) => t.id === teachingId)

  if (!teaching) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Teaching not found</h1>
        <p className="mb-8">The teaching you're looking for doesn't exist or has been removed.</p>
        <Link href="/teachings" className="text-purple-600 hover:underline">
          ← Back to all teachings
        </Link>
      </div>
    )
  }

  // Find related teachings
  const relatedTeachingsList = teaching.relatedTeachings.map((id) => teachings.find((t) => t.id === id)).filter(Boolean)

  return (
    <div className="container mx-auto px-4 py-24">
      <Link href="/teachings" className="text-purple-600 hover:underline mb-8 inline-block">
        ← Back to all teachings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{teaching.title}</h1>
          <div className="flex items-center mb-6">
            <span className="text-gray-600 mr-2">by {teaching.teacher}</span>
            <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {teaching.category}
            </span>
          </div>

          <div className="aspect-video w-full mb-6">
            <iframe
              src={teaching.videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="mb-6">{teaching.description}</p>

            <h2 className="text-xl font-semibold mb-4">Key Points</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {teaching.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-4">Reflection Questions</h2>
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <ol className="list-decimal pl-5 space-y-2">
                <li>How does this teaching relate to your personal spiritual journey?</li>
                <li>What aspects of this teaching can you apply in your daily life?</li>
                <li>How does this teaching compare with other spiritual traditions you're familiar with?</li>
                <li>What questions or insights arose for you while engaging with this teaching?</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold text-lg mb-4">About the Teacher</h3>
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-800 font-bold text-xl">
                  {teaching.teacher
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h4 className="font-medium">{teaching.teacher}</h4>
                <p className="text-sm text-gray-600">Spiritual Teacher</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {teaching.teacher} is a renowned spiritual teacher with decades of experience in guiding seekers on the
              path of self-realization. Their teachings blend traditional wisdom with practical insights for modern
              life.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-purple-600 hover:underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Download Transcript (PDF)
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-purple-600 hover:underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Download Audio (MP3)
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-purple-600 hover:underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Recommended Reading List
                </a>
              </li>
            </ul>
          </div>

          {relatedTeachingsList.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Related Teachings</h3>
              <div className="space-y-4">
                {relatedTeachingsList.map((relatedTeaching) => (
                  <Link href={`/teachings/${relatedTeaching.id}`} key={relatedTeaching.id}>
                    <div className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <img
                        src={relatedTeaching.image || "/placeholder.svg"}
                        alt={relatedTeaching.title}
                        className="w-20 h-12 object-cover rounded mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{relatedTeaching.title}</h4>
                        <p className="text-xs text-gray-500">{relatedTeaching.duration}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

