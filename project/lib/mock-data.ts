// Mock data to replace Supabase fetching

export const books = [
  {
    id: 1,
    title: "The Spiritual Journey",
    author: "Swami Vivekananda",
    description: "A comprehensive guide to spiritual awakening and self-realization.",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "spirituality",
    publishedDate: "2020-01-15",
    pages: 320,
    language: "English",
  },
  {
    id: 2,
    title: "Meditation Techniques",
    author: "Paramahansa Yogananda",
    description: "Learn various meditation techniques to calm your mind and find inner peace.",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "meditation",
    publishedDate: "2019-05-22",
    pages: 256,
    language: "English",
  },
  {
    id: 3,
    title: "Vedic Wisdom",
    author: "Sri Aurobindo",
    description: "Explore the ancient wisdom of the Vedas and their relevance in modern times.",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "philosophy",
    publishedDate: "2021-03-10",
    pages: 412,
    language: "English",
  },
]

export const places = [
  {
    id: 1,
    name: "Rishikesh",
    description:
      "Known as the 'Yoga Capital of the World', Rishikesh is a spiritual hub located on the banks of the Ganges river.",
    image: "/placeholder.svg?height=400&width=600",
    location: "Uttarakhand, India",
    type: "ashram",
  },
  {
    id: 2,
    name: "Varanasi",
    description: "One of the oldest continuously inhabited cities in the world and a major religious hub in India.",
    image: "/placeholder.svg?height=400&width=600",
    location: "Uttar Pradesh, India",
    type: "temple",
  },
  {
    id: 3,
    name: "Bodh Gaya",
    description: "The place where Gautama Buddha is said to have attained enlightenment under the Bodhi tree.",
    image: "/placeholder.svg?height=400&width=600",
    location: "Bihar, India",
    type: "monastery",
  },
]

export const teachings = [
  {
    id: 1,
    title: "The Path of Dharma",
    teacher: "Swami Sivananda",
    description: "Understanding the concept of Dharma and how to follow it in daily life.",
    videoUrl: "https://example.com/video1",
    category: "philosophy",
    duration: "45 minutes",
  },
  {
    id: 2,
    title: "Mindfulness Meditation",
    teacher: "Thich Nhat Hanh",
    description: "A guided meditation session focusing on mindfulness and present moment awareness.",
    videoUrl: "https://example.com/video2",
    category: "meditation",
    duration: "30 minutes",
  },
  {
    id: 3,
    title: "Bhakti Yoga: The Path of Devotion",
    teacher: "Radhanath Swami",
    description: "Exploring the path of devotion and its significance in spiritual practice.",
    videoUrl: "https://example.com/video3",
    category: "yoga",
    duration: "60 minutes",
  },
]

// Mock function to replace Supabase fetching
export async function fetchData(collection, id = null) {
  const collections = {
    books,
    places,
    teachings,
  }

  if (id) {
    return collections[collection].find((item) => item.id === Number.parseInt(id)) || null
  }

  return collections[collection] || []
}

