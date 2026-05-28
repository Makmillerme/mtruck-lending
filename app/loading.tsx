export default function Loading() {
  return (
    <main className="min-h-screen landing-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-12 space-y-8">
        <div className="h-10 w-64 rounded bg-secondary animate-pulse" />
        <div className="h-14 w-full max-w-3xl rounded bg-secondary animate-pulse" />
        <div className="h-6 w-full max-w-2xl rounded bg-secondary animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6 pt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-secondary animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
