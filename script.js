// ⚠️ IMPORTANT: Replace this with YOUR actual API key from TMDB
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Navigate to a page with fade effect
function navigateTo(page) {
  document.body.classList.add('fade-out');
  
  setTimeout(() => {
    window.location.href = page + '.html';
  }, 300);
}

// Navigate to movie page with movie ID
function viewMovie(movieId) {
  document.body.classList.add('fade-out');
  
  setTimeout(() => {
    window.location.href = 'movie_page.html?id=' + movieId;
  }, 300);
}

// Fetch popular movies from API
async function fetchPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Fetch movie details by ID
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// Load movies into the main page
async function loadMovies() {
  const moviesGrid = document.querySelector('.movies-section .movies-grid');
  const libraryGrid = document.querySelectorAll('.library .movies-grid');
  
  if (!moviesGrid) return;
  
  // Show loading state
  moviesGrid.innerHTML = '<p style="color: #fff;">Loading movies...</p>';
  
  const movies = await fetchPopularMovies();
  
  if (movies.length === 0) {
    moviesGrid.innerHTML = '<p style="color: #fff;">Failed to load movies. Check your API key.</p>';
    return;
  }
  
  // Clear loading message
  moviesGrid.innerHTML = '';
  
  // Display first 5 movies in Novelties section
  movies.slice(0, 5).forEach(movie => {
    const card = createMovieCard(movie, 'novelty');
    moviesGrid.appendChild(card);
  });
  
  // Display movies in Library section
  if (libraryGrid.length > 0) {
    libraryGrid.forEach((grid, index) => {
      grid.innerHTML = '';
      const startIndex = index * 5;
      movies.slice(startIndex, startIndex + 5).forEach(movie => {
        const card = createMovieCard(movie, 'library');
        grid.appendChild(card);
      });
    });
  }
}

// Create a movie card element
function createMovieCard(movie, type) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.onclick = () => viewMovie(movie.id);
  
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}` 
    : 'img/placeholder.png';
  
  if (type === 'novelty') {
    card.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average.toFixed(1)}/10</p>
      <p class="location">${movie.release_date ? movie.release_date.substring(0, 4) : 'TBA'}</p>
      <p class="price">Watch Now</p>
    `;
  } else {
    card.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Action, Adventure</p>
      <p class="location">⭐ ${movie.vote_average.toFixed(1)}/10</p>
      <p class="price">Watch now!</p>
    `;
  }
  
  return card;
}

// Load movie details on movie_page.html
async function loadMovieDetails() {
  // Get movie ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  
  if (!movieId) {
    console.error('No movie ID provided!');
    return;
  }
  
  // Show loading state
  const titleElement = document.querySelector('.movie-title');
  if (titleElement) {
    titleElement.textContent = 'Loading...';
  }
  
  // Fetch movie data from API
  const movie = await fetchMovieDetails(movieId);
  
  if (!movie) {
    if (titleElement) {
      titleElement.textContent = 'Movie not found!';
    }
    return;
  }
  
  // Update page title
  document.title = movie.title + ' | Easymovie';
  
  // Update banner background
  const banner = document.querySelector('.banner');
  if (banner && movie.backdrop_path) {
    banner.style.backgroundImage = `url('${IMAGE_BASE_URL}${movie.backdrop_path}')`;
  }
  
  // Update movie title
  if (titleElement) {
    titleElement.textContent = movie.title;
  }
  
  // Get runtime in hours and minutes
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const runtimeText = `${hours}h${minutes}m`;
  
  // Update details (rating, year, duration)
  const detailsElement = document.querySelector('.details');
  if (detailsElement) {
    detailsElement.innerHTML = `
      <span><i class="star">⭐</i> ${movie.vote_average.toFixed(1)}/10</span>
      <span>📅 ${movie.release_date ? movie.release_date.substring(0, 4) : 'TBA'}</span>
      <span>⏱️ Time: ${runtimeText}</span>
      <span>📍 ${movie.production_countries[0]?.name || 'International'}</span>
    `;
  }
  
  // Update genre tag
  const tagElement = document.querySelector('.tag');
  if (tagElement && movie.genres && movie.genres.length > 0) {
    const genreNames = movie.genres.map(g => g.name).join(' / ');
    tagElement.textContent = genreNames;
  }
  
  // Update synopsis
  const synopsisElement = document.querySelector('.synopsis-text');
  if (synopsisElement) {
    synopsisElement.textContent = movie.overview || 'No synopsis available.';
  }
  
  // Update director
  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const directorElement = document.querySelector('h3 + p');
  if (directorElement) {
    directorElement.textContent = director ? director.name : 'Unknown';
  }
  
  // Update cast (first 4 actors)
  const castList = document.querySelector('.cast-list');
  if (castList && movie.credits?.cast) {
    const topCast = movie.credits.cast.slice(0, 4);
    castList.innerHTML = topCast.map(actor => 
      `<span class="cast-pill">${actor.name}</span>`
    ).join('');
  }
}

// Initialize page on load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fade-out');
  
  // If we're on the main page, load movies from API
  if (window.location.pathname.includes('main_page') || window.location.pathname.endsWith('/')) {
    loadMovies();
  }
  
  // If we're on the movie page, load the movie details
  if (window.location.pathname.includes('movie_page')) {
    loadMovieDetails();
  }
});