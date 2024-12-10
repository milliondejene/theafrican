export const getTimeAgo = (dateString) => {
  const postDate = new Date(dateString);
  const currentDate = new Date();
  const timeDiffMs = currentDate - postDate; // Difference in milliseconds

  // Calculate time differences
  const minutes = Math.floor(timeDiffMs / (1000 * 60));
  const hours = Math.floor(timeDiffMs / (1000 * 60 * 60));
  const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days <= 9) return `${days} day${days === 1 ? "" : "s"} ago`;

  // If the difference is greater than 9 days, return the exact date
  const options = { year: "numeric", month: "short", day: "numeric" };
  return postDate.toLocaleDateString("en-GB", options); // Format like '16 Oct 2024'
};
