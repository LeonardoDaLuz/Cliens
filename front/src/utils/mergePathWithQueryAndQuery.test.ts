import { mergePathWithQueryAndQuery } from "./mergePathWithQueryAndQuery"

test('merge path with query', () => {
    expect(mergePathWithQueryAndQuery('/home?teste=leo', 'teste2=leo2')).toBe('/home?teste=leo&teste2=leo2');
    expect(mergePathWithQueryAndQuery('/home?teste=leo', 'teste2=leo2&teste3=leo3')).toBe('/home?teste=leo&teste2=leo2&teste3=leo3');
    expect(mergePathWithQueryAndQuery('/home?teste=leo', '?teste2=leo2&teste3=leo3')).toBe('/home?teste=leo&teste2=leo2&teste3=leo3');
    expect(mergePathWithQueryAndQuery('/home?teste=leo', '&teste2=leo2&teste3=leo3')).toBe('/home?teste=leo&teste2=leo2&teste3=leo3');
})
