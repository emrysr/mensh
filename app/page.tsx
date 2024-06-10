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
import { SparklesCore } from "@/components/ui/sparkles";

interface Result {
  id: number;
  title: string;
  postedDate: string;
  views: number;
  comments: number;
  avatar: string;
  username: string;
  videoUrl: string;
  likes: number;
  dislikes: number;
}
interface Video extends Result{ }
interface Comment {
  id: number;
  username: string;
  avatar: string;
  content: string;
  postedDate: string;
  likes: number;
  dislikes: number;
}
interface Match {
  word: string; index: number; length: number; score: number;
}

const humanize_value = (input:number|string) => {
  const number = Number(input);
  if (number > 1000) {
    return (number / 1000).toFixed(0) + 'k'
  }
  return number;
}

const defaultSearchResults: Result[] = [
  {
    id: 1,
    title: "Hilarious Cat Fails Compilation",
    postedDate: "2 days ago",
    views: 1234567,
    comments: 12345,
    avatar: "/avatars/jaredpalmer-avatar.jpg",
    username: "@jaredpalmer",
    videoUrl: "https://www.youtube.com/embed/94PLgLKcGW8",
    likes: 6172,
    dislikes: 245,
  },
  {
    id: 2,
    title: "The Cutest Cat Video You'll Ever See",
    postedDate: "1 week ago",
    views: 987654,
    comments: 9876,
    avatar: "/avatars/shadcn-avatar.jpg",
    username: "@shadcn",
    videoUrl: "https://www.youtube.com/embed/SUNmLuNdiL8",
    likes: 4932,
    dislikes: 198,
  },
  {
    id: 3,
    title: "Cat Jumps Into Owner's Arms",
    postedDate: "3 days ago",
    views: 456789,
    comments: 4567,
    avatar: "/avatars/maxleiter-avatar.jpg",
    username: "@maxleiter",
    videoUrl: "https://www.youtube.com/embed/0br3fZcx60c",
    likes: 2283,
    dislikes: 91,
  },
  {
    id: 4,
    title: "Funny Cat Meowing Compilation",
    postedDate: "5 days ago",
    views: 234567,
    comments: 2345,
    avatar: "/avatars/shuding-avatar.jpg",
    username: "@shuding_",
    videoUrl: "https://www.youtube.com/embed/VIno5O9nUow",
    likes: 1172,
    dislikes: 47,
  },
  {
    id: 5,
    title: "Cat Plays Fetch with Owner",
    postedDate: "1 day ago",
    views: 12456,
    comments: 1234,
    avatar: "/avatars/vercel-avatar.jpg",
    username: "@vercel",
    videoUrl: "https://www.youtube.com/embed/EvcCiOp1zvI",
    likes: 62,
    dislikes: 3,
  },
  {
    id: 6,
    title: "Adorable Kitten Climbs a Tree",
    postedDate: "6 hours ago",
    views: 78901,
    comments: 789,
    avatar: "/avatars/kitten-avatar.jpg",
    username: "@kittenlover",
    videoUrl: "https://www.youtube.com/embed/94PLgLKcGW8",
    likes: 39,
    dislikes: 2,
  },
  {
    id: 7,
    title: "Cats React to Laser Pointers",
    postedDate: "4 days ago",
    views: 345678,
    comments: 3456,
    avatar: "/avatars/laser-avatar.jpg",
    username: "@catantics",
    videoUrl: "https://www.youtube.com/embed/SUNmLuNdiL8",
    likes: 172,
    dislikes: 7,
  },
  {
    id: 8,
    title: "Cat Yoga: Paws and Poses",
    postedDate: "2 weeks ago",
    views: 567890,
    comments: 5678,
    avatar: "/avatars/yoga-cat-avatar.jpg",
    username: "@zenkitty",
    videoUrl: "https://www.youtube.com/embed/0br3fZcx60c",
    likes: 283,
    dislikes: 11,
  },
  {
    id: 9,
    title: "Sneaky Cat Steals Treats",
    postedDate: "1 hour ago",
    views: 12345,
    comments: 123,
    avatar: "/avatars/sneaky-avatar.jpg",
    username: "@treatthief",
    videoUrl: "https://www.youtube.com/embed/VIno5O9nUow",
    likes: 6,
    dislikes: 1,
  },
  {
    id: 10,
    title: "Playful Kittens Wrestle",
    postedDate: "3 days ago",
    views: 234567,
    comments: 2345,
    avatar: "/avatars/wrestling-kittens-avatar.jpg",
    username: "@kittenmania",
    videoUrl: "https://www.youtube.com/embed/EvcCiOp1zvI",
    likes: 117,
    dislikes: 5,
  },
]
const comment_tokens = [
  {
    comment_id: 1,
    score: 0.2,
    tokens: [
      { word: "trash", index: 13, length: 5, score: 1 },
      { word: "dumb", index: 72, length: 4, score: 1 },
      { word: "brain-dead", index: 55, length: 10, score: 1 },
    ]
  },
  {
    comment_id: 2,
    score: 0.1,
    tokens: [
      { word: "cesspool", index: 20, length: 8, score: 0.8 },
      { word: "stupidity", index: 42, length: 9, score: 0.9 },
    ]
  },
  {
    comment_id: 3,
    score: 0.3,
    tokens: [
      { word: "watching", index: 7, length: 8, score: 0.7 },
    ]
  },
  {
    comment_id: 4,
    score: 0.15,
    tokens: [
      { word: "priceless", index: 24, length: 9, score: 0.75 },
    ]
  },
  {
    comment_id: 5,
    score: 0.25,
    tokens: [
      { word: "best", index: 12, length: 4, score: 0.9 },
    ]
  },
  {
    comment_id: 6,
    score: 0.05,
    tokens: [
      { word: "playful", index: 18, length: 8, score: 0.6 },
    ]
  },
  {
    comment_id: 7,
    score: 0.35,
    tokens: [
      { word: "best", index: 0, length: 4, score: 0.9 },
    ]
  },
  {
    comment_id: 8,
    score: 0.12,
    tokens: [
      { word: "watch", index: 10, length: 5, score: 0.8 },
    ]
  },
  {
    comment_id: 9,
    score: 0.02,
    tokens: [
      { word: "priceless", index: 6, length: 9, score: 0.75 },
    ]
  },
  {
    comment_id: 10,
    score: 0.22,
    tokens: [
      { word: "cutest", index: 8, length: 6, score: 0.85 },
    ]
  },
];

