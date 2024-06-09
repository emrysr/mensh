/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5Kg6hL4o9Xn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { ArrowBigUpIcon, ChevronDown, ChevronRight, ChevronUp } from "lucide-react"

const defaultSearchResults: Result[] = [
  {
    id: 1,
    title: "Hilarious Cat Fails Compilation",
    postedDate: "2 days ago",
    views: 1_234_567,
    comments: 12_345,
    avatar: "/avatars/jaredpalmer-avatar.jpg",
    username: "@jaredpalmer",
    videoUrl: "https://www.youtube.com/embed/94PLgLKcGW8",
  },
  {
    id: 2,
    title: "The Cutest Cat Video You'll Ever See",
    postedDate: "1 week ago",
    views: 987_654,
    comments: 9_876,
    avatar: "/avatars/shadcn-avatar.jpg",
    username: "@shadcn",
    videoUrl: "https://www.youtube.com/embed/SUNmLuNdiL8",
  },
  {
    id: 3,
    title: "Cat Jumps Into Owner's Arms",
    postedDate: "3 days ago",
    views: 456_789,
    comments: 4_567,
    avatar: "/avatars/maxleiter-avatar.jpg",
    username: "@maxleiter",
    videoUrl: "https://www.youtube.com/embed/0br3fZcx60c",
  },
  {
    id: 4,
    title: "Funny Cat Meowing Compilation",
    postedDate: "5 days ago",
    views: 234_567,
    comments: 2_345,
    avatar: "/avatars/shuding-avatar.jpg",
    username: "@shuding_",
    videoUrl: "https://www.youtube.com/embed/VIno5O9nUow",
  },
  {
    id: 5,
    title: "Cat Plays Fetch with Owner",
    postedDate: "1 day ago",
    views: 123_456,
    comments: 1_234,
    avatar: "/avatars/vercel-avatar.jpg",
    username: "@vercel",
    videoUrl: "https://www.youtube.com/embed/EvcCiOp1zvI",
  },
  {
    id: 6,
    title: "Adorable Kitten Climbs a Tree",
    postedDate: "6 hours ago",
    views: 78_901,
    comments: 789,
    avatar: "/avatars/kitten-avatar.jpg",
    username: "@kittenlover",
    videoUrl: "https://www.youtube.com/embed/94PLgLKcGW8",
  },
  {
    id: 7,
    title: "Cats React to Laser Pointers",
    postedDate: "4 days ago",
    views: 345_678,
    comments: 3_456,
    avatar: "/avatars/laser-avatar.jpg",
    username: "@catantics",
    videoUrl: "https://www.youtube.com/embed/SUNmLuNdiL8",
  },
  {
    id: 8,
    title: "Cat Yoga: Paws and Poses",
    postedDate: "2 weeks ago",
    views: 567_890,
    comments: 5_678,
    avatar: "/avatars/yoga-cat-avatar.jpg",
    username: "@zenkitty",
    videoUrl: "https://www.youtube.com/embed/0br3fZcx60c",
  },
  {
    id: 9,
    title: "Sneaky Cat Steals Treats",
    postedDate: "1 hour ago",
    views: 12_345,
    comments: 123,
    avatar: "/avatars/sneaky-avatar.jpg",
    username: "@treatthief",
    videoUrl: "https://www.youtube.com/embed/VIno5O9nUow",
  },
  {
    id: 10,
    title: "Playful Kittens Wrestle",
    postedDate: "3 days ago",
    views: 234_567,
    comments: 2_345,
    avatar: "/avatars/wrestling-kittens-avatar.jpg",
    username: "@kittenmania",
    videoUrl: "https://www.youtube.com/embed/EvcCiOp1zvI",
  },
]
interface Result {
  id: number;
  title: string;
  postedDate: string;
  views: number;
  comments: number;
  avatar: string;
  username: string;
  videoUrl: string;
}
interface Comment {
  id: number;
  username: string;
  avatar: string;
  content: string;
  postedDate: string;
  score: number;
}
const defaultComments:Comment[] = [
  {
    id: 1,
    username: "@jaredpalmer",
    avatar: "/avatars/jaredpalmer-avatar.jpg",
    content: "This is such a funny video!",
    postedDate: "2 days ago",
    score: .72,
  },
  {
    id: 2,
    username: "@shadcn",
    avatar: "/avatars/shadcn-avatar.jpg",
    content: "Aww, the cat is so cute!",
    postedDate: "1 day ago",
    score: .62,
  },
  {
    id: 3,
    username: "@maxleiter",
    avatar: "/avatars/maxleiter-avatar.jpg",
    content: "I can't stop watching this!",
    postedDate: "1 day ago",
    score: .51,
  },
  {
    id: 4,
    username: "@shuding_",
    avatar: "/avatars/shuding-avatar.jpg",
    content: "Haha, the cat's expression is priceless!",
    postedDate: "12 hours ago",
    score: .3,
  },
  {
    id: 5,
    username: "@vercel",
    avatar: "/avatars/vercel-avatar.jpg",
    content: "This is the best cat video I've seen all week!",
    postedDate: "6 hours ago",
    score: .8,
  },
  {
    id: 6,
    username: "@iamwillpursell",
    avatar: "/avatars/iamwillpursell-avatar.jpg",
    content: "I wish I had a cat that playful!",
    postedDate: "3 hours ago",
    score: .1,
  },
  {
    id: 7,
    username: "@HackSoft",
    avatar: "/avatars/hacksoft-avatar.jpg",
    content: "Cats are the best!",
    postedDate: "1 hour ago",
    score: .9,
  },
  {
    id: 8,
    username: "@greed7513",
    avatar: "/avatars/greed7513-avatar.jpg",
    content: "I could watch this all day!",
    postedDate: "30 minutes ago",
    score: .6,
  },
  {
    id: 9,
    username: "@iamwillpursell",
    avatar: "/avatars/iamwillpursell-avatar.jpg",
    content: "Haha, the cat's reaction is priceless!",
    postedDate: "15 minutes ago",
    score: .05,
  },
  {
    id: 10,
    username: "@HackSoft",
    avatar: "/avatars/hacksoft-avatar.jpg",
    content: "This is the cutest thing I've seen all week!",
    postedDate: "5 minutes ago",
    score: .6,
  },
]

