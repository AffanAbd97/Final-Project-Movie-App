export function formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    const day = date.getDate();
    const daySuffix = (day: number): string => {
      if (day > 3 && day < 21) return 'th'; // special case for 11th-19th
      switch (day % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
      }
    };
  
    return formattedDate.replace(day.toString(), day + daySuffix(day));
  }
  

  