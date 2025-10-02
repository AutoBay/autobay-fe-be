"use client";

import { Facebook, Heart, Linkedin, MessageCircle, Send, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Comment = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
};

type CommentSectionProps = {
  comments: Comment[];
  onAddComment: (content: string) => void;
};

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <section className="space-y-6">
      <div className="border-blog-border border-t pt-12">
        <h2 className="mb-8 flex items-center gap-2 font-bold text-2xl text-foreground">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <form className="mb-12 rounded-xl border border-blog-border bg-card p-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Textarea
              className="min-h-[100px] resize-none border-blog-border focus:border-primary"
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              value={newComment}
            />
            <div className="flex justify-end">
              <Button className="gap-2" type="submit">
                <Send className="h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div className="rounded-xl border border-blog-border bg-card p-6 transition-colors hover:bg-blog-hover" key={comment.id}>
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt={comment.author.name} src={comment.author.avatar} />
                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{comment.author.name}</p>
                      <p className="text-blog-meta text-sm">{comment.timestamp}</p>
                    </div>
                  </div>

                  <p className="text-blog-content leading-relaxed">{comment.content}</p>

                  <div className="flex items-center gap-4">
                    <Button className="gap-2 text-blog-meta hover:text-primary" size="sm" variant="ghost">
                      <Heart className="h-4 w-4" />
                      {comment.likes}
                    </Button>
                    <Button className="text-blog-meta hover:text-primary" size="sm" variant="ghost">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type BlogContentProps = {
  content: string[];
  coverImage?: string;
};

export const Content = ({ content, coverImage }: BlogContentProps) => {
  return (
    <article className="space-y-8">
      {coverImage && (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <img alt="Blog cover" className="h-full w-full object-cover" src={coverImage} />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {content.map((paragraph, index) => (
          <p className="mb-6 text-blog-content leading-relaxed" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};

type BlogHeaderProps = {
  category: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedDate: string;
  onBack: () => void;
};

export const Header = ({ category, title, author, publishedDate, onBack }: BlogHeaderProps) => {
  return (
    <header className="space-y-6">
      <Badge variant="outline">{category}</Badge>

      <h1 className="font-bold text-4xl text-foreground leading-15 tracking-tight md:text-4xl lg:text-5xl">{title}</h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage alt={author.name} className="object-cover" src={author.avatar} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">by {author.name}</p>
            <p className="text-muted-foreground text-sm">{publishedDate}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-widest">Share this</span>
          <Button className="h-9 w-9 rounded-full hover:bg-blog-hover" size="icon" variant="outline">
            <Twitter />
          </Button>
          <Button className="h-9 w-9 rounded-full hover:bg-blog-hover" size="icon" variant="outline">
            <Facebook />
          </Button>
          <Button className="h-9 w-9 rounded-full hover:bg-blog-hover" size="icon" variant="outline">
            <Linkedin />
          </Button>
        </div>
      </div>
    </header>
  );
};

const commentsData = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
    },
    content:
      "This is exactly what I needed! The personalization tips are incredibly valuable. I've been struggling with low open rates, and this gives me a clear direction to improve.",
    timestamp: "2 hours ago",
    likes: 12,
  },
  {
    id: "2",
    author: {
      name: "Mike Chen",
      avatar: "/placeholder.svg",
    },
    content:
      "Great insights on email personalization. I especially liked the section about adding elements that spark interest. Have you tested A/B variations of these techniques?",
    timestamp: "5 hours ago",
    likes: 8,
  },
  {
    id: "3",
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg",
    },
    content:
      "Thanks for sharing this comprehensive guide! The practical examples make it easy to understand how to implement these strategies in our own campaigns.",
    timestamp: "1 day ago",
    likes: 15,
  },
];

const blogData = {
  category: "Company",
  title: "The Best Way to Write a Recurring Email Newsletter",
  author: {
    name: "Esther Howard",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  publishedDate: "Nov 24, 2023",
  content: [
    "You cannot avoid the importance of the first outreach email for increasing your sales in the email campaign. But how can you move out from the crowd and evoke a meaningful and personalized response?",
    "Personalizing the emails for prospects and clients can get you the results you want from your email marketing strategy. As a result, you can engage prospects and drive them toward action, leading to a successful lead prospecting strategy in your sales outreach emails.",
    "Although you cannot personalize every email with great accuracy, you can add a few elements that are enough to spark interest.",
    "To get you in the right direction, here is the complete guide to email personalization for sales outreach that will help you create more engaging and effective email campaigns.",
    "The key to successful email marketing lies in understanding your audience deeply and crafting messages that resonate with their specific needs, challenges, and goals. This approach not only improves open rates but also builds stronger relationships with your prospects.",
  ],
};

export default function BlogPageById() {
  const navigate = useRouter();

  const [comments, setComments] = useState(commentsData);

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/placeholder.svg",
      },
      content,
      timestamp: "Just now",
      likes: 0,
    };
    setComments([newComment, ...comments]);
  };

  return (
    <div className="h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Header
          author={blogData.author}
          category={blogData.category}
          onBack={() => navigate.push("/")}
          publishedDate={blogData.publishedDate}
          title={blogData.title}
        />

        <div className="mt-16">
          <Content content={blogData.content} coverImage="https://plus.unsplash.com/premium_photo-1683211783920-8c66ab120c09" />
        </div>

        <div className="mt-16">
          <CommentSection comments={comments} onAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
}
