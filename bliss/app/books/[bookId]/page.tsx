"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Menu, Bookmark, BookmarkCheck, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function BookPage({ params }: { params: { bookId: string } }) {
  const { toast } = useToast()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const chapterId = searchParams.get("chapterId") || "1"

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Check if the current chapter is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    setIsBookmarked(
      bookmarks.some((bookmark: any) => bookmark.bookId === params.bookId && bookmark.chapterId === chapterId),
    )
  }, [params.bookId, chapterId])

  // Toggle bookmark
  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    const bookmarkKey = { bookId: params.bookId, chapterId }

    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter(
        (bookmark: any) => !(bookmark.bookId === params.bookId && bookmark.chapterId === chapterId),
      )
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
      setIsBookmarked(false)
      toast({
        title: "Bookmark removed",
        description: "This chapter has been removed from your bookmarks",
      })
    } else {
      // Add bookmark
      bookmarks.push({
        ...bookmarkKey,
        title: currentChapter?.title || "Chapter 1",
        bookTitle: book.title,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
      setIsBookmarked(true)
      toast({
        title: "Bookmark added",
        description: "This chapter has been added to your bookmarks",
      })
    }
  }

  // This would be fetched from the database in a real application
  const book = {
    id: params.bookId,
    title: "The Bhagavad Gita: A New Translation",
    author: "Sadguru Riteshwarji Maharaj",
    cover: "/placeholder.svg?height=300&width=200",
    sections: [
      {
        id: 1,
        title: "Introduction",
        chapters: [
          { id: 1, title: "Preface" },
          { id: 2, title: "About This Translation" },
          { id: 3, title: "Historical Context" },
        ],
      },
      {
        id: 2,
        title: "Section I: Arjuna's Dilemma",
        chapters: [
          { id: 4, title: "Chapter 1: The Battlefield of Kurukshetra" },
          { id: 5, title: "Chapter 2: The Yoga of Knowledge" },
        ],
      },
      {
        id: 3,
        title: "Section II: The Path of Action",
        chapters: [
          { id: 6, title: "Chapter 3: Karma Yoga" },
          { id: 7, title: "Chapter 4: The Path of Knowledge and Action" },
          { id: 8, title: "Chapter 5: The Path of Renunciation" },
        ],
      },
    ],
  }

  // Chapter content mapping
  const chapterContent = {
    "1": (
      <>
        <p>
          This translation of the Bhagavad Gita aims to present this timeless spiritual text in clear, contemporary
          language while preserving its profound philosophical depth. The translation is based on careful study of the
          original Sanskrit text and consultation with traditional commentaries.
        </p>
        <p>
          The Bhagavad Gita, or "Song of God," is a 700-verse Hindu scripture that is part of the Indian epic
          Mahabharata. It is a dialogue between Prince Arjuna and his guide and charioteer Lord Krishna. The Gita is set
          in a narrative framework of a dialogue between Arjuna and Krishna on the battlefield of Kurukshetra.
        </p>
        <p>
          This translation aims to make the text accessible to modern readers while remaining faithful to the original
          teachings. It includes explanatory notes to clarify cultural and philosophical concepts that might be
          unfamiliar to contemporary readers.
        </p>
      </>
    ),
    "2": (
      <>
        <p>
          This translation differs from others in several important ways. First, it prioritizes clarity and
          accessibility without sacrificing depth. Technical Sanskrit terms are translated into English equivalents
          where possible, with the original Sanskrit provided in parentheses for reference.
        </p>
        <p>
          Second, this translation avoids imposing sectarian interpretations on the text. The Bhagavad Gita has been
          interpreted differently by various Hindu philosophical schools, and this translation attempts to present the
          text in a way that respects these diverse traditions.
        </p>
        <p>
          Third, this translation pays special attention to the poetic qualities of the original. The Bhagavad Gita is
          not only a philosophical text but also a work of great literary beauty. This translation attempts to convey
          some of that beauty through careful attention to rhythm and imagery.
        </p>
        <p>
          Finally, this translation includes brief introductions to each chapter that provide context and highlight key
          themes, making it easier for readers to follow the development of the dialogue between Krishna and Arjuna.
        </p>
      </>
    ),
    "3": (
      <>
        <p>
          The Bhagavad Gita takes place on the battlefield of Kurukshetra, where two related families, the Pandavas and
          the Kauravas, are about to engage in a fratricidal war for the throne of Hastinapura. The Pandavas, led by the
          virtuous Yudhishthira, have been deprived of their rightful share of the kingdom through the deceit of their
          cousins, the Kauravas, led by the ambitious Duryodhana.
        </p>
        <p>
          After failed attempts at peaceful resolution, both sides have assembled their armies on the battlefield.
          Arjuna, the third of the five Pandava brothers and their greatest warrior, asks his charioteer Krishna to
          drive his chariot between the two armies so that he can see who he will be fighting against.
        </p>
        <p>
          When Arjuna sees his relatives, teachers, and friends on the opposing side, he is overcome with grief and
          doubt. He questions the morality of the war and expresses his reluctance to fight. This crisis of conscience
          sets the stage for the dialogue between Arjuna and Krishna that constitutes the Bhagavad Gita.
        </p>
        <p>
          Krishna, who is revealed to be an incarnation of the divine, uses this opportunity to expound on various
          philosophical and theological issues. The dialogue covers topics such as the nature of the self, the path of
          action (karma yoga), the path of knowledge (jnana yoga), and the path of devotion (bhakti yoga).
        </p>
      </>
    ),
    "4": (
      <>
        <p>
          Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field
          of Kurukshetra, eager for battle?
        </p>
        <p>
          Sanjaya said: Having seen the army of the Pandavas arrayed for battle, King Duryodhana approached his teacher
          Drona and spoke these words:
        </p>
        <p>
          "O teacher, behold this mighty army of the sons of Pandu, arranged for battle by your talented pupil, the son
          of Drupada.
        </p>
        <p>
          Here are heroes, mighty archers, equal in battle to Bhima and Arjuna: Yuyudhana, Virata, and the great warrior
          Drupada;
        </p>
        <p>Dhrishtaketu, Chekitana, and the valiant king of Kashi; Purujit, Kuntibhoja, and the great man Shaibya;</p>
        <p>
          The heroic Yudhamanyu, the valiant Uttamaujas, the son of Subhadra, and the sons of Draupadi—all of them great
          warriors.
        </p>
        <p>
          O best of the twice-born, hear also of the distinguished ones on our side. I will mention the leaders of my
          army for your information.
        </p>
        <p>
          Yourself, Bhishma, Karna, and Kripa, who is always victorious in battle; Ashvatthama, Vikarna, and also the
          son of Somadatta;
        </p>
        <p>
          And many other heroes who are ready to give up their lives for my sake, all skilled in warfare and armed with
          various weapons.
        </p>
        <p>Our army, guarded by Bhishma, is unlimited, whereas their army, guarded by Bhima, is limited.</p>
        <p>Therefore, all of you, stationed in your respective positions, protect Bhishma alone."</p>
      </>
    ),
    "5": (
      <>
        <p>
          Sanjaya said: Seeing Arjuna overwhelmed with compassion, his mind distressed, and his eyes filled with tears,
          Madhusudana (Krishna) spoke these words.
        </p>
        <p>
          The Blessed Lord said: Whence has this dejection come to you at this critical time? It is not befitting noble
          souls; it leads neither to heaven nor to fame, O Arjuna.
        </p>
        <p>
          Do not yield to unmanliness, O son of Pritha. It does not become you. Cast off this petty weakness of heart
          and arise, O scorcher of enemies.
        </p>
        <p>
          Arjuna said: How shall I fight with arrows in battle against Bhishma and Drona, who are worthy of worship, O
          slayer of enemies?
        </p>
        <p>
          It is better to live in this world by begging than to slay these noble elders. If I kill them, even in this
          world, all my enjoyments of wealth and desires will be stained with blood.
        </p>
        <p>
          I do not know which would be better: that we should conquer them or that they should conquer us. The sons of
          Dhritarashtra, whom if we killed we should not wish to live, stand before us.
        </p>
        <p>
          With my nature overcome by weak pity, with my mind confused about duty, I ask you: Tell me decisively what is
          better. I am your disciple. Instruct me, who have taken refuge in you.
        </p>
        <p>
          I do not see what will remove this sorrow that dries up my senses, even if I should attain unrivaled and
          prosperous dominion on earth or even lordship over the gods.
        </p>
      </>
    ),
    "6": (
      <>
        <p>
          The Blessed Lord said: You grieve for those who should not be grieved for, yet you speak words of wisdom. The
          wise grieve neither for the living nor for the dead.
        </p>
        <p>
          Never was there a time when I did not exist, nor you, nor all these kings; nor in the future shall any of us
          cease to be.
        </p>
        <p>
          As the embodied soul continuously passes, in this body, from childhood to youth to old age, the soul similarly
          passes into another body at death. A self-realized soul is not bewildered by such a change.
        </p>
        <p>
          The contacts of the senses with the objects, O son of Kunti, which cause heat and cold, pleasure and pain,
          have a beginning and an end; they are impermanent. Endure them bravely, O descendant of Bharata.
        </p>
        <p>
          O best among men, the person who is not disturbed by happiness and distress and is steady in both is certainly
          eligible for liberation.
        </p>
        <p>
          Those who are seers of the truth have concluded that of the nonexistent there is no endurance and of the
          existent there is no cessation. This they have concluded by studying the nature of both.
        </p>
        <p>
          Know that which pervades the entire body is indestructible. No one is able to destroy the imperishable soul.
        </p>
        <p>
          The soul is neither born, nor does it die. It is not that it came into being and will cease to exist. It is
          unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.
        </p>
      </>
    ),
    "7": (
      <>
        <p>
          The Blessed Lord said: When a man completely casts off all desires of the mind and is satisfied in the Self by
          the Self, then he is said to be of steady wisdom.
        </p>
        <p>
          One whose mind is not shaken by adversity, who does not hanker after pleasures, and who is free from
          attachment, fear, and anger, is called a sage of steady wisdom.
        </p>
        <p>
          He who is without attachment, who does not rejoice when he obtains good, nor lament when he obtains evil, is
          firmly fixed in perfect knowledge.
        </p>
        <p>
          When, like the tortoise which withdraws its limbs on all sides, he withdraws his senses from the sense
          objects, then his wisdom becomes steady.
        </p>
        <p>
          The objects of the senses turn away from the abstinent man, leaving the longing behind; but his longing also
          turns away on seeing the Supreme.
        </p>
        <p>
          The turbulent senses, O son of Kunti, forcibly carry away the mind of even a wise man who is striving for
          perfection.
        </p>
        <p>
          Having brought all the senses under control, one should remain steadfast, intent on Me; for one whose senses
          are under control, his wisdom is firmly established.
        </p>
        <p>
          By thinking about sense objects, attachment to them arises; from attachment, desire is born; from desire,
          anger arises.
        </p>
        <p>
          From anger comes delusion; from delusion, confusion of memory; from confusion of memory, loss of intelligence;
          and from loss of intelligence, one perishes.
        </p>
      </>
    ),
    "8": (
      <>
        <p>
          The Blessed Lord said: Your right is to perform your work, but never to the fruits of work. You should never
          be motivated by the results of your actions, nor should there be any attachment in not performing your
          prescribed duties.
        </p>
        <p>
          Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is
          called yoga.
        </p>
        <p>
          O Dhananjaya, rid yourself of all fruitive activities by devotional service, and surrender fully to that
          consciousness. Those who want to enjoy the fruits of their work are misers.
        </p>
        <p>
          A person in the divine consciousness, although engaged in seeing, hearing, touching, smelling, eating, moving
          about, sleeping, and breathing, always knows within himself that he actually does nothing at all. Because
          while speaking, evacuating, receiving, or opening or closing his eyes, he always knows that only the material
          senses are engaged with their objects and that he is aloof from them.
        </p>
        <p>
          One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by
          sinful action, as the lotus leaf is untouched by water.
        </p>
        <p>
          The yogis, abandoning attachment, act with body, mind, intelligence, and even with the senses, only for the
          purpose of purification.
        </p>
        <p>
          The steadily devoted soul attains unadulterated peace because he offers the result of all activities to Me;
          whereas a person who is not in union with the Divine, who is greedy for the fruits of his labor, becomes
          entangled.
        </p>
      </>
    ),
  }

  const currentChapter = book.sections.flatMap((s) => s.chapters).find((c) => c.id === Number.parseInt(chapterId))

  const totalChapters = book.sections.flatMap((s) => s.chapters).length
  const currentChapterNumber = Number.parseInt(chapterId)

  // Generate links for previous and next chapters
  const prevChapterId = currentChapterNumber > 1 ? currentChapterNumber - 1 : null
  const nextChapterId = currentChapterNumber < totalChapters ? currentChapterNumber + 1 : null

  // Table of Contents component
  const TableOfContents = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between md:block">
        <div>
          <h2 className="font-bold text-lg">{book.title}</h2>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {book.sections.map((section) => (
          <div key={section.id}>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    href={`/books/${book.id}?chapterId=${chapter.id}`}
                    className={cn(
                      "block text-sm py-2 px-3 rounded-md hover:bg-gray-100 transition-colors",
                      chapter.id === Number.parseInt(chapterId)
                        ? "bg-amber-50 text-amber-900 font-medium border-l-2 border-amber-500"
                        : "",
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {chapter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Sticky */}
      <aside className="hidden md:block w-72 border-r bg-white overflow-y-auto sticky top-16 h-[calc(100vh-4rem)] shrink-0">
        <div className="p-6">
          <TableOfContents />
        </div>
      </aside>

      {/* Mobile Sidebar - Using a simpler approach */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white overflow-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <TableOfContents />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-20 bg-white border-b h-16 flex items-center px-4 md:px-6">
          <div className="flex items-center gap-4 w-full">
            {/* Simple button for mobile sidebar */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Table of Contents</span>
            </Button>

            <div className="flex-1">
              <h1 className="text-lg font-medium truncate">
                {currentChapter?.title || "Chapter 1: The Battlefield of Kurukshetra"}
              </h1>
            </div>

            <Button variant="outline" size="sm" className="gap-1" onClick={toggleBookmark}>
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-amber-600" />
                  <span className="hidden sm:inline">Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Bookmark</span>
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Book Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-3xl mx-auto w-full">
          <div className="prose max-w-none">
            <h2>{currentChapter?.title || "Chapter 1: The Battlefield of Kurukshetra"}</h2>

            {/* Dynamic chapter content based on chapterId */}
            {chapterContent[chapterId] || (
              <p className="text-muted-foreground italic">Content for this chapter is not available yet.</p>
            )}
          </div>

          {/* Add extra padding at the bottom to prevent content from being hidden by mobile navigation */}
          <div className="h-24 md:h-16"></div>
        </main>

        {/* Bottom Navigation - Positioned above mobile nav */}
        <footer className="sticky bottom-0 z-10 bg-white border-t h-16 flex items-center px-4 md:px-6 mb-16 md:mb-0">
          <div className="flex items-center justify-between w-full">
            {prevChapterId ? (
              <Link href={`/books/${book.id}?chapterId=${prevChapterId}`} passHref>
                <Button variant="outline" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden xs:inline">Previous</span>
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="gap-1" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden xs:inline">Previous</span>
              </Button>
            )}

            <div className="text-sm text-center">
              <span className="text-muted-foreground">
                {currentChapterNumber} / {totalChapters}
              </span>
            </div>

            {nextChapterId ? (
              <Link href={`/books/${book.id}?chapterId=${nextChapterId}`} passHref>
                <Button variant="outline" size="sm" className="gap-1">
                  <span className="hidden xs:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="gap-1" disabled>
                <span className="hidden xs:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}

