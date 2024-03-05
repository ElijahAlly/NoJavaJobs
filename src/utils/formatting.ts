export const formatDescription = (description = "", isColumn: boolean = true): string => {
    if (!description) return description;
    return isColumn ? description.slice(0, 333).trimEnd() + '...' : description.slice(0, 777).trimEnd() + '...';
}

export const formatDate = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 24) {
        return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays <= 30) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
        // Format as "month day" for dates older than 30 days
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `on ${monthNames[date.getMonth()]} ${date.getDate()}`;
    }
}
