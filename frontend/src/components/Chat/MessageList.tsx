// src/components/Chat/MessageList.tsx
"use client";

import { useEffect, useRef } from "react";
import { Message as MessageType } from "@/lib/types/message";
import Message from "./Message";

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="px-8 pt-20">
        <div className="max-w-4xl mx-auto w-full">
          <h3
            className="text-[28px] leading-tight mb-3 font-medium"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
            }}
          >
            Explore Gut Microbiome Literature
          </h3>

          <p
            className="text-[15px] leading-7 mb-6 max-w-xl"
            style={{
              color: "var(--text-muted)",
            }}
          >
            Ask questions across hundreds of research papers and receive
            grounded answers with traceable sources.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "What is the gut microbiome?",
              "Papers on autism and microbiota",
              "SCFA mechanisms",
              "Akkermansia and obesity",
            ].map((example) => (
              <div
                key={example}
                className="px-4 py-2 rounded-xl text-[13px]"
                style={{
                  background: "var(--bg-card)",
                  border: "0.5px solid var(--border-soft)",
                  color: "var(--text-secondary)",
                }}
              >
                {example}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-10">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
