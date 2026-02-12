export const API_CONFIG = {
    BASE_URL: 'https://pokeapi.co/api/v2',
    ENDPOINTS: {
        POKEMON: '/pokemon',
    },
    GENERATIONS: {
        KANTO: { id: 1, name: 'Kanto', start: 1, end: 151 },
        JOHTO: { id: 2, name: 'Johto', start: 152, end: 251 },
        HOENN: { id: 3, name: 'Hoenn', start: 252, end: 386 },
        SINNOH: { id: 4, name: 'Sinnoh', start: 387, end: 493 }
    }
};