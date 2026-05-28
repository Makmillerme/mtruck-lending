# About Section — Stats Strip Under Truck Visual (2026-05-12)

## Що зроблено
Додано компактну картку з ключовими цифрами компанії під truck visual card в секції About.

## Де
`components/landing/about.tsx`

## Структура
- Картка: `rounded-[1.35rem] border border-white/[0.07] bg-[oklch(0.13_0.02_252/0.72)]` — тий самий dark-glass стиль що і truck card
- 4 колонки з `divide-x divide-white/[0.06]`
- Кожен стовпець: велике число `text-cyan-200 font-bold` + підпис `text-muted-foreground text-[9px]`
- `mt-3` відступ між truck card і stats card, `max-w-md mx-auto` — вирівнювання по ширині truck card

## Контент (3 локалі)
- **en:** 15+ Years EU market | 500+ Vehicles delivered | 100% Documented | 3 EU countries
- **uk:** 15+ Років на ринку ЄС | 500+ Авто доставлено | 100% З документами | 3 Країни ЄС
- **cs:** 15+ Let na trhu EU | 500+ Vozidel dodáno | 100% S dokumentací | 3 Země EU

## TypeScript
`stats` поле додано до всіх 3 locale-об'єктів в `content`; TypeScript виводить тип автоматично. `tsc --noEmit` пройшов без помилок.