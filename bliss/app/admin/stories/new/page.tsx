"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentBlock } from "@/components/admin/stories/content-block"

type Block = {
  id: string
  type: "heading1" | "heading2" | "heading3" | "paragraph" | "image" | "list" | "quote"
  content: string
  align?: "left" | "center" | "right"
}

export default function NewStory() {
  const [title, setTitle] = useState("")
  const [blocks, setBlocks] = useState<Block[]>([{ id: "1", type: "paragraph", content: "", align: "left" }])

  const titleRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto"
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
      titleRef.current.focus()
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
        <div className="flex items-center gap-2">
          <Link href="/admin/stories" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold">New Story</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-amber-600 hover:bg-amber-700">Publish</Button>
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <textarea
          ref={titleRef}
          value={title}
          onChange={handleTitleChange}
          className="w-full text-3xl md:text-4xl font-bold border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent"
          placeholder="Untitled Story"
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
    </div>
  )
}

