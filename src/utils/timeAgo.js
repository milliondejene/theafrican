// src/utils/timeAgo.js

export const getTimeAgo = (dateString) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = Math.floor((currentDate - postDate) / (1000 * 60 * 60 * 24)); // Difference in days
  
    if (timeDiff === 0) return "Today";
    if (timeDiff === 1) return "1 day ago";
    
    // If the difference is greater than 9 days, return the exact date
    if (timeDiff > 9) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return postDate.toLocaleDateString('en-GB', options); // Format like '16 Oct 2024'
    }
  
    return `${timeDiff} days ago`;
  };
  