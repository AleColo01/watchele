# 📊 Guida alle Nuove Funzionalità

Watchio è stato completamente aggiornato con molte nuove funzioni richieste! Ecco una guida completa.

## 🎬 FORM MIGLIORATO

### 5 Voti Dettagliati

Ora puoi inserire 5 voti separati per ogni film/serie:

**1. Voto Inizio (1-10)**
- Come hai sentito l'apertura?
- Prima impressione, hook iniziale
- Esempio: 7 = inizio lento ma interessante

**2. Voto Fine (1-10)**
- Come ti è piaciuto il finale?
- Soddisfazione della conclusione
- Esempio: 9 = finale sorprendente e commovente

**3. Voto Tecnico (1-10)**
- Regia, fotografia, montaggio
- Aspetti produttivi
- Esempio: 8 = cinematografia bellissima

**4. Voto Sceneggiatura (1-10)**
- Trama, dialoghi, scrittura
- Qualità della storia
- Esempio: 9 = storia avvincente, dialoghi naturali

**5. Voto Attori (1-10)**
- Qualità delle recitazioni
- Charisma e connessione emotiva
- Esempio: 10 = cast perfetto, ognuno nella parte giusta

### Voto Finale Automatico
Il voto finale è la **media** dei 5 voti:
```
Voto Finale = (Inizio + Fine + Tecnico + Sceneggiatura + Attori) / 5
```

Viene mostrato in **oro** con le stelle (⭐⭐⭐...)

## 📌 CAMPI AGGIUNTIVI

### Personaggio Preferito (Opzionale)
Ricorda quale personaggio ti ha colpito di più:
- "Tony Stark"
- "Ellen Ripley"
- "Walter White"
- Lascia vuoto se non ce n'è uno particular

### Lo Risiguarderebbe? (Checkbox)
Semplice sì/no:
- ✓ = Sì, lo rivederesti volentieri
- □ = No, una volta basta

Utile per identificare i tuoi film preferiti!

### Copertina (Opzionale)
- **Automatica**: Se configuri la chiave TMDb (gratuita), cerca online automaticamente
- **Manuale**: Puoi incollare manualmente l'URL di un'immagine
- Sarà visualizzata come miniatura nella lista

**Come configurare la ricerca automatica:**
1. Vai a https://www.themoviedb.org/settings/api
2. Clicca "Sign Up" → Crea account gratuito (email + password)
3. Verifica email
4. Copia la chiave "API Read Access Token (v4)"
5. Incollala in `app.js` al posto di `INSERISCI_QUI_LA_TUA_CHIAVE_TMDB`

## 🔍 RICERCA E FILTRI

### Campo Ricerca
```
Digita il titolo → Mostra solo film che lo contengono
```
- Case-insensitive (non importa maiuscole/minuscole)
- Aggiorna in tempo reale mentre digiti

### Ordinamento (Sort)
Scegli come ordinare la lista:

1. **Più Recenti** (predefinito)
   - Film/serie aggiunti per ultimi in alto

2. **Voto (Alto → Basso)**
   - Voto finale più alto in alto
   - I tuoi preferiti in primo piano

3. **Voto (Basso → Alto)**
   - Inverso del precedente
   - Vedi cosa non ti è piaciuto

4. **Titolo (A → Z)**
   - Ordine alfabetico
   - Facile trovare un film specifico

### Filtri
Puoi combinare i filtri:

**Tipo:**
- Tutti (default)
- Film (solo film)
- Serie (solo serie)

**Risiguarderebbe:**
- Tutti (default)
- Sì (solo film che risiguarderebbe)
- No (solo film guardati una volta)

Esempio di combo: "Film" + "Sì" + "Voto Alto" = I tuoi film preferiti!

## 🎥 VISUALIZZAZIONE ELEMENTO

Quando guardi un film nella lista, vedi:

```
[Copertina]  Titolo Bellissimo
             🎬 Film  ⭐⭐⭐⭐⭐ 8.4/10  16/04/2026
             
             Voto Inizio:        8
             Voto Fine:          9
             Voto Tecnico:       8
             Voto Sceneggiatura: 8
             Voto Attori:        8
             
             Personaggio preferito: Tony Stark
             ✓ Lo risiguarderebbe
             
             [Elimina]
```

## 💡 CASI D'USO PRATICI

### Trovare Film da Risguardare
1. Filtra tipo: "Film"
2. Filtra risiguarderebbe: "Sì"
3. Ordina per: "Voto Alto → Basso"
4. → Vedi i tuoi film migliori da rivederee!

### Analizzare Preferenze
Aggiungi 5 voti diversi e vedi quale voto hai più alto:
- Se il voto tecnico è sempre 9 ma sceneggiatura 6 → ami il cinema d'autore, meno la trama
- Se voto attori è 10 ma tecnico 5 → ami gli attori, meno visivo

### Cercare un Titolo Specifico
1. Digita nella ricerca
2. Appare istantaneamente
3. Consulta i tuoi voti precedenti

## 🔧 SUGGERIMENTI D'USO

**Consiglio 1: Sii Coerente**
- Decidi una scala mentale prima di iniziare
- Es: 1-3 = scarso, 4-6 = nella media, 7-10 = buono

**Consiglio 2: Sfrutta i 5 Voti**
- Non trascinarli a caso per avere una media alta
- Se un aspetto non ti piace, mettiti voto basso sincero
- La media automatica farà il lavoro

**Consiglio 3: Personaggio Preferito**
- Ricorda qual era il tuo personaggio favorito
- Negli anni ripensandoci, utile ricordare dettagli

**Consiglio 4: Filtra Prima, Ordina Poi**
- Filtra quello che vuoi (es. "Film rivedibili")
- Poi ordina (es. "Voto alto")
- Sei più efficiente

## 🚀 PROSSIMI MIGLIORAMENTI POSSIBILI

Vuoi aggiungere altri campi? Facile:
- **Anno di uscita**: per catalogare
- **Durata**: per scegliere cosa guardare
- **Genere**: per filtrare per categoria
- **Voto pubblico**: il voto medio IMDb a confronto
- **Note personali**: una recensione breve

(Chiedi se vuoi implementare questi!)

---

Buon divertimento nel tracciare i tuoi film! 🍿🎬
