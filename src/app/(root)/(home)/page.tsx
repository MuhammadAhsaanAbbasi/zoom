import Image from "next/image";

export default function Home() {
  return (
    <section className="flex size-full flex-col gap-10">
      <div className="h-[303px] w-full bg-hero bg-cover rounded-[20px]">
        <div className="">
          <h2 className="glassmorphism max-w-[270px] text-base text-center">Upcoming Meeting at: 12:30 PM</h2>
        </div>
      </div>
    </section>
  );
}
