export function mergePathWithQueryAndQuery(path: string, query: string): string {
    if (!query || query === '' || query === '?') {
        return path.replace('?', '');
    }

    const filteredQuery = query.charAt(0) === '&' || query.charAt(0) === '?' ? query.substring(1) : query;

    const newPath = path + (path.includes('?') ? '&' : '?') + filteredQuery;

    return newPath; 
}