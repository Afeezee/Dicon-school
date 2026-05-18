import type { Metadata } from "next";
import type { ReactElement } from "react";

import AdminRouteState from "@/components/admin/AdminRouteState";
import MessagesBoard from "@/components/admin/MessagesBoard";
import { createPageMetadata } from "@/lib/site";
import { getMessages } from "@/lib/supabase/queries";
import type { ContactMessage } from "@/lib/types";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Messages",
  description: "Review contact enquiries inside the private D'Icon School admin dashboard.",
  path: "/admin/messages",
  noIndex: true,
});

export default async function AdminMessagesPage(): Promise<ReactElement> {
  try {
    const messages: ContactMessage[] = await getMessages();

    return <MessagesBoard messages={messages} />;
  } catch {
    return (
      <AdminRouteState
        description="Check the messages table permissions and try this section again."
        message="The messages queue could not load right now."
        title="Messages Error"
      />
    );
  }
}