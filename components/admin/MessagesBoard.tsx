"use client";

import { Inbox, MessageSquareText, Search } from "lucide-react";
import { startTransition, useDeferredValue, useMemo, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { MessageStatusFormInput } from "@/lib/admin-schemas";
import { updateMessageStatusAction } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ContactMessage, MessageStatus } from "@/lib/types";

interface MessagesBoardProps {
  messages: ContactMessage[];
}

type MessageFilter = "all" | MessageStatus;

const messageFilterOptions: Array<{ label: string; value: MessageFilter }> = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Read", value: "read" },
  { label: "Replied", value: "replied" },
  { label: "Archived", value: "archived" },
];

function formatMessageDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function MessagesBoard({ messages: initialMessages }: MessagesBoardProps): ReactElement {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<MessageFilter>("all");
  const [draftStatuses, setDraftStatuses] = useState<Record<string, MessageStatus>>({});
  const [updatingMessageId, setUpdatingMessageId] = useState<string | null>(null);
  const deferredSearchTerm: string = useDeferredValue(searchTerm);
  const deferredFilter: MessageFilter = useDeferredValue(activeFilter);

  const visibleMessages: ContactMessage[] = useMemo((): ContactMessage[] => {
    const normalisedQuery: string = deferredSearchTerm.trim().toLowerCase();

    return messages.filter((message: ContactMessage): boolean => {
      const matchesStatus: boolean = deferredFilter === "all" || message.status === deferredFilter;
      const matchesQuery: boolean =
        normalisedQuery.length === 0 ||
        message.full_name.toLowerCase().includes(normalisedQuery) ||
        message.email.toLowerCase().includes(normalisedQuery) ||
        message.message.toLowerCase().includes(normalisedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [deferredFilter, deferredSearchTerm, messages]);

  async function handleStatusSave(message: ContactMessage): Promise<void> {
    const nextStatus: MessageStatus = draftStatuses[message.id] ?? message.status;

    if (nextStatus === message.status) {
      return;
    }

    const input: MessageStatusFormInput = { id: message.id, status: nextStatus };
    setUpdatingMessageId(message.id);
    const response = await updateMessageStatusAction(input);
    setUpdatingMessageId(null);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setMessages((currentMessages: ContactMessage[]): ContactMessage[] =>
      currentMessages.map((currentMessage: ContactMessage): ContactMessage =>
        currentMessage.id === message.id ? { ...currentMessage, status: nextStatus } : currentMessage,
      ),
    );
    toast.success(response.message);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-gold/20 bg-[linear-gradient(160deg,rgba(200,168,75,0.12),rgba(7,7,7,0.96))]">
          <CardContent className="flex items-center gap-5 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold-light">
              <MessageSquareText className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Messages</p>
              <p className="font-display text-4xl text-dicon-text">{messages.length}</p>
              <p className="text-sm leading-relaxed text-dicon-muted">Messages sent through the public contact form.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Inbox className="h-5 w-5 text-gold-light" />
              How This Inbox Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-base leading-relaxed text-dicon-muted">
            <p>Messages are kept separate from applications so the team can read, reply to, and archive follow-ups without mixing them into admissions.</p>
            <Badge variant="outline">Separate messages inbox</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages inbox.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-2">
              <label className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light" htmlFor="message-search">
                Search Messages
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-light" />
                <Input
                  className="pl-11"
                  id="message-search"
                  onChange={(event): void => setSearchTerm(event.target.value)}
                  placeholder="Search by sender, email, or message"
                  value={searchTerm}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Status Filter</p>
              <div className="flex flex-wrap gap-3">
                {messageFilterOptions.map((filterOption: { label: string; value: MessageFilter }): ReactElement => (
                  <Button
                    key={filterOption.value}
                    onClick={(): void => startTransition((): void => setActiveFilter(filterOption.value))}
                    size="sm"
                    variant={activeFilter === filterOption.value ? "default" : "outline"}
                  >
                    {filterOption.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {visibleMessages.length > 0 ? (
            <div className="grid gap-5">
              {visibleMessages.map((message: ContactMessage): ReactElement => {
                const selectedStatus: MessageStatus = draftStatuses[message.id] ?? message.status;
                const isSaving: boolean = updatingMessageId === message.id;

                return (
                  <Card className="border border-dicon-border/90 bg-dicon-surface/80" key={message.id}>
                    <CardContent className="space-y-6 p-6">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="font-display text-3xl text-dicon-text">{message.full_name}</h2>
                            <Badge>{message.status}</Badge>
                          </div>
                          <p className="font-accent text-xs uppercase tracking-[0.24em] text-dicon-muted">Received {formatMessageDate(message.created_at)}</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-[minmax(0,14rem)_auto] xl:min-w-[23rem]">
                          <div className="space-y-2">
                            <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Update Status</p>
                            <Select
                              onValueChange={(value: MessageStatus): void =>
                                setDraftStatuses((currentStatuses: Record<string, MessageStatus>): Record<string, MessageStatus> => ({
                                  ...currentStatuses,
                                  [message.id]: value,
                                }))
                              }
                              value={selectedStatus}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                                <SelectItem value="replied">Replied</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-end">
                            <Button disabled={isSaving || selectedStatus === message.status} onClick={(): void => void handleStatusSave(message)}>
                              {isSaving ? "Saving..." : "Save"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-1">
                          <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Sender Email</p>
                          <p className="text-base text-dicon-text">{message.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Status Meaning</p>
                          <p className="text-base text-dicon-text">Track whether the team has opened or replied to this enquiry.</p>
                        </div>
                      </div>

                      <div className="space-y-2 rounded-[1.5rem] border border-dicon-border bg-dicon-card/80 p-4">
                        <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Message</p>
                        <p className="whitespace-pre-line text-base leading-relaxed text-dicon-muted">{message.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/80 p-8 text-lg leading-relaxed text-dicon-muted">
              No messages match the current search and filter combination.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}