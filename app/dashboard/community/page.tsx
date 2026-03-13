"use client"

import { useState, useRef } from "react"
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  ImagePlus,
  MapPin,
  Smile,
  TrendingUp,
  CloudRain,
  Sun,
  Thermometer,
  Wind,
  MoreHorizontal,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export interface Comment {
  id: number
  author: string
  initials: string
  content: string
  time: string
}

interface Post {
  id: number
  author: string
  initials: string
  role: string
  location: string
  time: string
  content: string
  tag: string
  tagIcon: React.ElementType
  tagColor: string
  tagBg: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  bookmarked: boolean
  image?: string
  commentList?: Comment[]
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Anuj Baghele",
    initials: "AB",
    role: "Weather Enthusiast",
    location: "Mumbai, Maharashtra",
    time: "2 hours ago",
    content:
      "Just experienced the most intense rainfall in Jakarta this month! The rain gauge recorded 45mm in just one hour. Stay safe everyone and remember to check flood alerts in your area.",
    tag: "Heavy Rain",
    tagIcon: CloudRain,
    tagColor: "text-[#4a6cf7]",
    tagBg: "bg-[#eef0ff]",
    likes: 24,
    comments: 8,
    shares: 3,
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    author: "Liam Patel",
    initials: "LP",
    role: "Climate Researcher",
    location: "Mumbai, India",
    time: "5 hours ago",
    content:
      "Fascinating temperature anomaly recorded today. We saw a 7 degree swing within 3 hours, which is unusual for this time of year. The pressure drop preceded it perfectly - great case study for weather prediction models.",
    tag: "Temperature",
    tagIcon: Thermometer,
    tagColor: "text-[#f59e0b]",
    tagBg: "bg-[#fef9ee]",
    likes: 42,
    comments: 15,
    shares: 12,
    liked: true,
    bookmarked: false,
  },
  {
    id: 3,
    author: "Sofia Reyes",
    initials: "SR",
    role: "Outdoor Adventurer",
    location: "Nagpur, Maharashtra",
    time: "8 hours ago",
    content:
      "Perfect hiking weather today in Tegal! Clear skies, gentle winds at 8km/h, and UV index at a comfortable 3.2. Used EcoHealth to plan the trip and it was spot on with the forecast. Highly recommend checking conditions before heading out!",
    tag: "Clear Sky",
    tagIcon: Sun,
    tagColor: "text-[#10b981]",
    tagBg: "bg-[#eefbf4]",
    likes: 67,
    comments: 21,
    shares: 9,
    liked: false,
    bookmarked: true,
  },
  {
    id: 4,
    author: "Noah Kim",
    initials: "NK",
    role: "Storm Chaser",
    location: "Seoul, South Korea",
    time: "1 day ago",
    content:
      "Wind speeds are picking up significantly on the eastern coast. We measured sustained winds of 35km/h with gusts reaching 52km/h. If you are near the coast, please take precautions and secure any loose outdoor items.",
    tag: "High Wind",
    tagIcon: Wind,
    tagColor: "text-[#ef4444]",
    tagBg: "bg-[#fef2f2]",
    likes: 31,
    comments: 11,
    shares: 18,
    liked: false,
    bookmarked: false,
  },
]

