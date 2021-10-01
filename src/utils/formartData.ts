const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);
    
    const day = dateFormatted.getDate();
    const month = dateFormatted.getMonth() + 1;
    const year = dateFormatted.getFullYear();
    
    return `${!(day > 9) ? 0 : ''}${day}/${!(month > 9) ? 0 : ''}${month}/${year}`;
}

export default formatDate;