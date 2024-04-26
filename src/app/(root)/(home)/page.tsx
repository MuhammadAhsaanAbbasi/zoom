import MeetingList from "@/components/Meeting/MeetingList";
import Image from "next/image";

export default function Home() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
  const date = (new Intl.DateTimeFormat([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })).format(now)
  return (
    <section className="flex size-full flex-col gap-10">
      <div className="h-[303px] w-full bg-hero bg-cover rounded-[20px]">
        <div className="flex h-full flex-col justify-between lg:p-11 max-md:px-4 max-md:py-6">
          <h2 className="glassmorphism max-w-[270px] text-base text-center font-normal rounded">Upcoming Meeting at: 12:30 PM</h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-7xl font-bold">{time}</h1>
            <h2 className="text-3xl font-medium text-sky-1">{date}</h2>
          </div>
        </div>
      </div>
      <MeetingList />
    </section>
  );
}
