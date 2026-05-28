# Scroll Restoration Bug Fix (2026-05-12)

## Симптом
Після reload сайт з'являвся нагорі, потім плавно з'їжджав вниз (до позиції де був юзер).

## Причина
`scroll-behavior: smooth` на `html` у globals.css + `history.scrollRestoration = "auto"` (браузер). Браузер відновлював збережену позицію через CSS smooth-scroll — виглядало як анімований drift вниз.

## Виправлення
1. **`app/globals.css`**: Видалено `scroll-behavior: smooth` з `html` блоку. Smooth scrolling для навігації залишається через явний `{ behavior: "smooth" }` у `scrollToSection`.
2. **`components/landing/home-client.tsx`**: Додано useEffect з `history.scrollRestoration = "manual"` + `window.scrollTo(0, 0)` при завантаженні без hash. Cleanup повертає `"auto"`.

## Не ламає
- In-page navigation (`scrollToSection`) — явно передає `{ behavior: "smooth" }`
- Hash-навігація (`#section`) — guard пропускає якщо є hash