const trendingTopics = [
  { label: "Monsoon Season", count: 342, icon: CloudRain },
  { label: "UV Index Alerts", count: 218, icon: Sun },
  { label: "Wind Patterns", count: 156, icon: Wind },
  { label: "Temperature Records", count: 128, icon: Thermometer },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [postLocation, setPostLocation] = useState("Your Location")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const EMOJIS = ["😀", "😂", "🥰", "😎", "🤔", "🙌", "👍", "🔥", "🌧️", "🌤️", "⛈️", "❄️"]

  const POSTS_PER_PAGE = 2

  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  function toggleCommentSection(postId: number) {
    if (expandedPostId === postId) {
      setExpandedPostId(null)
      setCommentText("")
    } else {
      setExpandedPostId(postId)
      setCommentText("")
    }
  }

  function submitComment(postId: number) {
    if (!commentText.trim()) return
    const newCommentObj: Comment = {
      id: Date.now(),
      author: "You",
      initials: "YO",
      content: commentText,
      time: "Just now",
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments + 1,
              commentList: [...(p.commentList || []), newCommentObj],
            }
          : p
      )
    )
    setCommentText("")
  }

  function handleLike(postId: number) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  function handleBookmark(postId: number) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
      )
    )
  }

  function handleSubmitPost() {
    if (!newPost.trim() && !selectedImage) return
    const post: Post = {
      id: Date.now(),
      author: "You",
      initials: "YO",
      role: "Community Member",
      location: postLocation,
      time: "Just now",
      content: newPost,
      tag: "General",
      tagIcon: TrendingUp,
      tagColor: "text-[#4a6cf7]",
      tagBg: "bg-[#eef0ff]",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      bookmarked: false,
      image: selectedImage ? selectedImage : undefined,
    }
    setPosts((prev) => [post, ...prev])
    setNewPost("")
    setSelectedImage(null)
    setPostLocation("Your Location")
    setShowEmojiPicker(false)
    setCurrentPage(1)
  }

  function handleLocationClick() {
    const loc = window.prompt("Enter your location:", postLocation)
    if (loc) {
      setPostLocation(loc)
    }
  }

  function onEmojiClick(emoji: string) {
    setNewPost((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="flex gap-6 overflow-y-auto scrollbar-none pb-8">
      {/* Main feed */}
      <div className="flex flex-1 flex-col gap-5 min-w-0">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Community</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Share your weather experiences and connect with enthusiasts worldwide.
          </p>
        </div>

        {/* Compose post card */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#4a6cf7] text-xs font-bold text-[#ffffff]">
              AB
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleSubmitPost()
                  }
                }}
                placeholder="Share your weather experience..."
                className="min-h-[80px] w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#4a6cf7] focus:outline-none focus:ring-1 focus:ring-[#4a6cf7]"
              />
              {selectedImage && (
                <div className="relative mt-2 inline-block">
                  <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded-lg object-cover" />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
              {postLocation !== "Your Location" && (
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Posting from: {postLocation}
                </div>
              )}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSelectedImage(URL.createObjectURL(file))
                      }
                      if (e.target) e.target.value = ''
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Add image"
                  >
                    <ImagePlus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleLocationClick}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Add location"
                  >
                    <MapPin className="h-4 w-4" />
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label="Add emoji"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute top-10 left-0 z-10 grid grid-cols-4 gap-1 rounded-xl border border-border bg-card p-2 shadow-lg w-48">
                        {EMOJIS.map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => onEmojiClick(emoji)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim() && !selectedImage}
                  className="flex items-center gap-2 rounded-xl bg-[#4a6cf7] px-5 py-2 text-sm font-medium text-[#ffffff] transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts feed */}
        {currentPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Post header */}
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#4a6cf7] text-xs font-bold text-[#ffffff]">
                  {post.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {post.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {post.location}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {post.time}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Weather tag */}
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${post.tagBg} ${post.tagColor}`}
              >
                <post.tagIcon className="h-3 w-3" />
                {post.tag}
              </span>
            </div>

            {/* Post content */}
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {post.content}
            </p>
            {post.image && (
              <div className="mt-3">
                <img src={post.image} alt="Post attachment" className="max-h-96 w-full rounded-xl object-cover" />
              </div>
            )}

            {/* Post actions */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${post.liked
                      ? "bg-[#fef2f2] text-[#ef4444]"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  aria-label={post.liked ? "Unlike" : "Like"}
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${post.liked ? "fill-[#ef4444]" : ""}`}
                  />
                  {post.likes}
                </button>
                <button
                  type="button"
                  onClick={() => toggleCommentSection(post.id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Comment"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {post.comments}
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Share"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {post.shares}
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleBookmark(post.id)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${post.bookmarked
                    ? "text-[#4a6cf7]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                aria-label={post.bookmarked ? "Remove bookmark" : "Bookmark"}
              >
                <Bookmark
                  className={`h-4 w-4 ${post.bookmarked ? "fill-[#4a6cf7]" : ""}`}
                />
              </button>
            </div>

            {/* Comment Section */}
            {expandedPostId === post.id && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#4a6cf7] text-[10px] font-bold text-[#ffffff]">
                    YO
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitComment(post.id)
                      }}
                      placeholder="Write a comment..."
                      className="flex-1 rounded-xl border border-border bg-secondary px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-[#4a6cf7] focus:outline-none focus:ring-1 focus:ring-[#4a6cf7]"
                    />
                    <button
                      type="button"
                      onClick={() => submitComment(post.id)}
                      disabled={!commentText.trim()}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#4a6cf7] text-[#ffffff] transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                {post.commentList && post.commentList.length > 0 && (
                  <div className="mt-4 flex flex-col gap-3">
                    {post.commentList.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
                          {comment.initials}
                        </div>
                        <div className="flex-1 rounded-xl bg-secondary px-3 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground">{comment.author}</span>
                            <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                          </div>
                          <p className="mt-1 text-xs text-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </article>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-2 flex items-center justify-between pt-4 pb-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50 disabled:pointer-events-none shadow-sm"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50 disabled:pointer-events-none shadow-sm"
              aria-label="Next page"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Right sidebar - trending */}
      <aside className="w-[260px] flex-shrink-0">
        <div className="sticky top-0 flex flex-col gap-5">
          {/* Trending topics */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <TrendingUp className="h-4 w-4 text-[#4a6cf7]" />
              Trending Topics
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {trendingTopics.map((topic, i) => (
                <button
                  key={topic.label}
                  type="button"
                  className="flex items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-secondary"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#eef0ff] text-[#4a6cf7]">
                    <topic.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {topic.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {topic.count} posts
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    #{i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Community stats */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-bold text-foreground">Community Stats</h3>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Members</span>
                <span className="text-xs font-bold text-foreground">12,847</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Posts Today</span>
                <span className="text-xs font-bold text-foreground">384</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Active Now</span>
                <span className="text-xs font-bold text-[#10b981]">1,203</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Countries</span>
                <span className="text-xs font-bold text-foreground">47</span>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="rounded-2xl border border-border bg-[#eef0ff] p-5">
            <h3 className="text-sm font-bold text-[#4a6cf7]">Community Guidelines</h3>
            <ul className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-[#4a6cf7]/80">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4a6cf7]" />
                Share accurate weather observations
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4a6cf7]" />
                Be respectful and helpful to others
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4a6cf7]" />
                Report severe weather for safety
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4a6cf7]" />
                Include your location when posting
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  )
}
