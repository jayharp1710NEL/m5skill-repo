// Verwijzingen naar de DOM-elementen die we steeds opnieuw vullen
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

const nameEl = document.getElementById("name");
const typesEl = document.getElementById("types");
const imageEl = document.getElementById("image");
const statItems = document.querySelectorAll(".stat"); // de 6 vaste li's
const movesEl = document.getElementById("moves");

// Pokemon ophalen uit de PokeAPI
async function fetchPokemon(search) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);

    if (!response.ok) {
        alert(`Geen pokemon gevonden voor "${search}"`);
        return;
    }

    const data = await response.json();
    showPokemon(data);
}

// We maken geen nieuwe HTML-structuur aan, we passen alleen de content aan
function showPokemon(pokemon) {
    // Naam
    nameEl.textContent = pokemon.name;

    // Afbeelding
    imageEl.src = pokemon.sprites.other["official-artwork"].front_default
        || pokemon.sprites.front_default;
    imageEl.alt = pokemon.name;

    // Types
    typesEl.innerHTML = "";
    for (const entry of pokemon.types) {
        const span = document.createElement("span");
        span.classList.add("type", `type-${entry.type.name}`);
        span.textContent = entry.type.name;
        typesEl.appendChild(span);
    }

    // Stats: we vullen de 6 bestaande li's, we maken ze niet opnieuw aan
    pokemon.stats.forEach((entry, index) => {
        const li = statItems[index];
        li.innerHTML =
            `<span class="stat-name">${formatName(entry.stat.name)}</span>` +
            `<span>${entry.base_stat}</span>`;
    });

    // Moves (die de pokemon via level up kan leren)
    movesEl.innerHTML = "";
    const levelUpMoves = pokemon.moves.filter((entry) =>
        entry.version_group_details.some(
            (detail) => detail.move_learn_method.name === "level-up"
        )
    );

    for (const entry of levelUpMoves) {
        const li = document.createElement("li");
        li.textContent = entry.move.name;
        movesEl.appendChild(li);
    }
}

// Maakt van "special-attack" -> "Special-Attack" en "hp" -> "Hp"
function formatName(text) {
    return text
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-");
}

// Zoeken bij het versturen van het formulier
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const search = input.value.trim();
    if (search) {
        fetchPokemon(search);
    }
});

// Bij het laden meteen een pokemon tonen
fetchPokemon(input.value);
