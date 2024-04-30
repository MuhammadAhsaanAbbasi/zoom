import MeetingList from "@/components/Meeting/MeetingList";

export default function Home() {
  const now = new Date(Date.now());
  const currentTime = new Date();
  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  
  // Adding leading zeros if hours or minutes are less than 10
  const formatTime = (value: number): string => {
    return value < 10 ? "0" + value : value.toString();
  };
  
  // Convert 24-hour time to 12-hour time and handle AM/PM
  let meridiem = "AM";
  if (currentHours >= 12) {
    meridiem = "PM";
    currentHours = currentHours === 12 ? 12 : currentHours - 12;
  }
  if (currentHours === 0) {
    currentHours = 12; // 0 hour corresponds to 12 in 12-hour format
  }
  
  // Formatting hours and minutes
  const formattedHours = formatTime(currentHours);
  const formattedMinutes = formatTime(currentMinutes);
  
  // Constructing the final time string
  const time = `${currentHours}:${currentMinutes} ${meridiem}`;

  const date = new Intl.DateTimeFormat([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Use system's default time zone
  }).format(now);
  return (
    <section className="flex size-full flex-col gap-10">
      <div className="h-[303px] w-full bg-hero bg-cover rounded-[20px]">
        <div className="flex h-full flex-col justify-between lg:p-11 max-md:px-4 max-md:py-6">
          <h2 className="glassmorphism max-w-[270px] text-base text-center font-normal rounded">
            Upcoming Meeting at: 12:30 PM
          </h2>
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
