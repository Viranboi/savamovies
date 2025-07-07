// Load movies grouped by category
async function loadMovies() {
  const q = document.getElementById('searchBox').value.trim();
  const selectedCategory = document.getElementById('categoryFilter').value;

  let url = '/api/movies/search?q=' + encodeURIComponent(q) + '&category=' + encodeURIComponent(selectedCategory);
  if (!q && !selectedCategory) url = '/api/movies';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch movies');
    const movies = await res.json();

    const container = document.getElementById('categories');
    container.innerHTML = '';

    if (movies.length === 0) {
      container.innerHTML = '<p style="text-align:center; font-size:1.2rem; color:#999">No movies found.</p>';
      return;
    }

    // Group movies by category
    const grouped = {};
    for (const movie of movies) {
      if (!grouped[movie.category]) grouped[movie.category] = [];
      grouped[movie.category].push(movie);
    }

    for (const category in grouped) {
      const section = document.createElement('div');
      section.className = 'category-section';

      const title = document.createElement('h2');
      title.className = 'category-title';
      title.textContent = category;

      const row = document.createElement('div');
      row.className = 'movie-row';

      for (const movie of grouped[category]) {
        const card = document.createElement('div');
        card.className = 'movie';

        const thumb = document.createElement('img');
        thumb.src = movie.thumbnail_link;
        thumb.alt = movie.name;
        thumb.className = 'thumbnail';

        const name = document.createElement('h3');
        name.textContent = movie.name;

        card.appendChild(thumb);
        card.appendChild(name);

        // On click, open video in new tab
        thumb.onclick = () => {
          window.open(movie.video_link, '_blank');
        };

        row.appendChild(card);
      }

      section.appendChild(title);
      section.appendChild(row);
      container.appendChild(section);
    }

    // Update hero section with latest movie
    const latest = movies[movies.length - 1];
    const hero = document.getElementById('hero');
    hero.style.backgroundImage = `url('${latest.thumbnail_link}')`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
    hero.style.backgroundRepeat = 'no-repeat';
    document.getElementById('heroTitle').textContent = latest.name;
    document.getElementById('heroDescription').textContent = latest.description;

  } catch (err) {
    console.error(err);
    document.getElementById('categories').innerHTML = '<p>Error loading movies.</p>';
  }
}

// Comments and reply features removed since they're not used with direct links
// You can add them back later if needed

window.onload = loadMovies;
