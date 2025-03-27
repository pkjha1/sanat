-- Clear existing data
TRUNCATE TABLE books CASCADE;
TRUNCATE TABLE book_chapters CASCADE;
TRUNCATE TABLE teachings CASCADE;
TRUNCATE TABLE audiobooks CASCADE;
TRUNCATE TABLE audiobook_chapters CASCADE;
TRUNCATE TABLE religious_places CASCADE;
TRUNCATE TABLE religious_place_images CASCADE;
TRUNCATE TABLE stories CASCADE;
TRUNCATE TABLE donations CASCADE;

-- Seed books
INSERT INTO books (id, title, author, description, cover_image, published_date, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Bhagavad Gita: The Song of God', 'Vyasa', 'A 700-verse Hindu scripture that is part of the epic Mahabharata, containing a conversation between Pandava prince Arjuna and his guide Lord Krishna.', '/books/bhagavad-gita.jpg', '2023-01-15', NOW(), NOW()),
  (gen_random_uuid(), 'Upanishads: Ancient Wisdom', 'Various Sages', 'A collection of texts that contain some of the central philosophical concepts and ideas of Hinduism.', '/books/upanishads.jpg', '2023-02-20', NOW(), NOW()),
  (gen_random_uuid(), 'Yoga Sutras of Patanjali', 'Patanjali', 'A collection of 196 Indian sutras on the theory and practice of yoga.', '/books/yoga-sutras.jpg', '2023-03-10', NOW(), NOW()),
  (gen_random_uuid(), 'The Ramayana', 'Valmiki', 'One of the two major Sanskrit epics of ancient India, telling the story of Rama and Sita.', '/books/ramayana.jpg', '2023-04-05', NOW(), NOW()),
  (gen_random_uuid(), 'The Mahabharata', 'Vyasa', 'One of the two major Sanskrit epics of ancient India, containing the Bhagavad Gita and many spiritual teachings.', '/books/mahabharata.jpg', '2023-05-12', NOW(), NOW());

-- Get book IDs for reference
DO $$
DECLARE
  bhagavad_gita_id UUID;
  upanishads_id UUID;
  yoga_sutras_id UUID;
  ramayana_id UUID;
  mahabharata_id UUID;
BEGIN
  SELECT id INTO bhagavad_gita_id FROM books WHERE title = 'Bhagavad Gita: The Song of God' LIMIT 1;
  SELECT id INTO upanishads_id FROM books WHERE title = 'Upanishads: Ancient Wisdom' LIMIT 1;
  SELECT id INTO yoga_sutras_id FROM books WHERE title = 'Yoga Sutras of Patanjali' LIMIT 1;
  SELECT id INTO ramayana_id FROM books WHERE title = 'The Ramayana' LIMIT 1;
  SELECT id INTO mahabharata_id FROM books WHERE title = 'The Mahabharata' LIMIT 1;

  -- Seed book chapters
  -- Bhagavad Gita chapters
  INSERT INTO book_chapters (id, book_id, title, content, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), bhagavad_gita_id, 'Arjuna''s Dilemma', 'Arjuna, seeing his relatives on the opposing army side, is filled with compassion and despair. He drops his bow and arrow and decides not to fight.', 1, NOW(), NOW()),
    (gen_random_uuid(), bhagavad_gita_id, 'Transcendental Knowledge', 'Krishna explains the difference between the body and the soul. He explains that the soul is eternal and imperishable.', 2, NOW(), NOW()),
    (gen_random_uuid(), bhagavad_gita_id, 'Karma Yoga', 'Krishna explains the importance of doing one''s duty without attachment to the results.', 3, NOW(), NOW());

  -- Upanishads chapters
  INSERT INTO book_chapters (id, book_id, title, content, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), upanishads_id, 'Isha Upanishad', 'This Upanishad deals with the union of God, soul, and nature. It teaches that God is the ruler of souls and nature.', 1, NOW(), NOW()),
    (gen_random_uuid(), upanishads_id, 'Kena Upanishad', 'This Upanishad explains how the worship of specific deities is just the worship of the one Brahman.', 2, NOW(), NOW());

  -- Yoga Sutras chapters
  INSERT INTO book_chapters (id, book_id, title, content, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), yoga_sutras_id, 'Samadhi Pada', 'This chapter contains the famous definition of yoga as "the stilling of the changing states of the mind".', 1, NOW(), NOW()),
    (gen_random_uuid(), yoga_sutras_id, 'Sadhana Pada', 'This chapter outlines the eight limbs of yoga practice.', 2, NOW(), NOW());

  -- Ramayana chapters
  INSERT INTO book_chapters (id, book_id, title, content, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), ramayana_id, 'Bala Kanda', 'The origins and childhood of Rama.', 1, NOW(), NOW()),
    (gen_random_uuid(), ramayana_id, 'Ayodhya Kanda', 'The preparations for Rama''s coronation and his exile into the forest.', 2, NOW(), NOW());

  -- Mahabharata chapters
  INSERT INTO book_chapters (id, book_id, title, content, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), mahabharata_id, 'Adi Parva', 'The origins of the Kuru dynasty.', 1, NOW(), NOW()),
    (gen_random_uuid(), mahabharata_id, 'Sabha Parva', 'The game of dice and the humiliation of the Pandavas.', 2, NOW(), NOW());
