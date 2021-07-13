export function mergePathWithQueryAndQuery(path, query) {
    if (!query || query === '' || query === '?') {
        return path.replace('?', '');
    }

    let filteredQuery = query.charAt(0) === '&' || query.charAt(0) === '?' ? query.substring(1) : query;

    let newPath = path + (path.includes('?') ? '&' : '?') + filteredQuery;

    return newPath;
}