# watchele - Tracciatore Film e Serie Avanzato

Un'applicazione web elegante e completa per tracciare con precisione i film e le serie TV che hai guardato. Realizzata con HTML, CSS e JavaScript vanilla, integrata con Supabase.

## 📋 Caratteristiche

- ✅ **5 voti dettagliati**: inizio, fine, tecnico, sceneggiatura, attori
- ✅ **Voto finale automatico**: media intelligente dei 5 voti
- ✅ **Campi aggiuntivi**: personaggio preferito, "lo risiguarderebbe?"
- ✅ **Copertina automatica**: cerca l'immagine della copertina online
- ✅ **Ricerca per titolo**: trova velocemente i tuoi film
- ✅ **Ordinamento multi**: per data, voto finale, titolo
- ✅ **Filtri avanzati**: per tipo (film/serie) e risiguarderebbe
- ✅ **Interfaccia dark mode**: pulita e moderna
- ✅ **Design reattivo**: perfetto su mobile, tablet e desktop

## 🚀 Quick Start

### ⚠️ SE HAI GIÀ IL DATABASE VECCHIO

Se avevi già creato la tabella `movies` con lo schema precedente, **DEVI aggiornarla**!

Vedi il file `MIGRATION.md` per le istruzioni (puoi mantenere i tuoi film precedenti oppure ricominciare da zero).

### Step 1: Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Click "New Project" and fill in the details
3. Wait for the project to be created (2-3 minutes)

#### Create the `movies` Table

1. In Supabase, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste the SQL from `DATABASE_SETUP.sql` file in the project:

```sql
CREATE TABLE movies (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('movie', 'series')),
  poster_url text,
  voto_inizio integer CHECK (voto_inizio >= 1 AND voto_inizio <= 10),
  voto_fine integer CHECK (voto_fine >= 1 AND voto_fine <= 10),
  voto_tecnico integer CHECK (voto_tecnico >= 1 AND voto_tecnico <= 10),
  voto_sceneggiatura integer CHECK (voto_sceneggiatura >= 1 AND voto_sceneggiatura <= 10),
  voto_attori integer CHECK (voto_attori >= 1 AND voto_attori <= 10),
  personaggio_preferito text,
  risiguarderebbe boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_movies_created_at ON movies(created_at DESC);
CREATE INDEX idx_movies_rating ON movies((voto_inizio + voto_fine + voto_tecnico + voto_sceneggiatura + voto_attori) DESC);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous access" ON movies
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click "Run" to execute the SQL

#### Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy your **Project URL** (looks like `https://xxxxxxxx.supabase.co`)
3. Copy your **anon (public) key** (starts with `eyJhbGc...`)

### Step 2: Configure the App

1. Open `app.js` in a text editor
2. Find line 8:
   ```javascript
   const TMDB_API_KEY = 'INSERISCI_QUI_LA_TUA_CHIAVE_TMDB';
   ```
3. **Get your free TMDb API key:**
   - Go to https://www.themoviedb.org/settings/api
   - Click "Sign Up" (top left) → Create free account
   - Verify your email
   - Go back to https://www.themoviedb.org/settings/api
   - Copy the **"API Read Access Token (v4)"** (long text)
4. Paste it in `app.js`:
   ```javascript
   const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTQ1...';
   ```

That's it! Poster will auto-fetch when you add movies.

### Step 3: Run Locally

#### Option A: Simple HTTP Server (Recommended for Testing)

**Windows (PowerShell):**
```powershell
cd path\to\Watchio
python -m http.server 8000
```

**Mac/Linux:**
```bash
cd path/to/Watchio
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

#### Option B: Using Node.js (if you have it installed)

```bash
npx http-server
```

### Step 4: Test the App

1. Add a test entry (e.g., "Inception", rating 9, type "movie")
2. Verify it appears in the list
3. Try adding multiple entries
4. Test the delete button
5. Refresh the page to confirm data persists

## 🌐 Deploy on Vercel (Free)

### Prerequisites
- GitHub account
- Git installed on your computer

### Deployment Steps

1. **Create a GitHub repository:**
   - Go to [github.com/new](https://github.com/new)
   - Name it `watchio`
   - Do NOT initialize with README
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   cd path\to\Watchio
   git init
   git add .
   git commit -m "Initial commit: Watchio app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/watchio.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" (or "Continue with GitHub")
   - Click "New Project"
   - Import your GitHub repository
   - Leave all settings as default (it will auto-detect this is a static site)
   - Click "Deploy"

4. **Your app is live!**
   - Vercel will give you a URL like `https://watchio-xxxx.vercel.app`
   - Share this link anywhere!

### Update Your Domain (Optional)

In Vercel project settings, you can add a custom domain to replace the default URL.

## 📁 Project Structure

```
Watchio/
├── index.html           # Form avanzato e lista con controlli
├── style.css            # Dark mode con responsive design
├── app.js               # Logica completa: filtri, sort, calcoli
├── DATABASE_SETUP.sql   # Schema database aggiornato
├── MIGRATION.md         # Istruzioni per aggiornare vecchio database
├── SETUP_CHECKLIST.md   # Checklist di configurazione
├── README.md            # Questo file
└── .gitignore           # File da escludere da Git
```

