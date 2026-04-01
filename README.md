# Sakura Music App

"Музыка тыңдау және альбом шолу қызметін жасау" тақырыбына негізделе жасалған Sakura Music плеері.

**Автор:** Жұматай Махфуза 
- **Render frontend:** https://sakura-frontend-fbbc.onrender.com
- **Render backend:** https://sakura-backend-z3e9.onrender.com

## Технологиялар

| Қабат | Технологиялар |
|-------|--------------|
| Frontend | React 18, Vite, React Router, Axios, Lucide Icons, CSS Grid/Flexbox |
| Backend | Node.js, Express.js, Sequelize ORM |
| Дерекқор | PostgreSQL (SSL қолдауымен) |
| Аутентификация | JWT (JSON Web Token) + bcrypt хэштеу |
| Деплоймент | Render (Backend: Web Service, Frontend: Static Site) |
| Нұсқа бақылау | Git + GitHub |

## Негізгі мүмкіндіктер

- **Аутентификация** — тіркелу, кіру, JWT-мен қорғалған маршруттар
- **Профиль** — аты, email, аватар (URL немесе файл жүктеу), пароль өзгерту
- **Тректер** — тізім, іздеу, ойнату, сүйікті тректер
- **Плейер** — ойнату/тоқтату, келесі/алдыңғы, seek, дыбыс деңгейі, кезек
- **Плейлисттер** — жасау, ашу, трек қосу/алып тастау, жою
- **Пікірлер (Reviews)** — тректерге пікір жазу, өзгерту, жою
- **Сүйікті тректер** — серверде сақталады (JSONB), логин кезінде синхрондалады
- **Валидация** — клиенттік (real-time, қазақша) + серверлік (қазақша хабарламалар)
- **404 беттер** — frontend (React Router) және backend (API JSON)
- **Адаптивтілік** — мобильді (480px), планшет (768px), десктоп
- **Деплоймент** — Render платформасында тұрақты жұмыс істейді

## Жоба құрылымы

```text
Sakura/
├── frontend/
│   └── src/
│       ├── api/           — Axios instance, API функциялары
│       ├── components/    — Player, Sidebar, TrackCard
│       ├── context/       — MusicContext (глобалды state)
│       ├── pages/         — Home, Login, Register, Profile, Library, Liked, Search, NotFound
│       ├── routes/        — AppRouter (маршруттар)
│       └── styles/        — index.css (барлық стильдер)
├── backend/
│   ├── config/            — db.js (Sequelize конфигурация)
│   ├── controllers/       — authController, trackController, playlistController, reviewController, userController
│   ├── middleware/         — auth.js (JWT protect)
│   ├── models/            — User, Artist, Track, Playlist, PlaylistTrack, Review
│   └── routes/            — authRoutes, trackRoutes, playlistRoutes, reviewRoutes, userRoutes, itunesRoutes
└── render.yaml            — Render деплоймент конфигурациясы
```

## Орнату нұсқаулығы

### 1. Backend

```bash
cd backend
cp .env.example .env   # Немесе .env файлын қолмен жасаңыз
npm install
npm start
```

