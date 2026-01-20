# Scenariusz Prezentacji Frontend - Grand Hotel (~5 min)

---

## CZĘŚĆ 1: Pokazanie pustego stanu (BEZ LOGOWANIA)

```
1. Otwórz: http://localhost:5173

2. Kliknij: "Pokoje" (nawigacja)
   → Pokaż że lista jest pusta lub ma mało pokoi

3. Kliknij: "Restauracja" (nawigacja)
   → Pokaż że menu jest puste lub ma mało pozycji

4. Wróć na stronę główną (kliknij logo "Grand Hotel")
```

---

## CZĘŚĆ 2: Logowanie jako ADMIN

```
5. Kliknij: "Zaloguj się" (prawy górny róg)

6. Zaloguj jako admin:
   - Email: admin@grandhotel.pl
   - Hasło: [twoje hasło]

7. Kliknij: "Zaloguj"
```

---

## CZĘŚĆ 3: Panel admina - dodawanie pokoju

```
8. Wpisz w URL: http://localhost:5173/admin
   (lub jeśli masz link w menu to kliknij)

9. Upewnij się że zakładka "Rooms" jest aktywna

10. Wypełnij formularz pokoju:
    - Typ Pokoju: Deluxe Suite
    - Zł/noc: 450
    - Dorosłych: 2
    - Dzieci: 1
    - Wyposażenie: WiFi, TV, Balkon, Minibar

11. (Opcjonalnie) Wybierz zdjęcie pokoju

12. Kliknij: "Dodaj"
    → Pokój pojawia się na liście poniżej
```

---

## CZĘŚĆ 4: Panel admina - dodawanie pozycji menu

```
13. Kliknij zakładkę: "Menu"

14. Wypełnij formularz:
    - Nazwa: Stek z polędwicy
    - Opis: Soczysty stek z frytkami i sosem
    - Cena: 89
    - Kategoria: Dania Główne

15. Kliknij: "Dodaj"
    → Pozycja pojawia się na liście poniżej
```

---

## CZĘŚĆ 5: Wylogowanie admina

```
16. Kliknij: avatar z inicjałami (prawy górny róg)

17. Kliknij: "Wyloguj się"
    → Przekierowanie na stronę logowania
```

---

## CZĘŚĆ 6: Rejestracja nowego użytkownika

```
18. Kliknij: "Zarejestruj się" (link pod formularzem)

19. Wypełnij dane:
    - Imię: Janusz
    - Nazwisko: Kowalski
    - Email: janusz@test.pl
    - Telefon: 123456789
    - Hasło: haslo123
    - Powtórz hasło: haslo123

20. Kliknij: "Zarejestruj się"
    → Automatyczne logowanie i przekierowanie na główną
```

---

## CZĘŚĆ 7: Chat AI - rezerwacja pokoju

```
21. Na stronie głównej widzisz Chat

22. Wpisz:
    "Siema, szukam pokoju na walentynki 14-16 lutego, 2 dorosłych i dziecko"

23. Poczekaj na odpowiedź AI

24. Wpisz:
    "Pokaż mi najtańszą opcję"

25. Poczekaj na odpowiedź AI

26. Wpisz:
    "Dobra, zrób rezerwację tego pokoju"

27. Poczekaj na odpowiedź AI (potwierdzenie rezerwacji)
```

---

## CZĘŚĆ 8: Chat AI - restauracja i stolik

```
28. Wpisz:
    "A co macie w restauracji do jedzenia?"

29. Poczekaj na odpowiedź AI

30. Wpisz:
    "Zarezerwuj stolik na jutro 19:00 dla 3 osób"

31. Poczekaj na odpowiedź AI (potwierdzenie rezerwacji stolika)

32. Wpisz:
    "Pokaż moje wszystkie rezerwacje"

33. Poczekaj na odpowiedź AI (lista rezerwacji)
```

---

## CZĘŚĆ 9: Pokaz UI - weryfikacja

```
34. Kliknij: "Pokoje" (nawigacja)
    → Widzisz nowy pokój dodany przez admina

35. Kliknij na ten pokój
    → Strona szczegółów z ceną i wyposażeniem

36. Kliknij: "Restauracja" (nawigacja)
    → Widzisz nowe danie w menu

37. Kliknij: avatar → "Moje rezerwacje"
    → Lista z rezerwacją pokoju i stolika
```

---

## KONIEC PREZENTACJI

**Czas:** ~5 minut
**Pokazane funkcjonalności:**
- Panel administracyjny (CRUD)
- Rejestracja/Logowanie (JWT)
- Asystent AI (chat tekstowy)
- Rezerwacja pokoi przez AI
- Rezerwacja stolików przez AI
- Responsywny UI