END $$;

-- Seed teachings
INSERT INTO teachings (id, title, author, content, category, published_date, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'The Four Aims of Life', 'Swami Vivekananda', 'In Hindu philosophy, there are four aims of human life: Dharma (righteousness), Artha (prosperity), Kama (pleasure), and Moksha (liberation).', 'Philosophy', '2023-01-20', NOW(), NOW()),
  (gen_random_uuid(), 'The Three Gunas', 'Sri Aurobindo', 'The three gunas are sattva (goodness, constructive, harmonious), rajas (passion, active, confused), and tamas (darkness, destructive, chaotic).', 'Spirituality', '2023-02-15', NOW(), NOW()),
  (gen_random_uuid(), '  destructive, chaotic).', 'Spirituality', '2023-02-15', NOW(), NOW()),
  (gen_random_uuid(), 'The Path of Bhakti Yoga', 'Ramakrishna Paramahamsa', 'Bhakti Yoga is the path of devotion, the method of attaining God through love and the loving recollection of God.', 'Yoga', '2023-03-05', NOW(), NOW()),
  (gen_random_uuid(), 'Understanding Karma', 'Paramahansa Yogananda', 'Karma is the law of cause and effect. Every action generates a force of energy that returns to us in like kind.', 'Philosophy', '2023-04-10', NOW(), NOW()),
  (gen_random_uuid(), 'The Power of Meditation', 'Sadhguru', 'Meditation is not about concentration or contemplation. It is about creating a certain space where you are not identified with your body and mind.', 'Meditation', '2023-05-25', NOW(), NOW());

