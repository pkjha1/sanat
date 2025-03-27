// Mock data for the application

// Books
export const books = [
  {
    id: "1",
    title: "The Bhagavad Gita",
    author: "Vyasa",
    description:
      "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata, dated to the second century BCE.",
    cover_image: "/placeholder.svg?height=400&width=300",
    published_date: "2023-01-15",
    categories: ["philosophy", "spirituality"],
    language: "English",
  },
  {
    id: "2",
    title: "Yoga Sutras of Patanjali",
    author: "Patanjali",
    description:
      "The Yoga Sutras of Patanjali are a collection of 196 Indian sutras on the theory and practice of yoga.",
    cover_image: "/placeholder.svg?height=400&width=300",
    published_date: "2023-02-20",
    categories: ["yoga", "philosophy"],
    language: "English",
  },
  {
    id: "3",
    title: "Autobiography of a Yogi",
    author: "Paramahansa Yogananda",
    description: "Autobiography of a Yogi is an autobiography of Paramahansa Yogananda first published in 1946.",
    cover_image: "/placeholder.svg?height=400&width=300",
    published_date: "2023-03-10",
    categories: ["biography", "spirituality"],
    language: "English",
  },
]

// Places
export const places = [
  {
    id: "1",
    name: "Varanasi",
    location: "Uttar Pradesh, India",
    description:
      "Varanasi is a city on the banks of the Ganges in Uttar Pradesh, India. It is one of the oldest continuously inhabited cities in the world.",
    images: ["/placeholder.svg?height=400&width=600"],
    coordinates: { lat: 25.3176, lng: 82.9739 },
    categories: ["temple", "river"],
  },
  {
    id: "2",
    name: "Rishikesh",
    location: "Uttarakhand, India",
    description:
      "Rishikesh is a city in India's northern state of Uttarakhand, in the Himalayan foothills beside the Ganges River.",
    images: ["/placeholder.svg?height=400&width=600"],
    coordinates: { lat: 30.0869, lng: 78.2676 },
    categories: ["ashram", "river"],
  },
  {
    id: "3",
    name: "Bodh Gaya",
    location: "Bihar, India",
    description:
      "Bodh Gaya is a Buddhist pilgrimage site in Gaya district of Bihar, India, where Gautama Buddha is said to have attained Enlightenment.",
    images: ["/placeholder.svg?height=400&width=600"],
    coordinates: { lat: 24.6961, lng: 84.9911 },
    categories: ["temple", "historical"],
  },
]

// Teachings
export const teachings = [
  {
    id: "1",
    title: "Introduction to Meditation",
    author: "Swami Vivekananda",
    content:
      "Meditation is the practice of focusing one's mind for a period of time, while also reducing or removing thoughts of stress, anxiety, and distractions.",
    date: "2023-04-05",
    categories: ["meditation", "mindfulness"],
  },
  {
    id: "2",
    title: "The Four Noble Truths",
    author: "Buddha",
    content:
      "The Four Noble Truths are the foundation of Buddhist philosophy: the truth of suffering, the truth of the cause of suffering, the truth of the end of suffering, and the truth of the path that leads to the end of suffering.",
    date: "2023-04-12",
    categories: ["buddhism", "philosophy"],
  },
  {
    id: "3",
    title: "Karma Yoga: The Path of Action",
    author: "Sri Krishna",
    content:
      "Karma Yoga is the path of action, where one performs their duties without attachment to the results, dedicating all actions to the Divine.",
    date: "2023-04-20",
    categories: ["yoga", "spirituality"],
  },
]

// Helper function to fetch data
export async function fetchData(collection, id = null) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let data

  switch (collection) {
    case "books":
      data = books
      break
    case "places":
      data = places
      break
    case "teachings":
      data = teachings
      break
    default:
      data = []
  }

  if (id) {
    return data.find((item) => item.id === id) || null
  }

  return data
}

