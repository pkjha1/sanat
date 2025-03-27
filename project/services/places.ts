// Mock data for a single place
export function fetchPlaceData(id: string) {
  return {
    id: Number.parseInt(id),
    name: "Varanasi",
    description:
      "One of the oldest continuously inhabited cities in the world and a major religious hub in India. Situated on the banks of the sacred Ganges River, Varanasi is a pilgrimage site for Hindus who come to bathe in the holy waters and perform funeral rites.",
    fullDescription: `
      Varanasi, also known as Kashi or Banaras, is one of the oldest living cities in the world. For thousands of years, it has been a center of learning, culture, and spirituality. The city is mentioned in ancient texts like the Rigveda, dating back to 1500 BCE.
      
      Situated on the banks of the sacred Ganges River, Varanasi is considered one of the holiest cities in Hinduism. Pilgrims from all over India and beyond come to bathe in the holy waters of the Ganges, believing it will cleanse them of their sins and help achieve moksha (liberation from the cycle of rebirth).
      
      The city is also known for its numerous ghats (steps leading down to the river), with Dashashwamedh Ghat and Manikarnika Ghat being the most famous. The latter is primarily used as a cremation site, as many Hindus believe that being cremated in Varanasi brings salvation.
      
      Beyond its religious significance, Varanasi is a cultural hub known for its silk weaving, classical music, and the Banaras Hindu University, one of the oldest and most prestigious universities in India.
    `,
    image: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    coordinates: { lat: 25.3176, lng: 82.9739 },
    address: "Varanasi, Uttar Pradesh, India",
    phone: "+91 542 222 1711",
    website: "https://varanasi.nic.in",
    openingHours: "Open 24 hours",
    bestTimeToVisit: "October to March",
    state: "Uttar Pradesh",
    type: "City",
    temples: 23,
    nearbyPlaces: [
      {
        id: 2,
        name: "Sarnath",
        description: "The place where Buddha gave his first sermon after attaining enlightenment.",
        image: "/placeholder.svg?height=200&width=300",
        coordinates: { lat: 25.3715, lng: 83.0235 },
        distance: "10 km",
      },
      {
        id: 3,
        name: "Ramnagar",
        description: "Home to the Ramnagar Fort and other historical sites.",
        image: "/placeholder.svg?height=200&width=300",
        coordinates: { lat: 25.2815, lng: 83.024 },
        distance: "14 km",
      },
    ],
    temples: [
      {
        id: 101,
        name: "Kashi Vishwanath Temple",
        description: "One of the most famous Hindu temples dedicated to Lord Shiva.",
        image: "/placeholder.svg?height=200&width=300",
        coordinates: { lat: 25.3109, lng: 83.0107 },
        mainDeity: "Lord Shiva",
      },
      {
        id: 102,
        name: "Sankat Mochan Hanuman Temple",
        description: "A famous temple dedicated to Lord Hanuman.",
        image: "/placeholder.svg?height=200&width=300",
        coordinates: { lat: 25.2841, lng: 82.9995 },
        mainDeity: "Lord Hanuman",
      },
      {
        id: 103,
        name: "Durga Temple",
        description: "Also known as the Monkey Temple, dedicated to Goddess Durga.",
        image: "/placeholder.svg?height=200&width=300",
        coordinates: { lat: 25.283, lng: 83.0062 },
        mainDeity: "Goddess Durga",
      },
      {
        id: 104,
        name: "Tulsi Manas Temple",
        description: "Built in the 1960s, dedicated to Lord Rama.",
        image: "/placeholder.svg?height=200&width=300",
        coordinates: { lat: 25.3023, lng: 83.0063 },
        mainDeity: "Lord Rama",
      },
    ],
    history: `
      Varanasi's history dates back to at least the 11th or 12th century BCE, making it one of the oldest continuously inhabited cities in the world. The city was a major religious and cultural center during the time of Buddha (6th century BCE) and has been a pilgrimage site for Hindus for thousands of years.
      
      Throughout its long history, Varanasi has been known by various names, including Kashi and Banaras. It has been mentioned in ancient texts like the Rigveda, Puranas, and Buddhist scriptures.
      
      During the Mauryan Empire (322-185 BCE), Varanasi was an important center of trade and commerce. It continued to flourish under various dynasties, including the Guptas (4th-6th century CE), who patronized art, culture, and education in the city.
      
      In the medieval period, Varanasi faced several invasions and destructions, particularly during the Muslim conquests. Many of its ancient temples were destroyed and rebuilt multiple times. The current Kashi Vishwanath Temple, for instance, was rebuilt in the 18th century after being demolished by Mughal Emperor Aurangzeb.
      
      During the British colonial period, Varanasi became part of the Benares State, a princely state. After India's independence in 1947, it was integrated into the state of Uttar Pradesh.
      
      Today, Varanasi continues to be a major cultural and religious center, attracting millions of pilgrims and tourists from around the world.
    `,
    religiousSignificance: `
      Varanasi holds immense religious significance in Hinduism. It is considered one of the seven sacred cities (Sapta Puri) where Hindus believe that attaining moksha (liberation from the cycle of rebirth) is possible.
      
      The city is associated with Lord Shiva, one of the principal deities of Hinduism. According to Hindu mythology, Varanasi is the abode of Lord Shiva and his consort Parvati. The Kashi Vishwanath Temple, dedicated to Lord Shiva, is one of the twelve Jyotirlingas (special shrines of Shiva) and is a major pilgrimage site.
      
      The Ganges River, which flows through Varanasi, is considered sacred in Hinduism. Hindus believe that bathing in the Ganges can cleanse one of all sins. Many pilgrims come to Varanasi to perform the ritual bath (snan) in the river.
      
      Varanasi is also significant for death rituals in Hinduism. Many Hindus believe that being cremated at the Manikarnika Ghat or Harishchandra Ghat in Varanasi ensures salvation (moksha). As a result, many elderly and terminally ill Hindus come to Varanasi to spend their last days.
      
      Beyond Hinduism, Varanasi has significance in other religions as well. It is near Sarnath, where Buddha gave his first sermon after attaining enlightenment. The city has also been a center of learning and culture, with the Banaras Hindu University being one of the oldest and most prestigious universities in India.
      
      The Ganga Aarti, a ritual performed every evening at the Dashashwamedh Ghat, is a spectacular ceremony that attracts thousands of visitors. Priests perform the aarti (offering of light) to the Ganges River, accompanied by chants, bells, and incense.
    `,
  }
}