-- Seed audiobooks
INSERT INTO audiobooks (id, title, narrator, description, cover_image, duration, published_date, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Bhagavad Gita Audio', 'Krishna Das', 'Audio rendition of the Bhagavad Gita with commentary.', '/audiobooks/bhagavad-gita-audio.jpg', '05:30:00', '2023-01-25', NOW(), NOW()),
  (gen_random_uuid(), 'Upanishads Chanting', 'Pandit Jasraj', 'Traditional chanting of selected Upanishads with translations.', '/audiobooks/upanishads-audio.jpg', '04:45:00', '2023-02-28', NOW(), NOW()),
  (gen_random_uuid(), 'Ramayana Audio Epic', 'Amitabh Bachchan', 'Dramatic narration of the Ramayana epic.', '/audiobooks/ramayana-audio.jpg', '12:20:00', '2023-03-15', NOW(), NOW());

-- Get audiobook IDs for reference
DO $$
DECLARE
  bhagavad_gita_audio_id UUID;
  upanishads_audio_id UUID;
  ramayana_audio_id UUID;
BEGIN
  SELECT id INTO bhagavad_gita_audio_id FROM audiobooks WHERE title = 'Bhagavad Gita Audio' LIMIT 1;
  SELECT id INTO upanishads_audio_id FROM audiobooks WHERE title = 'Upanishads Chanting' LIMIT 1;
  SELECT id INTO ramayana_audio_id FROM audiobooks WHERE title = 'Ramayana Audio Epic' LIMIT 1;

  -- Seed audiobook chapters
  -- Bhagavad Gita Audio chapters
  INSERT INTO audiobook_chapters (id, audiobook_id, title, audio_url, duration, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), bhagavad_gita_audio_id, 'Introduction to Bhagavad Gita', '/audio/bhagavad-gita/intro.mp3', '15:30', 1, NOW(), NOW()),
    (gen_random_uuid(), bhagavad_gita_audio_id, 'Chapter 1: Arjuna''s Dilemma', '/audio/bhagavad-gita/chapter1.mp3', '25:45', 2, NOW(), NOW()),
    (gen_random_uuid(), bhagavad_gita_audio_id, 'Chapter 2: Transcendental Knowledge', '/audio/bhagavad-gita/chapter2.mp3', '30:20', 3, NOW(), NOW());

  -- Upanishads Chanting chapters
  INSERT INTO audiobook_chapters (id, audiobook_id, title, audio_url, duration, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), upanishads_audio_id, 'Isha Upanishad Chanting', '/audio/upanishads/isha.mp3', '18:15', 1, NOW(), NOW()),
    (gen_random_uuid(), upanishads_audio_id, 'Kena Upanishad Chanting', '/audio/upanishads/kena.mp3', '22:40', 2, NOW(), NOW());

  -- Ramayana Audio Epic chapters
  INSERT INTO audiobook_chapters (id, audiobook_id, title, audio_url, duration, order_number, created_at, updated_at)
  VALUES
    (gen_random_uuid(), ramayana_audio_id, 'Bala Kanda: The Youth', '/audio/ramayana/bala-kanda.mp3', '45:10', 1, NOW(), NOW()),
    (gen_random_uuid(), ramayana_audio_id, 'Ayodhya Kanda: The Exile', '/audio/ramayana/ayodhya-kanda.mp3', '50:25', 2, NOW(), NOW());
END $$;

-- Seed religious places
DO $$
DECLARE
  place_id UUID;
