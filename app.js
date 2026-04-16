// ============== SUPABASE CONFIGURATION ==============
const SUPABASE_URL = 'https://jtqgvgjvewoloveyrnln.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWd2Z2p2ZXdvbG92ZXlybmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjA4MzEsImV4cCI6MjA5MTkzNjgzMX0.MzjwHlzDgh223DACNzDLb403-YcB5jBdpnrQk_E1xNc';

// ============== TMDB API CONFIGURATION ==============
// Ottieni la chiave gratuita da: https://www.themoviedb.org/settings/api
// Clicca "Sign Up" → Crea account gratuito → Copia "API Read Access Token (v4)"
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjIxZTZkZGFmNDYxMzdiMGQyZjJjZGQxNTg5ODk4ZiIsIm5iZiI6MTc3NjM3MDY1Ni45OTMsInN1YiI6IjY5ZTE0M2UwNmM4ZTUzMmI3OGNiMTQ4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1u2ZP1QuKgsiXnJQUCbsn6FhFNtkzNo-d4dv7PM5MeE';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============== STATE ==============
let allItems = [];

// ============== DOM ELEMENTS ==============
const form = document.getElementById('addForm');
const titleInput = document.getElementById('title');
const typeInput = document.getElementById('type');
const votoInizioInput = document.getElementById('votoInizio');
const votoFineInput = document.getElementById('votoFine');
const votoTecnicoInput = document.getElementById('votoTecnico');
const votoSceneggiaturaInput = document.getElementById('votoSceneggiatura');
const votoAttoriInput = document.getElementById('votoAttori');
const personaggioInput = document.getElementById('personaggio');
const risiguarderebbe = document.getElementById('risiguarderebbe');

const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const filterType = document.getElementById('filterType');
const filterRisiguarda = document.getElementById('filterRisiguarda');

const itemsList = document.getElementById('itemsList');
const successMessage = document.getElementById('success');
const errorMessage = document.getElementById('error');
const loadingMessage = document.getElementById('loading');

// ============== EVENT LISTENERS ==============
form.addEventListener('submit', handleAddItem);
searchInput.addEventListener('input', applyFiltersAndSort);
sortSelect.addEventListener('change', applyFiltersAndSort);
filterType.addEventListener('change', applyFiltersAndSort);
filterRisiguarda.addEventListener('change', applyFiltersAndSort);

// ============== INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndDisplayItems();
});

