# SASE Zero — app

Rebanada vertical: React + TypeScript + Tailwind + Supabase.

## Cómo correrlo

```bash
npm install
cp .env.example .env   # completa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
npm run dev
```

## Otros comandos

```bash
npm run test       # corre los tests una vez
npm run test:watch # corre los tests en modo watch
npm run build      # build de producción (type-check + bundle)
```

## Variables de entorno

Definidas en `.env` (no se commitea; ver `.env.example`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Nunca se usan datos reales de alumnos en este proyecto.
