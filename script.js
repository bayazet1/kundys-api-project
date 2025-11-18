// Movie database
const movies = {
  'him': {
    title: 'Him',
    rating: '7.8/10',
    year: '2020',
    duration: '1h58',
    genre: 'Drama / Action',
    synopsis: 'In a world torn apart by conflict, one person must rise above their circumstances to become the hero they never knew they could be. A powerful story of redemption and courage.',
    director: 'Elena Rodriguez',
    cast: ['Marcus Thompson', 'Jessica Park', 'David Kumar', 'Lisa Martinez'],
    image: 'img/him.png',
    showtime: 'Today, 23:40',
    location: 'Premier Kazakhstan',
    price: 'from 1600₸'
  },
  'demon-slayer': {
    title: 'Demon Slayer: Infinity Castle',
    rating: '8.5/10',
    year: '2024',
    duration: '2h15',
    genre: 'Action / Adventure / Animation',
    synopsis: 'The epic conclusion to the Demon Slayer saga as Tanjiro and his companions face their ultimate challenge in the mysterious Infinity Castle. A battle that will determine the fate of humanity.',
    director: 'Haruo Sotozaki',
    cast: ['Natsuki Hanae', 'Akari Kito', 'Yoshitsugu Matsuoka', 'Hiro Shimono'],
    image: 'img/demon_slayer.png',
    showtime: 'Today, 21:40',
    location: 'Premier Alatau',
    price: 'from 1200₸'
  },
  'alter': {
    title: 'Alter',
    rating: '7.8/10',
    year: '2020',
    duration: '1h58',
    genre: 'Drama / Action',
    synopsis: 'In a world torn apart by conflict, one person must rise above their circumstances to become the hero they never knew they could be. A powerful story of redemption and courage.',
    director: 'Elena Rodriguez',
    cast: ['Marcus Thompson', 'Jessica Park', 'David Kumar', 'Lisa Martinez'],
    image: 'img/alter.png',
    showtime: 'Today, 21:40',
    location: 'Premier Alatau',
    price: 'from 1200₸'
  },
  'dracula': {
    title: 'Dracula',
    rating: '8.2/10',
    year: '2024',
    duration: '2h05',
    genre: 'Horror / Thriller',
    synopsis: 'A modern retelling of the classic vampire tale. Count Dracula emerges in the contemporary world, bringing ancient terror to modern society in this gripping supernatural thriller.',
    director: 'James Patterson',
    cast: ['Benedict Clarke', 'Emma Stone', 'Tom Hardy', 'Rachel Weisz'],
    image: 'img/dracula.png',
    showtime: 'Today, 23:40',
    location: 'Premier Kazakhstan',
    price: 'from 1600₸'
  },
  'fantastic-four': {
    title: 'The Fantastic Four: First Steps',
    rating: '7.5/10',
    year: '2025',
    duration: '2h20',
    genre: 'Action / Adventure / Sci-Fi',
    synopsis: 'Marvel\'s First Family returns! Watch as four astronauts gain incredible powers after cosmic radiation exposure and must band together to save Earth from an otherworldly threat.',
    director: 'Matt Shakman',
    cast: ['Pedro Pascal', 'Vanessa Kirby', 'Joseph Quinn', 'Ebon Moss-Bachrach'],
    image: 'img/four.png',
    showtime: 'Today, 23:40',
    location: 'Premier Kazakhstan',
    price: 'from 1600₸'
  }
};

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

// Load movie details on movie_page.html
function loadMovieDetails() {
  // Get movie ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  
  // Get movie data
  const movie = movies[movieId];
  
  if (!movie) {
    console.error('Movie not found!');
    return;
  }
  
  // Update page title
  document.title = movie.title + ' | Easymovie';
  
  // Update banner background
  const banner = document.querySelector('.banner');
  if (banner) {
    banner.style.backgroundImage = `url('${movie.image}')`;
  }
  
  // Update movie title
  const titleElement = document.querySelector('.movie-title');
  if (titleElement) {
    titleElement.textContent = movie.title;
  }
  
  // Update details (rating, year, duration)
  const detailsElement = document.querySelector('.details');
  if (detailsElement) {
    detailsElement.innerHTML = `
      <span><i class="star">⭐</i> ${movie.rating}</span>
      <span>📅 ${movie.year}</span>
      <span>⏱️ Time: ${movie.duration}</span>
      <span>📍 ${movie.location}</span>
    `;
  }
  
  // Update genre tag
  const tagElement = document.querySelector('.tag');
  if (tagElement) {
    tagElement.textContent = movie.genre;
  }
  
  // Update synopsis
  const synopsisElement = document.querySelector('.synopsis-text');
  if (synopsisElement) {
    synopsisElement.textContent = movie.synopsis;
  }
  
  // Update director
  const directorElement = document.querySelector('h3 + p');
  if (directorElement) {
    directorElement.textContent = movie.director;
  }
  
  // Update cast
  const castList = document.querySelector('.cast-list');
  if (castList) {
    castList.innerHTML = movie.cast.map(actor => 
      `<span class="cast-pill">${actor}</span>`
    ).join('');
  }
}

// Initialize page on load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fade-out');
  
  // If we're on the movie page, load the movie details
  if (window.location.pathname.includes('movie_page')) {
    loadMovieDetails();
  }
});
