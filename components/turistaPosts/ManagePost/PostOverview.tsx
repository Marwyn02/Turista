export default function PostOverview({ name }: { name: string }) {
  return (
    <>
      <section className="p-32 text-3xl font-semibold text-gray-800">
        Welcome, {name}!
      </section>
    </>
  );
}
