
export function hyperLinkToObject(links) {
    let linksArray = links.split(', ');
    let obj = {};
    linksArray.forEach(item => {
        let arr = item.split('; ');
        let key = arr[1].replace('rel="', '').replace('"', '');
        obj[key] = arr[0].replace(/[<>]/g, '');
    });

    return obj;
}

