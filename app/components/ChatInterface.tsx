"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

export default function ChatInterface() {
   const { messages, sendMessage, status, error } = useChat();
   const isLoading = status === "streaming" || status === "submitted";    const [input, setInput] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length > 0 && !hasStarted) {
            setHasStarted(true);
        }
        if (hasStarted) {
            scrollToBottom();
        }
    }, [messages, hasStarted]);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed && !hasStarted) return;
        if (!hasStarted) setHasStarted(true);

        if (trimmed) {
            await sendMessage({ text: trimmed });
            setInput("");
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSend();
    };

    return (
        <div className={`w-full max-w-4xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${hasStarted ? 'h-full justify-end' : 'min-h-[80vh]'}`}>

            {/* Initial Welcome Screen - Only visible when !hasStarted */}
            {!hasStarted && (
                <div className="flex flex-col items-center text-center space-y-4 mb-4 max-w-2xl px-4">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                        Ready to Explore?
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground">
                        Ask about any verse or chapter and I&apos;ll unpack it :)
                    </p>
                </div>
            )}

            {/* Chat Messages Area - Only visible when hasStarted */}
            {hasStarted && (
                <div className="w-full flex-1 flex flex-col gap-6 pt-6 pb-32 overflow-y-auto px-4">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={msg.id || idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <Card
                                    className={`max-w-[90%] md:max-w-[80%] whitespace-pre-wrap shadow-sm border-0 ${
                                        msg.role === 'user'
                                            ? 'flex items-center px-4 py-2 bg-[#E0E0E0] text-foreground rounded-tr-sm'
                                            : 'p-6 leading-relaxed bg-transparent text-foreground pl-0 shadow-none'
                                    }`}
                                >
                                    {(() => {
                                        const text =
                                            Array.isArray((msg as any).parts)
                                                ? (msg as any).parts
                                                    .filter((p: any) => p?.type === 'text')
                                                    .map((p: any) => p.text)
                                                    .join('')
                                                : (msg as any).content ?? '';

                                        if (msg.role === 'user') {
                                            // Single-line user bubble: no extra margins so it's perfectly centered
                                            return (
                                                <span className="text-sm leading-normal">
                                                    {text}
                                                </span>
                                            );
                                        }

                                        return String(text)
                                            .split('\n')
                                            .map((line, i) => {
                                                const trimmed = line.trim();
                                                // Skip completely empty lines so they don't add extra vertical gap
                                                if (!trimmed) {
                                                    return null;
                                                }
                                                const isHeading =
                                                    trimmed.endsWith(':') &&
                                                    trimmed.length > 0 &&
                                                    trimmed.length <= 60;

                                                const baseSpacing = 'mt-3 mb-1';
                                                // Headings: larger gap above, very small gap below
                                                const headingClasses = 'font-semibold mt-5 mb-1';

                                                return (
                                                    <p
                                                        key={i}
                                                        className={isHeading ? headingClasses : baseSpacing}
                                                    >
                                                        {line}
                                                    </p>
                                                );
                                            });
                                    })()}
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="ml-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm"
                        >
                            <strong>Something went wrong.</strong> {error.message}
                        </motion.div>
                    )}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="ml-4 text-sm text-muted-foreground italic"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                Consulting the archives...
                            </span>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            )}

            {/* Input Area - Centered initially, then fixed at bottom */}
            <div className={`w-full max-w-2xl px-0 transition-all duration-500 ${hasStarted ? 'fixed bottom-6 left-1/2 -translate-x-1/2' : ''}`}>
                <form
                    onSubmit={onSubmit}
                    className={`flex items-center gap-1 bg-background border rounded-2xl shadow-sm transition-all focus-within:shadow-md focus-within:ring-1 focus-within:ring-primary/20 ${
                        hasStarted ? 'px-3 py-2' : 'px-3 py-2'
                    }`}
                >
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Explore any passage or theme..."
                        rows={3}
                        onKeyDown={async (e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                await handleSend();
                            }
                        }}
                        className="flex-1 h-16 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-[2px] pr-0 py-0 text-sm leading-snug resize-none shadow-none outline-none"
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || (!input.trim() && !hasStarted)}
                        size="icon"
                        className={`rounded-full shrink-0 transition-all ${
                            input.trim()
                                ? 'bg-[#ff9500] hover:bg-[#ff8a00] text-white w-8 h-8'
                                : 'bg-muted text-muted-foreground w-8 h-8 opacity-50'
                        }`}
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
