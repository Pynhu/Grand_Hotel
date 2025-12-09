export interface MenuItem {
    id: number
    name: string
    description: string
    price: number
    category: 'Przystawki' | 'Dania Główne' | 'Desery' | 'Napoje'
    image: string
    vegetarian?: boolean
    spicy?: boolean
}

export const mockMenu: MenuItem[] = [
    // PRZYSTAWKI
    {
        id: 1,
        name: 'Carpaccio z łososia',
        description: 'Świeży łosoś w plastrach z kaparami, rukolą i sosem cytrynowym',
        price: 42,
        category: 'Przystawki',
        image: 'https://images.unsplash.com/photo-1580959375944-1ab5eeb37e52?w=600',
        vegetarian: false
    },
    {
        id: 2,
        name: 'Bruschetta z pomidorami',
        description: 'Grillowany chleb z pomidorami, bazylią i oliwą z oliwek',
        price: 28,
        category: 'Przystawki',
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600',
        vegetarian: true
    },
    {
        id: 3,
        name: 'Tatar wołowy',
        description: 'Klasyczny tatar z wołowiny z żółtkiem, kaparami i grzankami',
        price: 48,
        category: 'Przystawki',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
        vegetarian: false
    },
    {
        id: 4,
        name: 'Kremy serowy',
        description: 'Aksamitny krem z sera pleśniowego z grzankami i orzechami włoskimi',
        price: 32,
        category: 'Przystawki',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
        vegetarian: true
    },

    // DANIA GŁÓWNE
    {
        id: 5,
        name: 'Stek z polędwicy wołowej',
        description: 'Soczysty stek 250g z ziemniakami i warzywami z grilla',
        price: 89,
        category: 'Dania Główne',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600',
        vegetarian: false
    },
    {
        id: 6,
        name: 'Łosoś w sosie maślano-cytrynowym',
        description: 'Pieczony łosoś z purée z ziemniaków i szparagami',
        price: 78,
        category: 'Dania Główne',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600',
        vegetarian: false
    },
    {
        id: 7,
        name: 'Risotto z grzybami leśnymi',
        description: 'Kremowe risotto z boczniakami, kurkami i parmezanem',
        price: 62,
        category: 'Dania Główne',
        image: 'https://images.unsplash.com/photo-1476124369491-c1ca2e1d0133?w=600',
        vegetarian: true
    },
    {
        id: 8,
        name: 'Pierś z kaczki w sosie pomarańczowym',
        description: 'Różowa pierś z kaczki z pieczonymi ziemniakami',
        price: 82,
        category: 'Dania Główne',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
        vegetarian: false
    },
    {
        id: 9,
        name: 'Pasta carbonara',
        description: 'Spaghetti z boczkiem, żółtkiem, parmezanem i czarnym pieprzem',
        price: 54,
        category: 'Dania Główne',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600',
        vegetarian: false
    },
    {
        id: 10,
        name: 'Kotlet schabowy z ziemniakami',
        description: 'Klasyczny polski kotlet z ziemniakami i surówką',
        price: 58,
        category: 'Dania Główne',
        image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
        vegetarian: false
    },

    // DESERY
    {
        id: 11,
        name: 'Tiramisu',
        description: 'Włoski deser z mascarpone, biszkoptami i kawą',
        price: 28,
        category: 'Desery',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600',
        vegetarian: true
    },
    {
        id: 12,
        name: 'Crème brûlée',
        description: 'Klasyczny francuski deser z karmelizowanym cukrem',
        price: 32,
        category: 'Desery',
        image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600',
        vegetarian: true
    },
    {
        id: 13,
        name: 'Szarlotka z lodami',
        description: 'Ciepła szarlotka z lodami waniliowymi i bitą śmietaną',
        price: 26,
        category: 'Desery',
        image: 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=600',
        vegetarian: true
    },
    {
        id: 14,
        name: 'Lawa czekoladowa',
        description: 'Gorący deser czekoladowy z płynnym środkiem i lodami',
        price: 34,
        category: 'Desery',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600',
        vegetarian: true
    },

    // NAPOJE
    {
        id: 15,
        name: 'Espresso',
        description: 'Klasyczna kawa espresso z wyselekcjonowanych ziaren',
        price: 12,
        category: 'Napoje',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600',
        vegetarian: true
    },
    {
        id: 16,
        name: 'Latte Macchiato',
        description: 'Delikatna kawa z mlekiem i pianką',
        price: 16,
        category: 'Napoje',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600',
        vegetarian: true
    },
    {
        id: 17,
        name: 'Świeżo wyciskany sok pomarańczowy',
        description: '100% naturalne świeże pomarańcze',
        price: 18,
        category: 'Napoje',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600',
        vegetarian: true
    },
    {
        id: 18,
        name: 'Koktajl truskawkowy',
        description: 'Świeże truskawki z jogurtem i miodem',
        price: 22,
        category: 'Napoje',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600',
        vegetarian: true
    }
]