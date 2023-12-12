export const getFormatedDate = (date: Date, format: 'yyyy-MM-dd' | 'dd-MM-yyyy') => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    switch (format) {
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'dd-MM-yyyy':
        return `${day}.${month}.${year}`;
      default:
        throw new Error(`Unsupported date format: ${format}`);
    }
  };