// ============== FETCH ALL ITEMS ==============
async function fetchAndDisplayItems() {
    showLoading(true);
    try {
        const { data, error } = await supabaseClient
            .from('movies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        
        allItems = data || [];
        applyFiltersAndSort();
        showLoading(false);
    } catch (error) {
        showError('Errore nel caricamento dei film: ' + error.message);
        showLoading(false);
    }
}

// ============== FILTER AND SORT ==============
function applyFiltersAndSort() {
    let filtered = [...allItems];
    
    // Search by title
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by type
    if (filterType.value) {
        filtered = filtered.filter(item => item.type === filterType.value);
    }

    // Filter by risiguarderebbe
    if (filterRisiguarda.value !== '') {
        const boolValue = filterRisiguarda.value === 'true';
        filtered = filtered.filter(item => item.risiguarderebbe === boolValue);
    }

    // Sort
    switch (sortSelect.value) {
        case 'recent':
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'rating-desc':
            filtered.sort((a, b) => calculateRating(b) - calculateRating(a));
            break;
        case 'rating-asc':
            filtered.sort((a, b) => calculateRating(a) - calculateRating(b));
            break;
        case 'title':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    displayItems(filtered);
}

// ============== CALCULATE AVERAGE RATING ==============
function calculateRating(item) {
    const votes = [
        item.voto_inizio,
        item.voto_fine,
        item.voto_tecnico,
        item.voto_sceneggiatura,
        item.voto_attori
    ].filter(v => v !== null && v !== undefined);
    
    if (votes.length === 0) return 0;
    return votes.reduce((a, b) => a + b, 0) / votes.length;
}

// ============== DISPLAY ITEMS ==============
function displayItems(items) {
    itemsList.innerHTML = '';

    if (items.length === 0) {
        itemsList.innerHTML = '<div class="empty-state">Nessun film trovato. Prova a modificare i filtri!</div>';
        return;
    }

    items.forEach(item => {
        const itemElement = createItemElement(item);
        itemsList.appendChild(itemElement);
    });
}

// ============== CREATE ITEM ELEMENT ==============
function createItemElement(item) {
    const div = document.createElement('div');
    div.className = 'item';

    const rating = calculateRating(item);
    const stars = '⭐'.repeat(Math.round(rating));
    
    const dateAdded = new Date(item.created_at).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    let ratingBreakdownHTML = `
        <div class="rating-breakdown">
            <div class="rating-item">
                <strong>Inizio:</strong>
                <span>${item.voto_inizio || '-'}</span>
            </div>
            <div class="rating-item">
                <strong>Fine:</strong>
                <span>${item.voto_fine || '-'}</span>
            </div>
            <div class="rating-item">
                <strong>Tecnico:</strong>
                <span>${item.voto_tecnico || '-'}</span>
            </div>
            <div class="rating-item">
                <strong>Sceneggiatura:</strong>
                <span>${item.voto_sceneggiatura || '-'}</span>
            </div>
            <div class="rating-item">
                <strong>Attori:</strong>
                <span>${item.voto_attori || '-'}</span>
            </div>
        </div>
    `;

    let notesHTML = '';
    if (item.personaggio_preferito) {
        notesHTML += `<div class="item-notes"><strong>Personaggio preferito:</strong> ${escapeHtml(item.personaggio_preferito)}</div>`;
    }
    if (item.risiguarderebbe) {
        notesHTML += `<div style="margin-top: 8px;"><span class="risiguarda-badge">✓ rewatch approved</span></div>`;
    }

    const posterHTML = item.poster_url 
        ? `<img src="${item.poster_url}" alt="${escapeHtml(item.title)}" class="item-poster" onerror="this.style.display='none'">`
        : '';

    div.innerHTML = `
        ${posterHTML}
        <div class="item-content">
            <div class="item-title">${escapeHtml(item.title)}</div>
            <div class="item-meta">
                <span class="item-type">${item.type === 'movie' ? '🎬 Film' : '📺 Serie'}</span>
                <span class="item-rating-final">${stars} ${rating.toFixed(1)}/10</span>
                <span style="font-size: 0.85em; color: var(--text-secondary);">${dateAdded}</span>
            </div>
            ${ratingBreakdownHTML}
            ${notesHTML}
        </div>
        <div class="item-actions">
            <button class="btn-danger" onclick="handleDeleteItem(${item.id})">Elimina</button>
        </div>
    `;

    return div;
}

// ============== FETCH POSTER FROM TMDB API ==============
async function fetchPosterUrl(title) {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'INSERISCI_QUI_LA_TUA_CHIAVE_TMDB') {
        console.log('TMDb API key non configurata. Scarica una copertina manualmente.');
        return null;
    }

    try {
        // Cerca il film/serie in TMDb
        const searchUrl = `${TMDB_API_URL}/search/multi?query=${encodeURIComponent(title)}&language=it-IT`;
        
        const response = await fetch(searchUrl, {
            headers: {
                'Authorization': `Bearer ${TMDB_API_KEY}`,
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Errore nella ricerca della copertina');
            return null;
        }

        const data = await response.json();
        
        // Trova il primo risultato con un poster
        const result = data.results?.find(item => item.poster_path);
        
        if (result && result.poster_path) {
            // URL completo della copertina da TMDb
            return `https://image.tmdb.org/t/p/w342${result.poster_path}`;
        }
    } catch (error) {
        console.log('Impossibile recuperare automaticamente la copertina:', error.message);
    }
    
    return null;
}

// ============== ADD NEW ITEM ==============
async function handleAddItem(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const type = typeInput.value;
    const votoInizio = parseInt(votoInizioInput.value);
    const votoFine = parseInt(votoFineInput.value);
    const votoTecnico = parseInt(votoTecnicoInput.value);
    const votoSceneggiatura = parseInt(votoSceneggiaturaInput.value);
    const votoAttori = parseInt(votoAttoriInput.value);
    const personaggio = personaggioInput.value.trim() || null;
    const risiguardebeMark = risiguarderebbe.checked;

    // Validate
    if (!title || !type) {
        showError('Per favore, completa i campi obbligatori');
        return;
    }

    try {
        showLoading(true);

        // Always fetch poster automatically from TMDb
        const posterUrl = await fetchPosterUrl(title);

        // Insert into database
        const { data, error } = await supabaseClient
            .from('movies')
            .insert([{
                title,
                type,
                voto_inizio: votoInizio,
                voto_fine: votoFine,
                voto_tecnico: votoTecnico,
                voto_sceneggiatura: votoSceneggiatura,
                voto_attori: votoAttori,
                personaggio_preferito: personaggio,
                poster_url: posterUrl,
                risiguarderebbe: risiguardebeMark,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) throw error;

        form.reset();
        showError('');
        showSuccess('Voce aggiunta con successo!');

        await fetchAndDisplayItems();

        setTimeout(() => showSuccess(''), 3000);
    } catch (error) {
        showError('Errore nell\'aggiunta della voce: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// ============== DELETE ITEM ==============
async function handleDeleteItem(id) {
    if (!confirm('Sei sicuro di voler eliminare questo film/serie?')) {
        return;
    }

    try {
        showLoading(true);

        const { error } = await supabaseClient
            .from('movies')
            .delete()
            .eq('id', id);

        if (error) throw error;

        showError('');
        showSuccess('Voce eliminata con successo!');

        await fetchAndDisplayItems();

        setTimeout(() => showSuccess(''), 3000);
    } catch (error) {
        showError('Errore nell\'eliminazione della voce: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// ============== UI HELPERS ==============
function showLoading(show) {
    loadingMessage.style.display = show ? 'block' : 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = message ? 'block' : 'none';
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = message ? 'block' : 'none';
}

// ============== SECURITY ==============
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