const defaultComments:Comment[] = [
  {
    id: 1,
    username: "@jaredpalmer",
    avatar: "/avatars/jaredpalmer-avatar.jpg",
    content: "This video is trash. The creator must be brain-dead to make something so dumb. Unsubscribed.",
    postedDate: "2 days ago",
    likes: 12, 
    dislikes: 33, 
  },
  {
    id: 2,
    username: "@shadcn",
    avatar: "/avatars/shadcn-avatar.jpg",
    content: "Honestly, this channel is a cesspool of stupidity. I regret wasting my time here.",
    postedDate: "1 day ago",
    likes: 8, 
    dislikes: 2, 
  },
  {
    id: 3,
    username: "@maxleiter",
    avatar: "/avatars/maxleiter-avatar.jpg",
    content: "I can't stop watching this!",
    postedDate: "1 day ago",
    likes: 6, 
    dislikes: 1, 
  },
  {
    id: 4,
    username: "@shuding_",
    avatar: "/avatars/shuding-avatar.jpg",
    content: "Haha, the cat's expression is priceless!",
    postedDate: "12 hours ago",
    likes: 4, 
    dislikes: 0, 
  },
  {
    id: 5,
    username: "@vercel",
    avatar: "/avatars/vercel-avatar.jpg",
    content: "This is the best cat video I've seen all week!",
    postedDate: "6 hours ago",
    likes: 10, 
    dislikes: 1, 
  },
  {
    id: 6,
    username: "@iamwillpursell",
    avatar: "/avatars/iamwillpursell-avatar.jpg",
    content: "I wish I had a cat that playful!",
    postedDate: "3 hours ago",
    likes: 2, 
    dislikes: 0, 
  },
  {
    id: 7,
    username: "@HackSoft",
    avatar: "/avatars/hacksoft-avatar.jpg",
    content: "Cats are the best!",
    postedDate: "1 hour ago",
    likes: 15, 
    dislikes: 2, 
  },
  {
    id: 8,
    username: "@greed7513",
    avatar: "/avatars/greed7513-avatar.jpg",
    content: "I could watch this all day!",
    postedDate: "30 minutes ago",
    likes: 8, 
    dislikes: 1, 
  },
  {
    id: 9,
    username: "@iamwillpursell",
    avatar: "/avatars/iamwillpursell-avatar.jpg",
    content: "Haha, the cat's reaction is priceless!",
    postedDate: "15 minutes ago",
    likes: 1, 
    dislikes: 0, 
  },
  {
    id: 10,
    username: "@HackSoft",
    avatar: "/avatars/hacksoft-avatar.jpg",
    content: "This is the cutest thing I've seen all week!",
    postedDate: "5 minutes ago",
    likes: 9, 
    dislikes: 1, 
  },
]

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

  const humanize = (input: number | string) => humanize_value(input)
  
  const getCommentToken = (comment_id: number) => comment_tokens.find(i => i.comment_id === comment_id);
  const getScore = (comment_id: number) => getCommentToken(comment_id)?.score || 0;
  const getTokens = (comment_id: number) => getCommentToken(comment_id)?.tokens || [];
  const isAccepted = (comment_id: number) => getScore(comment_id) >= commentThreshold;

  const highlightMatches = (comment: string, matches: Match[]) => {
    let highlighted_comment = comment;
    matches.forEach(match => {
      if (!match) return;
      const { word, index, length, score } = match;
      const startTag = `<mark data-score="${score}">`;
      const endTag = `</mark>`;
      const replacement = `${startTag}${word}${endTag}`;
      highlighted_comment = replaceAtIndex(highlighted_comment, word, replacement, index, length);
    });
    return highlighted_comment;
  }
  function replaceAtIndex(inputString:string, targetString:string, replacement:string, startIndex:number, targetLength:number) {
    const regex = new RegExp(targetString, 'gi'); // Match globally
    let match;
    let replacedString = inputString;
    
    while ((match = regex.exec(inputString)) !== null) {
        if (match.index >= startIndex) {
            // Check if the match is a whole word
            const isWholeWord = new RegExp(`(?<=\\W)\\b${targetString}\\b`).test(match[0]);
            const append = isWholeWord ? '&nbsp;' : ''; // Add non-breaking space if whole word
            const extraLength = append ? 1 : 0;
            replacedString = replacedString.slice(0, match.index) + replacement + append + replacedString.slice((match.index + targetLength));
            break; // Replace only the first occurrence after startIndex
        }
    }

    return replacedString;
  }

  function highlightOffensiveWords(comment: Comment) {
    const matches = getTokens(comment.id);
    const htmlOutput = highlightMatches(comment.content, matches);
    return htmlOutput;
  }
  
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 md:h-14 items-center md:flex">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <p className="text-6xl gluten-family text-red-600">mensh</p>
          <span className="text-sm font-medium hover:underline underline-offset-4 pl-2 pr-3">YouTube</span>
        </Link>
        <nav className="md:ml-auto flex gap-4 sm:gap-6 md:w-full justify-around md:justify-end text-red-900 w-1/2 m-auto">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>TikTok</Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Instagram </Link>
        </nav>
      </header>
      <section className="w-full pt-10 md:pt-20 lg:pt-28 container mx-auto pb-7">
        <div className="container space-y-10 xl:space-y-16">
          <div className="grid gap-4 px-4 md:grid-cols-2 md:gap-16">
            {selectedVideo ? (
              <div>
                <iframe className="w-full aspect-video rounded-xl" src={selectedVideo.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <div className="mt-4 video-details">
                  <div className="flex space-between items-start">
                    <h2 className="font-bold text-xl grow">{selectedVideo.title}</h2>
                    <Button variant="ghost" size="sm-h7" onClick={()=>resetSelection()}>
                        &times;
                    </Button>
                  </div>
  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <Avatar>
                      <Image width="48" height="48" src={selectedVideo.avatar} alt={selectedVideo.username} />
                    </Avatar>
                    <span className="font-medium">{selectedVideo.username}</span>
                    <span>{selectedVideo.postedDate}</span>
                  </div>
                  <div className="text-gray-600 flex justify-around">
                    <Kpi value={humanize(selectedVideo.likes)} label="likes"></Kpi>
                    <Kpi value={humanize(selectedVideo.views)} label="views"></Kpi>
                    <Kpi value={humanize(selectedVideo.comments)} label="comments"></Kpi>
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
                  <h2 className="font-bold md:text-xl mt-4 text-center">
                    Protect yourself from harmful content
                  </h2>
              </div>
            )}
            <div className="flex flex-col items-start space-y-8 md:space-y-4">
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-center md:text-left">
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
                <blockquote className="bg-gray-200 rounded-xl text-center drop-shadow-lg hover:drop-shadow-xl px-9 pt-7 pb-5">
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
      
      <main className="flex-1">
        {selectedVideo ? (<span></span>):(
          <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={2}
          particleDensity={1500}
          className="w-full h-10 absolute -mt-5"
          particleColor="#FFFFFF"
        />
        )}
        <section className="bg-gray-50 pb-10" style={{minHeight:'50vh'}}>
          {selectedVideo ? (
            <div className="video-details w-full pt-6 container mx-auto ">
              <div className="mt-3">
                <details className="lg:w-1/2 comments-title open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-2 rounded-lg">
                  <summary title={(comments?.filter((comment) => isAccepted(comment.id)).length) + ' comments blocked'}
                    className="hover:bg-white text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none flex items-center mb-3">
                    <Badge size="xsmall">
                        {
                          comments?.filter((comment) => (!isAccepted(comment.id))).length
                        }
                    </Badge>
                    <h3 className="w-full font-bold text-lg pl-5 cursor-pointer flex justify-between">
                      <span>
                        Latest Comments ({hideRedactedComments ? (comments?.filter(comment => isAccepted(comment.id)))?.length : comments?.length})
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
                  {comments?.filter((comment) => (hideRedactedComments ? isAccepted(comment.id) : true))
                    .map((comment) => {
                      var commentClasses = ['mt-1'];
                      return <div key={comment.id} className="comment flex items-start gap-4 hover:drop-shadow hover:bg-white">
                          <Avatar>
                            <Image width="48" height="48" src={comment.avatar} alt={comment.username} />
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-medium">{comment.username}</span>
                              <span>{comment.postedDate}</span>
                              <MenshRating value={getScore(comment.id)} />
                            </div>
                            <p className={commentClasses.join(' ')} dangerouslySetInnerHTML={{ __html: highlightOffensiveWords(comment) }}></p>
                            <CommentFooter></CommentFooter>
                          </div>
                        </div>
                    })
                  }
                </div>
                <p>
                  {comments?.filter((comment) => (isAccepted(comment.id))).length === 0 && hideRedactedComments ? 'No Comments Available': ''}
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

function Kpi(props: any) {
  return (
    <div className="text-center">
      <h4 className="text-2xl text-gray-900 font-semibold">
        {props.value}
      </h4>
      <p className="font-light">{props.label}</p>
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

function ThumbsDownIcon(props:any) {
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
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  )
}


function ThumbsUpIcon(props:any) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}

function MessageCircleIcon(props:any) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}
function CommentFooter(props: any) {
  const [showReplyModal, setShowReplyModal] = useState(false)
  const toggleShowReplyModal = () => {
    setShowReplyModal(!showReplyModal)
  }
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon">
        <ThumbsUpIcon className="w-4 h-4" />
        <span className="sr-only">Like</span>
      </Button>
      <Button variant="ghost" size="icon">
        <ThumbsDownIcon className="w-4 h-4" />
        <span className="sr-only">Dislike</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={()=>toggleShowReplyModal()}>
        <MessageCircleIcon className="w-4 h-4" />
        <span className="sr-only">Reply</span>
      </Button>
      <span>{showReplyModal}</span>
    </div>
  )
}
function MenshRating(props: any) {
  const value = Number(props.value);
  var color = 'bg-red-500';
  if (value > .3) color = 'bg-yellow-500';
  if (value > .6) color = 'bg-green-500';

  return (
    <span className={color + ' p-1.5 rounded-full ratio-square'}></span>
  )
}