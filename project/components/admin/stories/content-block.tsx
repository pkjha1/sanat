"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AlignLeft, AlignCenter, AlignRight, Plus, Trash2, GripVertical, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Block = {
  id: string
  type: "heading1" | "heading2" | "heading3" | "paragraph" | "image" | "list" | "quote"
  content: string
  align?: "left" | "center" | "right"
}

type ContentBlockProps = {
  block: Block
  updateContent: (content: string) => void
  addBlockAfter: () => void
  deleteBlock: () => void
  changeBlockType: (type: Block["type"]) => void
  changeBlockAlign: (align: "left" | "center" | "right") => void
  isFirst: boolean
  isLast: boolean
}

export function ContentBlock({
  block,
  updateContent,
  addBlockAfter,
  deleteBlock,
  changeBlockType,
  changeBlockAlign,
  isFirst,
  isLast,
}: ContentBlockProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement | HTMLImageElement>(null)

  useEffect(() => {
    if (contentRef.current && "scrollHeight" in contentRef.current) {
      contentRef.current.style.height = "auto"
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
    }
  }, [contentRef.current])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter creates a new block
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addBlockAfter()
    }

    // Backspace at the beginning of an empty block deletes it
    if (e.key === "Backspace" && block.content === "" && !isFirst) {
      e.preventDefault()
      deleteBlock()
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(e.target.value)
  }

  const renderBlockContent = () => {
    switch (block.type) {
      case "heading1":
        return (
          <textarea
            ref={contentRef as React.RefObject<HTMLTextAreaElement>}
            value={block.content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent"
            placeholder="Heading 1"
            rows={1}
            style={{ textAlign: block.align || "left" }}
          />
        )
      case "heading2":
        return (
          <textarea
            ref={contentRef as React.RefObject<HTMLTextAreaElement>}
            value={block.content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent"
            placeholder="Heading 2"
            rows={1}
            style={{ textAlign: block.align || "left" }}
          />
        )
      case "heading3":
        return (
          <textarea
            ref={contentRef as React.RefObject<HTMLTextAreaElement>}
            value={block.content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full text-xl font-bold border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent"
            placeholder="Heading 3"
            rows={1}
            style={{ textAlign: block.align || "left" }}
          />
        )
      case "image":
        return (
          <div className="relative my-2" style={{ textAlign: block.align || "left" }}>
            <img
              ref={contentRef as React.RefObject<HTMLImageElement>}
              src={block.content || "/placeholder.svg?height=300&width=500"}
              alt="Content image"
              className="max-w-full rounded-md border border-gray-200"
              onClick={() => setIsFocused(true)}
            />
            {(isHovered || isFocused) && (
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-sm"
              >
                Change Image
              </Button>
            )}
          </div>
        )
      case "list":
        return (
          <textarea
            ref={contentRef as React.RefObject<HTMLTextAreaElement>}
            value={block.content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent"
            placeholder="List item"
            rows={1}
            style={{ textAlign: block.align || "left" }}
          />
        )
      case "quote":
        return (
          <textarea
            ref={contentRef as React.RefObject<HTMLTextAreaElement>}
            value={block.content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full border-l-4 border-gray-300 pl-4 italic text-gray-700 focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent py-1"
            placeholder="Quote"
            rows={1}
            style={{ textAlign: block.align || "left" }}
          />
        )
      default:
        return (
          <textarea
            ref={contentRef as React.RefObject<HTMLTextAreaElement>}
            value={block.content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-transparent"
            placeholder="Type something..."
            rows={1}
            style={{ textAlign: block.align || "left" }}
          />
        )
    }
  }

  return (
    <div
      className={`group relative flex gap-2 p-2 rounded-md ${isHovered || isFocused ? "bg-gray-50" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-8 flex-shrink-0 flex items-start pt-1 ${isHovered || isFocused ? "opacity-100" : "opacity-0"} transition-opacity`}
      >
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
          <GripVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 min-w-0">{renderBlockContent()}</div>

      {(isHovered || isFocused) && (
        <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            onClick={addBlockAfter}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {(isHovered || isFocused) && block.type !== "image" && (
        <div className="absolute right-2 top-1 flex items-center gap-1 bg-white border rounded-md shadow-sm p-1 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
                <Type className="h-3 w-3" />
                {block.type === "heading1" && "H1"}
                {block.type === "heading2" && "H2"}
                {block.type === "heading3" && "H3"}
                {block.type === "paragraph" && "Text"}
                {block.type === "list" && "List"}
                {block.type === "quote" && "Quote"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeBlockType("paragraph")}>Text</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeBlockType("heading1")}>Heading 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeBlockType("heading2")}>Heading 2</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeBlockType("heading3")}>Heading 3</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeBlockType("list")}>List</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeBlockType("quote")}>Quote</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeBlockType("image")}>Image</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-4 w-px bg-gray-200" />

          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => changeBlockAlign("left")}>
            <AlignLeft
              className={`h-3 w-3 ${block.align === "left" || !block.align ? "text-amber-600" : "text-gray-500"}`}
            />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => changeBlockAlign("center")}>
            <AlignCenter className={`h-3 w-3 ${block.align === "center" ? "text-amber-600" : "text-gray-500"}`} />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => changeBlockAlign("right")}>
            <AlignRight className={`h-3 w-3 ${block.align === "right" ? "text-amber-600" : "text-gray-500"}`} />
          </Button>

          <div className="h-4 w-px bg-gray-200" />

          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={deleteBlock}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

