import ChatInterface from "./components/ChatInterface";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#FAF8F5] text-foreground">
      <ChatInterface />
    </main>
  );
}