`.env` мысалы:
```env
DB_NAME=Sakura
DB_USER=postgres
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5434
JWT_SECRET=mysecret
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

`frontend/.env` мысалы:
```env
VITE_API_URL=http://localhost:5001/api
VITE_MEDIA_URL=http://localhost:5001
```

Production build:
```bash
npm run build
```

### 3. Дерекқор толтыру

```bash
cd backend
node itunesSeed.js       # iTunes API-ден тректер жүктеу
node reimportTracks.js   # JSON-дан дерекқорға импорт
```

## API құжаттамасы

### Аутентификация

| Әдіс | Endpoint | Сипаттама | Қорғау |
|------|----------|-----------|--------|
| POST | `/api/auth/register` | Жаңа пайдаланушы тіркеу (username, email, password) | - |
| POST | `/api/auth/login` | Жүйеге кіру (email, password) → JWT token | - |
| GET | `/api/auth/me` | Ағымдағы пайдаланушы мәліметтері | JWT |

### Пайдаланушылар

| Әдіс | Endpoint | Сипаттама | Қорғау |
|------|----------|-----------|--------|
| GET | `/api/users/:id` | Профиль мәліметтерін алу | JWT |
| PUT | `/api/users/:id` | Профильді жаңарту (username, email, avatar, password, likedTracks) | JWT |

### Тректер

| Әдіс | Endpoint | Сипаттама | Қорғау |
|------|----------|-----------|--------|
| GET | `/api/tracks` | Барлық тректер тізімі | - |
| GET | `/api/tracks/search?q=...` | Трек іздеу | - |
| GET | `/api/tracks/:id` | Бір трек мәліметі | - |

### Плейлисттер

| Әдіс | Endpoint | Сипаттама | Қорғау |
|------|----------|-----------|--------|
| GET | `/api/playlists` | Пайдаланушы плейлисттері | JWT |
| POST | `/api/playlists` | Жаңа плейлист жасау | JWT |
| GET | `/api/playlists/:id` | Плейлист мәліметтері + тректер | JWT |
| DELETE | `/api/playlists/:id` | Плейлистті жою | JWT |
| POST | `/api/playlists/:id/tracks` | Плейлистке трек қосу | JWT |
| DELETE | `/api/playlists/:id/tracks/:trackId` | Плейлисттен трек алып тастау | JWT |

### Пікірлер (Reviews)

| Әдіс | Endpoint | Сипаттама | Қорғау |
|------|----------|-----------|--------|
| GET | `/api/tracks/:trackId/reviews` | Трек пікірлері | - |
| POST | `/api/tracks/:trackId/reviews` | Пікір жазу | JWT |
| PUT | `/api/tracks/:trackId/reviews/:id` | Пікірді өзгерту | JWT |
| DELETE | `/api/tracks/:trackId/reviews/:id` | Пікірді жою | JWT |

## Валидация

### Клиент жағы (Frontend)
- **Email**: бос емес, тек сандар емес, `user@mail.com` форматында
- **Құпия сөз**: бос емес, кемінде 6 таңба
- **Пайдаланушы аты**: бос емес, кемінде 2 таңба
- **Құпия сөзді растау**: сәйкестік тексеру
- Real-time валидация: onBlur + onChange кезінде қызыл жиекпен және қазақша хабарлама көрсетіледі

### Сервер жағы (Backend)
- Бірдей валидация ережелері серверде де тексеріледі
- Хабарламалар қазақша: "Email форматы дұрыс емес", "Құпия сөз кемінде 6 таңба болуы керек", т.б.
- Бұрыннан тіркелген email/username → "Бұл email немесе пайдаланушы аты бұрыннан тіркелген"

## Қолмен тестілеу

| # | Тест сценарийі | Күтілетін нәтиже | Статус |
|---|---------------|------------------|--------|
| 1 | Бос форммен тіркелу | Қызыл валидация хабарламалары шығады | ✅ |
| 2 | Сандардан тұратын email жазу | "Email тек сандардан тұра алмайды" | ✅ |
| 3 | Дұрыс деректермен тіркелу | Сәтті тіркелу, басты бетке redirect | ✅ |
| 4 | Қате парольмен кіру | "Email немесе құпия сөз қате" | ✅ |
| 5 | Дұрыс деректермен кіру | Сәтті кіру, басты бетке redirect | ✅ |
| 6 | Трек ойнату | Плейер ашылады, музыка ойнайды | ✅ |
| 7 | Келесі/алдыңғы трек | Кезектегі келесі/алдыңғы ойнайды | ✅ |
| 8 | Сүйіктіге қосу | Жүрек белгісі ауысады, сервермен синхрондалады | ✅ |
| 9 | Плейлист жасау | Кітапханада жаңа плейлист пайда болады | ✅ |
| 10 | Плейлистке трек қосу | Трек плейлист ішінде көрінеді | ✅ |
| 11 | Плейлистті жою | Кітапханадан жойылады | ✅ |
| 12 | Профиль аватарын файлмен өзгерту | Жаңа аватар көрінеді | ✅ |
| 13 | Парольді өзгерту | Ескі парольмен кіре алмайды, жаңасымен кіреді | ✅ |
| 14 | Жоқ бетке кіру (404) | "Бет табылмады" көрсетіледі | ✅ |
| 15 | API жоқ endpoint (404) | JSON: `{"message":"API endpoint not found"}` | ✅ |
| 16 | Responsive: 768px | Sidebar иконкаларға кішірейеді | ✅ |
| 17 | Responsive: 480px | Sidebar жасырылады, мобильді интерфейс | ✅ |

## Деплоймент (Render)

| Сервис | Түрі | Директория | URL |
|--------|------|------------|-----|
| sakura-backend | Web Service (Node.js) | `backend/` | `https://sakura-backend-z3e9.onrender.com` |
| sakura-frontend | Static Site | `frontend/` | Render Static Site URL |
| PostgreSQL | Database | — | Render PostgreSQL |

### Render Environment Variables

**Backend:**
- `NODE_ENV=production`, `PORT=10000`
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` — Render PostgreSQL-ден
- `DB_SSL=true`, `JWT_SECRET`

**Frontend:**
- `VITE_API_URL=https://sakura-backend-z3e9.onrender.com/api`
- `VITE_MEDIA_URL=https://sakura-backend-z3e9.onrender.com`

## Пайдалану нұсқаулығы

1. Сайтты ашыңыз → Басты бетте тректер тізімі көрінеді
2. **Тіркелу** — "Тіркелу" бетіне өтіп, аты/email/пароль жазыңыз
3. **Кіру** — "Кіру" бетінде email/пароль жазыңыз
4. **Трек ойнату** — кез келген трек карточкасын басыңыз, төменгі плейер ашылады
5. **Сүйіктілер** — жүрек батырмасын басыңыз, "Сүйіктілер" бетінен тыңдай аласыз
6. **Плейлист** — "Кітапхана" бетінен жаңа плейлист жасап, тректерді қосыңыз
7. **Профиль** — жоғарғы оң жақтағы профиль сілтемесін басып, мәліметтерді өзгертіңіз
8. **Іздеу** — іздеу бетінде трек атауы немесе орындаушы бойынша іздеңіз
