
export function formatDate(dateIsoFormat) {
    const dateToFormat = new Date(dateIsoFormat);
    const strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const thisYear = new Date().getFullYear();
    const d = dateToFormat.getDate();
    const m = strArray[dateToFormat.getMonth()];
    const y = dateToFormat.getFullYear();

    if(thisYear === y){
        return `${m} ${d}`;
    }else {
        return `${m} ${d}, ${y}`;
    }
}

