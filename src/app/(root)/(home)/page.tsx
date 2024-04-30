import MeetingList from "@/components/Meeting/MeetingList";

export default function Home() {
  function formatTime(time:number) {
    return time < 10 ? "0" + time : time;
  }
  
  // Get the current date and time in UTC
  const now = new Date();
  
  // Get the hours and minutes in UTC
  const hoursUTC = now.getUTCHours();
  const minutesUTC = now.getUTCMinutes();
  
  // Convert UTC hours to your desired time zone
  // For example, let's say your desired time zone is GMT+5:30
  const timeZoneOffset = 5 * 60 + 30; // Offset in minutes
  let hours = hoursUTC + Math.floor(timeZoneOffset / 60);
  let minutes = minutesUTC
  
  // Adjust hours and minutes for negative values or overflow
  if (hours < 0) {
    hours += 24;
  }
  if (hours >= 24) {
    hours -= 24;
  }
  
  // Format hours and minutes with leading zeros
  const formattedHours = formatTime(hours);
  const formattedMinutes = formatTime(minutes);
  
  // Construct the time string
  const time = `${formattedHours}:${formattedMinutes}`;
  
  console.log("Time in your desired time zone:", time);
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
