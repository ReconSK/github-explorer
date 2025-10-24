export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const MONTH = DAY * 30;
  const YEAR = DAY * 365;

  const getTimeUnit = (seconds: number): string => {
    switch (true) {
      case seconds < MINUTE:
        return "just now";
      case seconds < HOUR:
        return `${Math.floor(seconds / MINUTE)} minutes ago`;
      case seconds < DAY:
        return `${Math.floor(seconds / HOUR)} hours ago`;
      case seconds < MONTH:
        return `${Math.floor(seconds / DAY)} days ago`;
      case seconds < YEAR:
        return `${Math.floor(seconds / MONTH)} months ago`;
      default:
        return `${Math.floor(seconds / YEAR)} years ago`;
    }
  };

  return getTimeUnit(seconds);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