interface Video extends Result{ }

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<Video|null>(null)
  const [searchResults, setSearchResults] = useState<Result[]|null|undefined>()
  const [comments, setComments] = useState<Comment[]|null|undefined>()
  const [commentThreshold, setCommentThreshold] = useState(.6)
  const [hideRedactedComments, setHideRedactedComments] = useState(false)
  const [canEditThreshold, setCanEditThreshold] = useState(false)

  const handleSearch = (e:FormEvent) => {
    e.preventDefault()
    const results = defaultSearchResults.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()))
    if (results) {
      setSearchResults(results)
    } else {
      setSearchResults(null)
    }
  }
  const handleInputChange = (e: ChangeEvent) => {
    setSearchQuery((e.target as HTMLInputElement).value)
  }
  const handleVideoSelect = (video:Result) => {
    setSearchResults([])
    setSearchQuery(video.title)
    setSelectedVideo(null) // empty
    setTimeout(() => {
      setSelectedVideo(video);
      setComments(defaultComments);
      }, 600 // set again
    )
  }
  const resetSelection = () => {
    setSelectedVideo(null)
    setSearchResults(defaultSearchResults)
    setSearchQuery('')
  }
  const handleCommentThresholdChange = (value:number) => {
    setCommentThreshold(value)
  }
  const handleHideRedactedComments = () => {
    setHideRedactedComments(!hideRedactedComments)
  }
  const toggleCanEditThreshold = () => {
    setCanEditThreshold(!canEditThreshold)
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <p className="text-6xl gluten-family text-red-600">mensh</p>
          <span className="text-md p-2 pt-3 text-slate-800 font-medium">YouTube</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            YouTube
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            TikTok
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Instagram
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-20 lg:pt-28 container mx-auto">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid gap-4 px-4 md:grid-cols-2 md:gap-16">
              {selectedVideo ? (
                <div>
                  <iframe className="w-full aspect-video rounded-xl" src={selectedVideo.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  <div className="mt-4 video-details">
                    <div className="flex space-between items-start">
                      <h2 className="font-bold text-xl grow">{selectedVideo.title}</h2>
                      <Button variant="ghost" size="sm" onClick={()=>resetSelection()}>
                         &times;
                      </Button>
                    </div>
   
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Avatar>
                        <Image width="48" height="48" src={selectedVideo.avatar} alt={selectedVideo.username} />
                      </Avatar>
                      <span>{selectedVideo.views} views</span>
                      <span>&middot;</span>
                      <span>{selectedVideo.postedDate}</span>
                      <span>&middot;</span>
                      <span>{selectedVideo.comments} comments</span>
                    </div>
        
                  </div>
                </div>
              ) : (
                <div>
                  <Image
                    src="/mensh.png"
                    width="600"
                    height="600"
                    alt="Mensh"
                    className="w-full homepage-hero-image aspect-video overflow-hidden rounded-xl object-cover"
                      priority
                    />
                    <h2 className="font-bold text-xl mt-4 text-center">
                      Protect yourself from harmful content
                    </h2>
                </div>
              )}
              <div className="flex flex-col items-start space-y-4">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Find your Video
                </h1>
                <form className="w-full max-w-lg" onSubmit={(e)=>handleSearch(e)}>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search for a video"
                      className="w-full"
                      value={searchQuery}
                      onChange={(e)=>handleInputChange(e)}
                      onFocus={() => setSearchResults(defaultSearchResults)}
                      onBlur={() => setTimeout(()=>setSearchResults([]), 100)}
                    />
                    
                    <Button type="submit" className="absolute top-1/2 right-0 -translate-y-1/2">
                      <SearchIcon className="h-5 w-5" />
                    </Button>

                    {searchResults && searchResults.length > 0 && (
                      <div className="search-results absolute top-full left-0 w-full bg-slate-50 dark:bg-gray-800 rounded-lg shadow-lg mt-2 z-10 max-h-[300px] overflow-y-auto">
                        <ul className="py-2">
                          {searchResults.map((result) => (
                            <li
                              key={result.id}
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                              onClick={() => handleVideoSelect(result)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar>
                                    <Image src={result.avatar} width="48" height="48" alt="" />
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium">{result.title}</h3>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      <span>{result.views} views</span> &middot; <span>{result.postedDate}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </form>

                {searchResults && searchResults.length || selectedVideo ?  (<p></p>) : (
                  <blockquote className="w-full bg-gray-200 rounded-xl p-9 pt-7 text-center  drop-shadow-lg hover:drop-shadow-xl pb-5">
                    <p className="text-3xl font-serif text-center text-red-600 gluten-family mb-3">
                      Simplify engagement
                    </p>
                    {/* <marquee className="mb-5 text-sm text-red-900" behaviour="alternate">
                      “Say goodbye to time-wasting comments and join your community!” 😊
                    </marquee> */}
                    <p className="mb-5 text-sm text-red-900" >
                      “Say goodbye to time-wasting comments and join your community!” 😊
                    </p>
                    <Button variant="destructive" onClick={()=>(document.querySelector('input[type="text"]') as HTMLInputElement)?.focus()}>
                      Get started
                      <ArrowBigUpIcon />
                    </Button>
                  </blockquote>
                ) 
                }
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 mt-10 pb-10" style={{minHeight:'50vh'}}>
          {selectedVideo ? (
            <div className="mt-4 video-details w-full pt-6 container mx-auto ">
              <div className="mt-3">
                <details className="w-1/2 comments-title open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-2 rounded-lg">
                  <summary title={(comments?.filter((comment) => (comment.score < commentThreshold)).length) + ' comments blocked'}
                    className="hover:bg-white text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none flex items-center mb-3">
                    <Badge size="xsmall">
                        {
                          comments?.filter((comment) => (comment.score < commentThreshold)).length
                        }
                    </Badge>
                    <h3 className="w-full font-bold text-lg pl-5 cursor-pointer flex justify-between">
                      <span>
                        Latest Comments ({hideRedactedComments ? (comments?.filter(comment => comment.score >= commentThreshold))?.length : comments?.length})
                      </span>
                      <span className="text-gray-400">
                      <ChevronDown className="icon" id="closed" />
                      <ChevronUp className="icon" id="open" />
                      </span>
                    </h3>
                  </summary>
                  
                  <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {(
                      <div className="flex flex-col gap-4 px-10">
                        <h3 className="font-medium text-md">
                          YouTube Mensh Options:
                        </h3>
                        <div title={!canEditThreshold ? "Disabled": ""} className={'flex items-center gap-4' + (!canEditThreshold ? ' text-gray-500 bg-gray-100': '')}>
                          <Label htmlFor="commentThreshold" onDoubleClick={() => toggleCanEditThreshold()}>
                            Comment Threshold 
                          </Label>
                          <Slider
                            min={0}
                            max={1}
                            step={.1}
                            value={[commentThreshold]}
                            onValueChange={(e)=>handleCommentThresholdChange([...e][0])}
                            className="flex-1"
                            id="commentThreshold"
                            disabled={!canEditThreshold}
                          />
                        </div>
                        <div>
                          <Label htmlFor="hideRedactedComments" className="flex items-center gap-4">
                            <Checkbox
                              id="hideRedactedComments"
                              checked={hideRedactedComments}
                              onCheckedChange={handleHideRedactedComments}
                            />
                            Hide comments that have been redacted </Label> 
                        </div>
                      </div>
                    )}
                  </div>
                </details>
                
                <div className="grid gap-4">
                  {comments?.filter((comment) => (hideRedactedComments ? comment.score >= commentThreshold : true))
                    .map((comment) => {
                      var commentClasses = ['mt-1'];
                      if (comment.score < commentThreshold) {
                        commentClasses.push('is-redacted')
                      }
                      return <div key={comment.id} className="flex items-start gap-4 hover:drop-shadow hover:bg-white" title={''+comment.score}>
                          <Avatar>
                            <Image width="48" height="48" src={comment.avatar} alt={comment.username} />
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-medium">{comment.username}</span>
                              <span>{comment.postedDate}
                              </span>
                            </div>
                            <p className={commentClasses.join(' ')}>
                              {comment.content}
                            </p>
                          </div>
                        </div>
                    })
                  }
                </div>
                <p>
                  {comments?.filter((comment) => (comment.score >= commentThreshold)).length === 0 && hideRedactedComments ? 'No Comments Available': ''}
                </p>
              </div>
            </div>
          ) : (
            <p></p>  
          )
          }
        </section>
      </main>
    </div>
  )
}

function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
