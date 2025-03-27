"use server"

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function seedDatabase() {
  try {
    // Clear existing data first (optional - comment out if you want to keep existing data)
    await clearExistingData()

    // Seed users and profiles
    await seedUsers()

    // Seed books and chapters
    const bookIds = await seedBooks()
    await seedBookChapters(bookIds)

    // Seed teachings
    await seedTeachings()

    // Seed audiobooks and chapters
    const audiobookIds = await seedAudiobooks()
    await seedAudiobookChapters(audiobookIds)

    // Seed religious places
    await seedReligiousPlaces()

    // Seed stories
    await seedStories()

    // Seed donations
    await seedDonations()

    revalidatePath("/admin")
    return { success: true, message: "Database seeded successfully!" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return {
      success: false,
      message: `Error seeding database: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

async function clearExistingData() {
  // Only clear content tables, not user accounts
  await sql`TRUNCATE TABLE books CASCADE;`
  await sql`TRUNCATE TABLE book_chapters CASCADE;`
  await sql`TRUNCATE TABLE teachings CASCADE;`
  await sql`TRUNCATE TABLE audiobooks CASCADE;`
  await sql`TRUNCATE TABLE audiobook_chapters CASCADE;`
  await sql`TRUNCATE TABLE religious_places CASCADE;`
  await sql`TRUNCATE TABLE religious_place_images CASCADE;`
  await sql`TRUNCATE TABLE stories CASCADE;`
  await sql`TRUNCATE TABLE donations CASCADE;`
}

async function seedUsers() {
  // Only add sample users if they don't exist
  const existingUsers = await sql`SELECT COUNT(*) FROM auth.users;`

  if (Number.parseInt(existingUsers.rows[0].count) < 3) {
    // Note: In a real application, you would use auth.sign_up() or similar
    // This is just for demonstration purposes
    await sql`
      INSERT INTO profiles (id, full_name, bio, avatar_url, email, role)
      VALUES 
        (gen_random_uuid(), 'Sample User', 'A regular user of the platform', '/avatars/user1.png', 'user@example.com', 'user'),
        (gen_random_uuid(), 'Content Creator', 'Creates spiritual content', '/avatars/creator.png', 'creator@example.com', 'creator'),
        (gen_random_uuid(), 'Admin User', 'Administrator of the platform', '/avatars/admin.png', 'admin@example.com', 'admin')
      ON CONFLICT (email) DO NOTHING;
    `
  }
}

async function seedBooks() {
  const books = [
    {
      title: "Bhagavad Gita: The Song of God",
      author: "Vyasa",
      description:
        "A 700-verse Hindu scripture that is part of the epic Mahabharata, containing a conversation between Pandava prince Arjuna and his guide Lord Krishna.",
      cover_image: "/books/bhagavad-gita.jpg",
      published_date: "2023-01-15",
    },
    {
      title: "Upanishads: Ancient Wisdom",
      author: "Various Sages",
      description:
        "A collection of texts that contain some of the central philosophical concepts and ideas of Hinduism.",
      cover_image: "/books/upanishads.jpg",
      published_date: "2023-02-20",
    },
    {
      title: "Yoga Sutras of Patanjali",
      author: "Patanjali",
      description: "A collection of 196 Indian sutras on the theory and practice of yoga.",
      cover_image: "/books/yoga-sutras.jpg",
      published_date: "2023-03-10",
    },
    {
      title: "The Ramayana",
      author: "Valmiki",
      description: "One of the two major Sanskrit epics of ancient India, telling the story of Rama and Sita.",
      cover_image: "/books/ramayana.jpg",
      published_date: "2023-04-05",
    },
    {
      title: "The Mahabharata",
      author: "Vyasa",
      description:
        "One of the two major Sanskrit epics of ancient India, containing the Bhagavad Gita and many spiritual teachings.",
      cover_image: "/books/mahabharata.jpg",
      published_date: "2023-05-12",
    },
  ]

  const bookIds = []

  for (const book of books) {
    const result = await sql`
      INSERT INTO books (title, author, description, cover_image, published_date, created_at, updated_at)
      VALUES (${book.title}, ${book.author}, ${book.description}, ${book.cover_image}, ${book.published_date}, NOW(), NOW())
      RETURNING id;
    `
    bookIds.push(result.rows[0].id)
  }

  return bookIds
}

async function seedBookChapters(bookIds: string[]) {
  const chaptersData = [
    // Bhagavad Gita chapters
    {
      book_id: bookIds[0],
      title: "Arjuna's Dilemma",
      content:
        "Arjuna, seeing his relatives on the opposing army side, is filled with compassion and despair. He drops his bow and arrow and decides not to fight.",
      order_number: 1,
    },
    {
      book_id: bookIds[0],
      title: "Transcendental Knowledge",
      content:
        "Krishna explains the difference between the body and the soul. He explains that the soul is eternal and imperishable.",
      order_number: 2,
    },
    {
      book_id: bookIds[0],
      title: "Karma Yoga",
      content: "Krishna explains the importance of doing one's duty without attachment to the results.",
      order_number: 3,
    },

    // Upanishads chapters
    {
      book_id: bookIds[1],
      title: "Isha Upanishad",
      content:
        "This Upanishad deals with the union of God, soul, and nature. It teaches that God is the ruler of souls and nature.",
      order_number: 1,
    },
    {
      book_id: bookIds[1],
      title: "Kena Upanishad",
      content: "This Upanishad explains how the worship of specific deities is just the worship of the one Brahman.",
      order_number: 2,
    },

    // Yoga Sutras chapters
    {
      book_id: bookIds[2],
      title: "Samadhi Pada",
      content:
        'This chapter contains the famous definition of yoga as "the stilling of the changing states of the mind".',
      order_number: 1,
    },
    {
      book_id: bookIds[2],
      title: "Sadhana Pada",
      content: "This chapter outlines the eight limbs of yoga practice.",
      order_number: 2,
    },

    // Ramayana chapters
    { book_id: bookIds[3], title: "Bala Kanda", content: "The origins and childhood of Rama.", order_number: 1 },
    {
      book_id: bookIds[3],
      title: "Ayodhya Kanda",
      content: "The preparations for Rama's coronation and his exile into the forest.",
      order_number: 2,
    },

    // Mahabharata chapters
    { book_id: bookIds[4], title: "Adi Parva", content: "The origins of the Kuru dynasty.", order_number: 1 },
    {
      book_id: bookIds[4],
      title: "Sabha Parva",
      content: "The game of dice and the humiliation of the Pandavas.",
      order_number: 2,
    },
  ]

  for (const chapter of chaptersData) {
    await sql`
      INSERT INTO book_chapters (book_id, title, content, order_number, created_at, updated_at)
      VALUES (${chapter.book_id}, ${chapter.title}, ${chapter.content}, ${chapter.order_number}, NOW(), NOW());
    `
  }
}

async function seedTeachings() {
  const teachings = [
    {
      title: "The Four Aims of Life",
      author: "Swami Vivekananda",
      content:
        "In Hindu philosophy, there are four aims of human life: Dharma (righteousness), Artha (prosperity), Kama (pleasure), and Moksha (liberation).",
      category: "Philosophy",
      published_date: "2023-01-20",
    },
    {
      title: "The Three Gunas",
      author: "Sri Aurobindo",
      content:
        "The three gunas are sattva (goodness, constructive, harmonious), rajas (passion, active, confused), and tamas (darkness, destructive, chaotic).",
      category: "Spirituality",
      published_date: "2023-02-15",
    },
    {
      title: "The Path of Bhakti Yoga",
      author: "Ramakrishna Paramahamsa",
      content:
        "Bhakti Yoga is the path of devotion, the method of attaining God through love and the loving recollection of God.",
      category: "Yoga",
      published_date: "2023-03-05",
    },
    {
      title: "Understanding Karma",
      author: "Paramahansa Yogananda",
      content:
        "Karma is the law of cause and effect. Every action generates a force of energy that returns to us in like kind.",
      category: "Philosophy",
      published_date: "2023-04-10",
    },
    {
      title: "The Power of Meditation",
      author: "Sadhguru",
      content:
        "Meditation is not about concentration or contemplation. It is about creating a certain space where you are not identified with your body and mind.",
      category: "Meditation",
      published_date: "2023-05-25",
    },
  ]

  for (const teaching of teachings) {
    await sql`
      INSERT INTO teachings (title, author, content, category, published_date, created_at, updated_at)
      VALUES (${teaching.title}, ${teaching.author}, ${teaching.content}, ${teaching.category}, ${teaching.published_date}, NOW(), NOW());
    `
  }
}

async function seedAudiobooks() {
  const audiobooks = [
    {
      title: "Bhagavad Gita Audio",
      narrator: "Krishna Das",
      description: "Audio rendition of the Bhagavad Gita with commentary.",
      cover_image: "/audiobooks/bhagavad-gita-audio.jpg",
      duration: "05:30:00",
      published_date: "2023-01-25",
    },
    {
      title: "Upanishads Chanting",
      narrator: "Pandit Jasraj",
      description: "Traditional chanting of selected Upanishads with translations.",
      cover_image: "/audiobooks/upanishads-audio.jpg",
      duration: "04:45:00",
      published_date: "2023-02-28",
    },
    {
      title: "Ramayana Audio Epic",
      narrator: "Amitabh Bachchan",
      description: "Dramatic narration of the Ramayana epic.",
      cover_image: "/audiobooks/ramayana-audio.jpg",
      duration: "12:20:00",
      published_date: "2023-03-15",
    },
  ]

  const audiobookIds = []

  for (const audiobook of audiobooks) {
    const result = await sql`
      INSERT INTO audiobooks (title, narrator, description, cover_image, duration, published_date, created_at, updated_at)
      VALUES (${audiobook.title}, ${audiobook.narrator}, ${audiobook.description}, ${audiobook.cover_image}, ${audiobook.duration}, ${audiobook.published_date}, NOW(), NOW())
      RETURNING id;
    `
    audiobookIds.push(result.rows[0].id)
  }

  return audiobookIds
}

async function seedAudiobookChapters(audiobookIds: string[]) {
  const audioChapters = [
    // Bhagavad Gita Audio chapters
    {
      audiobook_id: audiobookIds[0],
      title: "Introduction to Bhagavad Gita",
      audio_url: "/audio/bhagavad-gita/intro.mp3",
      duration: "15:30",
      order_number: 1,
    },
    {
      audiobook_id: audiobookIds[0],
      title: "Chapter 1: Arjuna's Dilemma",
      audio_url: "/audio/bhagavad-gita/chapter1.mp3",
      duration: "25:45",
      order_number: 2,
    },
    {
      audiobook_id: audiobookIds[0],
      title: "Chapter 2: Transcendental Knowledge",
      audio_url: "/audio/bhagavad-gita/chapter2.mp3",
      duration: "30:20",
      order_number: 3,
    },

    // Upanishads Chanting chapters
    {
      audiobook_id: audiobookIds[1],
      title: "Isha Upanishad Chanting",
      audio_url: "/audio/upanishads/isha.mp3",
      duration: "18:15",
      order_number: 1,
    },
    {
      audiobook_id: audiobookIds[1],
      title: "Kena Upanishad Chanting",
      audio_url: "/audio/upanishads/kena.mp3",
      duration: "22:40",
      order_number: 2,
    },

    // Ramayana Audio Epic chapters
    {
      audiobook_id: audiobookIds[2],
      title: "Bala Kanda: The Youth",
      audio_url: "/audio/ramayana/bala-kanda.mp3",
      duration: "45:10",
      order_number: 1,
    },
    {
      audiobook_id: audiobookIds[2],
      title: "Ayodhya Kanda: The Exile",
      audio_url: "/audio/ramayana/ayodhya-kanda.mp3",
      duration: "50:25",
      order_number: 2,
    },
  ]

  for (const chapter of audioChapters) {
    await sql`
      INSERT INTO audiobook_chapters (audiobook_id, title, audio_url, duration, order_number, created_at, updated_at)
      VALUES (${chapter.audiobook_id}, ${chapter.title}, ${chapter.audio_url}, ${chapter.duration}, ${chapter.order_number}, NOW(), NOW());
    `
  }
}

async function seedReligiousPlaces() {
  const places = [
    {
      name: "Varanasi",
      description: "One of the oldest continuously inhabited cities in the world and a major religious hub in India.",
      location: "Uttar Pradesh, India",
      latitude: 25.3176,
      longitude: 82.9739,
      type: "City",
      image_url: "/places/varanasi.jpg",
    },
    {
      name: "Kedarnath Temple",
      description: "A Hindu temple dedicated to Lord Shiva, located in the Garhwal Himalayan range.",
      location: "Uttarakhand, India",
      latitude: 30.7352,
      longitude: 79.0669,
      type: "Temple",
      image_url: "/places/kedarnath.jpg",
    },
    {
      name: "Tirupati Balaji",
      description: "The richest temple in the world, dedicated to Lord Venkateswara, a form of Vishnu.",
      location: "Andhra Pradesh, India",
      latitude: 13.6288,
      longitude: 79.4192,
      type: "Temple",
      image_url: "/places/tirupati.jpg",
    },
    {
      name: "Rishikesh",
      description: 'Known as the "Yoga Capital of the World", located in the foothills of the Himalayas.',
      location: "Uttarakhand, India",
      latitude: 30.0869,
      longitude: 78.2676,
      type: "City",
      image_url: "/places/rishikesh.jpg",
    },
    {
      name: "Jagannath Temple",
      description: "A temple dedicated to Lord Jagannath, a form of Vishnu, located on the eastern coast of India.",
      location: "Puri, Odisha, India",
      latitude: 19.805,
      longitude: 85.8179,
      type: "Temple",
      image_url: "/places/jagannath.jpg",
    },
  ]

  for (const place of places) {
    const result = await sql`
      INSERT INTO religious_places (name, description, location, latitude, longitude, type, created_at, updated_at)
      VALUES (${place.name}, ${place.description}, ${place.location}, ${place.latitude}, ${place.longitude}, ${place.type}, NOW(), NOW())
      RETURNING id;
    `

    // Add an image for each place
    await sql`
      INSERT INTO religious_place_images (place_id, image_url, created_at, updated_at)
      VALUES (${result.rows[0].id}, ${place.image_url}, NOW(), NOW());
    `
  }
}

async function seedStories() {
  const stories = [
    {
      title: "The Churning of the Ocean",
      content:
        "The story of how the devas and asuras churned the cosmic ocean to obtain amrita, the nectar of immortality.",
      author: "Traditional",
      category: "Mythology",
      published_date: "2023-01-30",
    },
    {
      title: "Ganesha and the Moon",
      content: "The story of how Lord Ganesha cursed the moon for laughing at him.",
      author: "Traditional",
      category: "Mythology",
      published_date: "2023-02-25",
    },
    {
      title: "The Birth of Krishna",
      content: "The miraculous story of Lord Krishna's birth in a prison cell and his escape to Gokul.",
      author: "Traditional",
      category: "Mythology",
      published_date: "2023-03-20",
    },
    {
      title: "Savitri and Satyavan",
      content: "The story of Savitri who followed Yama, the god of death, to bring her husband back to life.",
      author: "Traditional",
      category: "Mythology",
      published_date: "2023-04-15",
    },
    {
      title: "The Story of Prahlada",
      content:
        "The story of the young devotee Prahlada and his unwavering devotion to Lord Vishnu despite his father's opposition.",
      author: "Traditional",
      category: "Mythology",
      published_date: "2023-05-10",
    },
  ]

  for (const story of stories) {
    await sql`
      INSERT INTO stories (title, content, author, category, published_date, created_at, updated_at)
      VALUES (${story.title}, ${story.content}, ${story.author}, ${story.category}, ${story.published_date}, NOW(), NOW());
    `
  }
}

async function seedDonations() {
  const donations = [
    {
      donor_name: "Rahul Sharma",
      amount: 1001,
      currency: "INR",
      message: "For temple renovation",
      status: "completed",
      donation_date: "2023-01-05",
    },
    {
      donor_name: "Priya Patel",
      amount: 501,
      currency: "INR",
      message: "Monthly contribution",
      status: "completed",
      donation_date: "2023-02-10",
    },
    {
      donor_name: "Amit Singh",
      amount: 2100,
      currency: "INR",
      message: "For Goshala",
      status: "completed",
      donation_date: "2023-03-15",
    },
    {
      donor_name: "Sunita Gupta",
      amount: 1100,
      currency: "INR",
      message: "For Annadanam",
      status: "completed",
      donation_date: "2023-04-20",
    },
    {
      donor_name: "Vikram Reddy",
      amount: 5001,
      currency: "INR",
      message: "For educational programs",
      status: "completed",
      donation_date: "2023-05-25",
    },
  ]

  for (const donation of donations) {
    await sql`
      INSERT INTO donations (donor_name, amount, currency, message, status, donation_date, created_at, updated_at)
      VALUES (${donation.donor_name}, ${donation.amount}, ${donation.currency}, ${donation.message}, ${donation.status}, ${donation.donation_date}, NOW(), NOW());
    `
  }
}

