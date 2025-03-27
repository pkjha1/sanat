"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Star, Clock, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ContentBlock } from "@/components/admin/stories/content-block"

type Block = {
  id: string
  type: "heading1" | "heading2" | "heading3" | "paragraph" | "image" | "list" | "quote"
  content: string
  align?: "left" | "center" | "right"
}

export default function StoryEditor({ params }: { params: { storyId: string } }) {
  // This would be fetched from your database
  const [title, setTitle] = useState("The Dragon's Quest")
  const [isFavorite, setIsFavorite] = useState(false)
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "heading1", content: "The Dragon's Quest", align: "left" },
    {
      id: "2",
      type: "paragraph",
      content:
        "Once upon a time, in a land far away, there lived a mighty dragon named Ember. Unlike the fearsome dragons of legend, Ember was curious and kind-hearted.",
      align: "left",
    },
    {
      id: "3",
      type: "paragraph",
      content: "The villagers feared him nonetheless, for his ancestors had terrorized the kingdom for generations.",
      align: "left",
    },
    { id: "4", type: "heading2", content: "The Beginning of the Journey", align: "left" },
    {
      id: "5",
      type: "paragraph",
      content: "Ember decided to embark on a quest to prove his good intentions to the people of the realm.",
      align: "left",
    },
    { id: "6", type: "image", content: "/placeholder.svg?height=400&width=600", align: "center" },
    {
      id: "7",
      type: "paragraph",
      content: "His journey would take him through treacherous mountains, enchanted forests, and ancient ruins.",
      align: "left",
    },
  ])

  const titleRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto"
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
    }
  }, [])

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const addBlockAfter = (id: string, type: Block["type"] = "paragraph") => {
    const index = blocks.findIndex((block) => block.id === id)
    if (index === -1) return

    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: "",
      align: "left",
    }

    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, newBlock)
    setBlocks(newBlocks)
  }

  const deleteBlock = (id: string) => {
    // Don't delete if it's the only block
    if (blocks.length <= 1) return

    setBlocks(blocks.filter((block) => block.id !== id))
  }

  const changeBlockType = (id: string, newType: Block["type"]) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, type: newType } : block)))
  }

  const changeBlockAlign = (id: string, align: "left" | "center" | "right") => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, align } : block)))
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Fantasy Stories</span>
          <span>/</span>
          <span className="font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs md:max-w-md">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Last edited 2 hours ago
          </div>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsFavorite(!isFavorite)}>
            <Star className={`h-5 w-5 ${isFavorite ? "fill-amber-500 text-amber-500" : "text-gray-400"}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Print</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-amber-600 hover:bg-amber-700">Publish</Button>
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <textarea
          ref={titleRef}
          value={title}
          onChange={handleTitleChange}
          className="w-full text-3xl md:text-4xl font-bold border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent"
          placeholder="Untitled"
          rows={1}
        />
      </div>

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <ContentBlock
            key={block.id}
            block={block}
            updateContent={(content) => updateBlock(block.id, content)}
            addBlockAfter={() => addBlockAfter(block.id)}
            deleteBlock={() => deleteBlock(block.id)}
            changeBlockType={(type) => changeBlockType(block.id, type)}
            changeBlockAlign={(align) => changeBlockAlign(block.id, align)}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Block
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => addBlockAfter(blocks[blocks.length - 1].id, "paragraph")}>
              Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlockAfter(blocks[blocks.length - 1].id, "heading1")}>
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlockAfter(blocks[blocks.length - 1].id, "heading2")}>
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlockAfter(blocks[blocks.length - 1].id, "heading3")}>
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlockAfter(blocks[blocks.length - 1].id, "image")}>
              Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlockAfter(blocks[blocks.length - 1].id, "list")}>
              List
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlockAfter(blocks[blocks.length - 1].id, "quote")}>
              Quote
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