BEGIN
  -- Varanasi
  INSERT INTO religious_places (id, name, description, location, latitude, longitude, type, created_at, updated_at)
  VALUES (gen_random_uuid(), 'Varanasi', 'One of the oldest continuously inhabited cities in the world and a major religious hub in India.', 'Uttar Pradesh, India', 25.3176, 82.9739, 'City', NOW(), NOW())
  RETURNING id INTO place_id;
  
  INSERT INTO religious_place_images (id, place_id, image_url, created_at, updated_at)
  VALUES (gen_random_uuid(), place_id, '/places/varanasi.jpg', NOW(), NOW());

  -- Kedarnath Temple
  INSERT INTO religious_places (id, name, description, location, latitude, longitude, type, created_at, updated_at)
  VALUES (gen_random_uuid(), 'Kedarnath Temple', 'A Hindu temple dedicated to Lord Shiva, located in the Garhwal Himalayan range.', 'Uttarakhand, India', 30.7352, 79.0669, 'Temple', NOW(), NOW())
  RETURNING id INTO place_id;
  
  INSERT INTO religious_place_images (id, place_id, image_url, created_at, updated_at)
  VALUES (gen_random_uuid(), place_id, '/places/kedarnath.jpg', NOW(), NOW());

  -- Tirupati Balaji
  INSERT INTO religious_places (id, name, description, location, latitude, longitude, type, created_at, updated_at)
  VALUES (gen_random_uuid(), 'Tirupati Balaji', 'The richest temple in the world, dedicated to Lord Venkateswara, a form of Vishnu.', 'Andhra Pradesh, India', 13.6288, 79.4192, 'Temple', NOW(), NOW())
  RETURNING id INTO place_id;
  
  INSERT INTO religious_place_images (id, place_id, image_url, created_at, updated_at)
  VALUES (gen_random_uuid(), place_id, '/places/tirupati.jpg', NOW(), NOW());

  -- Rishikesh
  INSERT INTO religious_places (id, name, description, location, latitude, longitude, type, created_at, updated_at)
  VALUES (gen_random_uuid(), 'Rishikesh', 'Known as the "Yoga Capital of the World", located in the foothills of the Himalayas.', 'Uttarakhand, India', 30.0869, 78.2676, 'City', NOW(), NOW())
  RETURNING id INTO place_id;
  
  INSERT INTO religious_place_images (id, place_id, image_url, created_at, updated_at)
  VALUES (gen_random_uuid(), place_id, '/places/rishikesh.jpg', NOW(), NOW());

  -- Jagannath Temple
  INSERT INTO religious_places (id, name, description, location, latitude, longitude, type, created_at, updated_at)
  VALUES (gen_random_uuid(), 'Jagannath Temple', 'A temple dedicated to Lord Jagannath, a form of Vishnu, located on the eastern coast of India.', 'Puri, Odisha, India', 19.8050, 85.8179, 'Temple', NOW(), NOW())
  RETURNING id INTO place_id;
  
  INSERT INTO religious_place_images (id, place_id, image_url, created_at, updated_at)
  VALUES (gen_random_uuid(), place_id, '/places/jagannath.jpg', NOW(), NOW());
END $$;

-- Seed stories
INSERT INTO stories (id, title, content, author, category, published_date, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'The Churning of the Ocean', 'The story of how the devas and asuras churned the cosmic ocean to obtain amrita, the nectar of immortality.', 'Traditional', 'Mythology', '2023-01-30', NOW(), NOW()),
  (gen_random_uuid(), 'Ganesha and the Moon', 'The story of how Lord Ganesha cursed the moon for laughing at him.', 'Traditional', 'Mythology', '2023-02-25', NOW(), NOW()),
  (gen_random_uuid(), 'The Birth of Krishna', 'The miraculous story of Lord Krishna''s birth in a prison cell and his escape to Gokul.', 'Traditional', 'Mythology', '2023-03-20', NOW(), NOW()),
  (gen_random_uuid(), 'Savitri and Satyavan', 'The story of Savitri who followed Yama, the god of death, to bring her husband back to life.', 'Traditional', 'Mythology', '2023-04-15', NOW(), NOW()),
  (gen_random_uuid(), 'The Story of Prahlada', 'The story of the young devotee Prahlada and his unwavering devotion to Lord Vishnu despite his father''s opposition.', 'Traditional', 'Mythology', '2023-05-10', NOW(), NOW());

-- Seed donations
INSERT INTO donations (id, donor_name, amount, currency, message, status, donation_date, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Rahul Sharma', 1001, 'INR', 'For temple renovation', 'completed', '2023-01-05', NOW(), NOW()),
  (gen_random_uuid(), 'Priya Patel', 501, 'INR', 'Monthly contribution', 'completed', '2023-02-10', NOW(), NOW()),
  (gen_random_uuid(), 'Amit Singh', 2100, 'INR', 'For Goshala', 'completed', '2023-03-15', NOW(), NOW()),
  (gen_random_uuid(), 'Sunita Gupta', 1100, 'INR', 'For Annadanam', 'completed', '2023-04-20', NOW(), NOW()),
  (gen_random_uuid(), 'Vikram Reddy', 5001, 'INR', 'For educational programs', 'completed', '2023-05-25', NOW(), NOW());

