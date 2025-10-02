import { Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  description?: string;
}

interface TimelineActivity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target?: string;
  time: string;
  status?: {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
  comment?: string;
  tags?: Array<{
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }>;
}

interface BasicTimelineProps {
  events: TimelineEvent[];
}

interface AdvancedTimelineProps {
  activities: TimelineActivity[];
}

export function BasicTimeline({ events }: BasicTimelineProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-foreground text-xl">Basic</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-3 w-px bg-border" />

        <div className="space-y-8">
          {events.map((event, index) => (
            <div className="relative flex items-start gap-4" key={event.id}>
              {/* Timeline dot */}
              <div className="relative z-10 flex h-6 w-6 items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
              </div>

              {/* Event content */}
              <div className="min-w-0 flex-1 pb-8">
                <div className="text-muted-foreground text-sm">
                  {event.title} - {event.time}
                </div>
                {event.description && <div className="mt-1 text-foreground text-sm">{event.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdvancedTimeline({ activities }: AdvancedTimelineProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-foreground text-xl">Advance</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-6 w-px bg-border" />

        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div className="relative flex items-start gap-4" key={activity.id}>
              {/* Avatar */}
              <div className="relative z-10">
                <Avatar className="h-12 w-12">
                  <AvatarImage alt={activity.user.name} src={activity.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary font-medium text-primary-foreground text-sm">{activity.user.initials}</AvatarFallback>
                </Avatar>
              </div>

              {/* Activity content */}
              <div className="min-w-0 flex-1 pb-6">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-foreground">{activity.user.name}</span>
                  <span className="text-muted-foreground">{activity.action}</span>
                  {activity.target && <span className="font-medium text-foreground">{activity.target}</span>}
                  {activity.status && (
                    <Badge className="ml-1" variant={activity.status.variant}>
                      <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                      {activity.status.label}
                    </Badge>
                  )}
                  <span className="ml-auto text-muted-foreground">{activity.time}</span>
                </div>

                {activity.comment && (
                  <Card className="mt-3 bg-muted/50">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">{activity.comment}</p>
                    </CardContent>
                  </Card>
                )}

                {activity.tags && activity.tags.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">added tags</span>
                    <div className="flex gap-2">
                      {activity.tags.map((tag, tagIndex) => (
                        <Badge className="text-xs" key={tagIndex} variant={tag.variant}>
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrderPageById() {
  const basicEvents: TimelineEvent[] = [
    {
      id: "1",
      title: "Breakfast",
      time: "09:00",
    },
    {
      id: "2",
      title: "Lunch",
      time: "12:30",
    },
    {
      id: "3",
      title: "Dinner",
      time: "7:00",
    },
  ];

  const advancedActivities: TimelineActivity[] = [
    {
      id: "1",
      user: {
        name: "Angelina Gotelli",
        initials: "AG",
        avatar: "/professional-woman-avatar.png",
      },
      action: "has change the status to",
      status: {
        label: "Completed",
        variant: "default",
      },
      time: "6h ago",
    },
    {
      id: "2",
      user: {
        name: "Max Alexander",
        initials: "MA",
        avatar: "/professional-man-avatar.png",
      },
      action: "comment on your",
      target: "Post",
      time: "2d ago",
      comment:
        "Fine, Java MIGHT be a good example of what a programming language should be like. But Java applications are good examples of what applications SHOULDN'T be like.",
    },
    {
      id: "3",
      user: {
        name: "Eugene Stewart",
        initials: "ES",
        avatar: "/developer-avatar.png",
      },
      action: "added tags",
      time: "2d ago",
      tags: [
        {
          label: "Live Issue",
          variant: "destructive",
        },
        {
          label: "Backend",
          variant: "default",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-12 p-6">
      <BasicTimeline events={basicEvents} />
      <AdvancedTimeline activities={advancedActivities} />
    </div>
  );
}