## 🔧 How It Works

- **Frontend**: Vanilla JavaScript sends requests to Supabase
- **Backend**: Supabase PostgreSQL database stores all data
- **Authentication**: None required (public access with RLS policies)
- **Real-time**: Data updates instantly when you add/delete items

## 🛡️ Security Notes

This app uses Supabase's Row Level Security (RLS) policies to allow anonymous access. For a production app with user data, you would:

1. Enable authentication (email, OAuth, etc.)
2. Update RLS policies to restrict access by user
3. Use the authenticated user ID to segment data

For this personal tracker app, the current setup is fine.

## 📱 Features Explained

### Form di Inserimento Avanzato

**Informazioni Base:**
- Titolo del film/serie
- Tipo (Film o Serie)

**5 Voti Dettagliati (1-10):**
- **Voto Inizio**: Come hai sentito l'inizio?
- **Voto Fine**: Come ti è piaciuto il finale?
- **Voto Tecnico**: Qualità di regia, fotografia, montaggio
- **Voto Sceneggiatura**: Qualità della trama e dialoghi
- **Voto Attori**: Qualità delle recitazioni

**Voto Finale Automatico**: Media dei 5 voti

**Campi Aggiuntivi:**
- Personaggio preferito (opzionale)
- "Lo risiguarderebbe?" (checkbox)
- URL copertina (opzionale o ricerca automatica)

### Lista con Ricerca e Filtri

**Ricerca:**
- Digita il titolo per filtrare istantaneamente

**Ordinamento:**
- Più recenti (predefinito)
- Voto finale (alto → basso)
- Voto finale (basso → alto)
- Titolo (A → Z)

**Filtri:**
- Per tipo (Film/Serie)
- Per "risiguarderebbe" (Sì/No)

**Visualizzazione Elemento:**
- Copertina (se disponibile)
- Titolo in primo piano
- Badge tipo (🎬 Film / 📺 Serie)
- Voto finale con stelle
- Dettagli dei 5 voti
- Personaggio preferito (se inserito)
- Badge "Lo risiguarderebbe" (se sì)
- Data di inserimento
- Pulsante elimina

## 🎨 Customization

### Cambia i Colori
Modifica le variabili CSS in `style.css`:
```css
:root {
    --accent: #3b82f6;        /* Blu per bottoni */
    --danger: #ef4444;        /* Rosso per delete */
    --success: #10b981;       /* Verde per badge */
    --bg-dark: #0f172a;       /* Sfondo scuro */
    --rating-gold: #fbbf24;   /* Oro per voti */
}
```

### Cambia il Numero di Voti
Se vuoi aggiungere/rimuovere voti:
1. Aggiungi/rimuovi colonne nel database (DATABASE_SETUP.sql)
2. Aggiungi/rimuovi input nel form (index.html)
3. Modifica `calculateRating()` in app.js
4. Aggiorna `createItemElement()` per visualizzare i voti

### Cambia la Ricerca di Copertine
La funzione `fetchPosterUrl()` in app.js cerca online. Puoi:
- Usare un'altra API (OMDb, TMDb, etc.)
- Disabilitarla tornando `null` sempre
- Permettere solo URL manuali

## 🐛 Troubleshooting

### "Unknown table 'movies'"
→ Non hai ancora creato la tabella. Esegui il SQL da DATABASE_SETUP.sql in Supabase.

### "Invalid API key"
→ Verifica che SUPABASE_URL e SUPABASE_ANON_KEY siano corretti in `app.js`.

### La ricerca per titolo non funziona
→ Verifica che li hai digitato nel campo di ricerca. La ricerca è case-insensitive.

### I voti non si calcolano
→ Assicurati di riempire TUTTI i 5 voti. Se lascierai uno vuoto, il calcolo potrebbe non essere corretto.

### Le copertine non vengono scaricate automaticamente
→ È normale! L'API di ricerca è limitata. Puoi:
  - Incollare manualmente un URL di immagine
  - Disabilitare la ricerca automatica in `app.js`

### Il filtro "Risiguarderebbe" non funziona
→ Assicurati di aver selezionato "Sì" o "No" dal dropdown dei filtri.

### Dopo l'aggiornamento, i vecchi film non sono più visibili
→ Se avevi già film nel database, vedi il file `MIGRATION.md` per trasferirli.

### App locale va bene, ma non funziona su Vercel
→ Verifica che le credenziali Supabase in `app.js` siano corrette per entrambi i casi.
→ Supabase blocca i domini non autorizzati? Aggiungi il tuo dominio Vercel alle impostazioni CORS di Supabase.

## 📚 Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [JavaScript fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Vercel Deployment](https://vercel.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 📄 License

Free to use and modify for personal projects.

---

**Questions?** Check the troubleshooting section above or review the inline code comments in `app.js`.

Enjoy tracking your movies and series! 🍿🎬
