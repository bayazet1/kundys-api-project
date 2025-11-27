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



// Search functionality
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const noveltiesCards = document.querySelectorAll('#Novelties .movie-card');
    const libraryCards = document.querySelectorAll('#Library .movie-card');
    
    // Filter Novelties section
    noveltiesCards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Filter Library section
    libraryCards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Click-based dropdown toggle
const menuIcon = document.querySelector('.menu-icon');
const dropdownContent = document.querySelector('.dropdown-content');

if (menuIcon && dropdownContent) {
  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target)) {
      dropdownContent.classList.remove('show');
    }
  });
}



// User Registration
function registerUser(username, email, password) {
  // Get existing users or create empty array
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Check if user already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    alert('User already exists!');
    return false;
  }
  
  // Add new user
  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password // In real apps, NEVER store plain passwords!
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  alert('Registration successful!');
  return true;
}

// User Login
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Store logged-in user info
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful!');
    window.location.href = 'main_page.html';
    return true;
  } else {
    alert('Invalid credentials!');
    return false;
  }
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Logout
function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.href = 'main_page.html';
}

// Initialize page on load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fade-out');
  
  // If we're on the movie page, load the movie details
  if (window.location.pathname.includes('movie_page')) {
    loadMovieDetails();
  }
  
  // Update auth UI on main page
  const authButtons = document.querySelector('.auth-buttons');
  
  if (isLoggedIn() && authButtons) {
    const user = getCurrentUser();
    // Hide sign up and log in buttons
    const signUpBtn = authButtons.querySelector('.btn.secondary');
    const logInBtn = authButtons.querySelector('.btn.primary');
    
    if (signUpBtn) signUpBtn.style.display = 'none';
    if (logInBtn) logInBtn.style.display = 'none';
    
    // Show username or welcome message
    const welcomeMsg = document.createElement('span');
    welcomeMsg.textContent = `Welcome, ${user.username}`;
    welcomeMsg.style.color = '#000';
    welcomeMsg.style.marginRight = '1rem';
    authButtons.insertBefore(welcomeMsg, authButtons.firstChild);
  }
});

function handleSignup(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  if (registerUser(username, email, password)) {
    // Auto-login after successful registration
    loginUser(email, password);
  }
}

function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  loginUser(email, password);
}

// Filter functionality
function toggleFilter() {
  const filterPanel = document.getElementById('filterPanel');
  filterPanel.classList.toggle('show');
}

function applyFilters() {
  const noveltiesCards = document.querySelectorAll('#Novelties .movie-card');
  
  // Get selected genres
  const selectedGenres = Array.from(document.querySelectorAll('.filter-section input[type="checkbox"]:checked'))
    .map(cb => cb.value);
  
  // Get selected price range
  const selectedPrice = document.querySelector('.filter-section input[name="price"]:checked').value;
  
  // Filter each card
  noveltiesCards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    const priceText = card.querySelector('.price').textContent;
    const priceValue = parseInt(priceText.match(/\d+/)[0]);
    
    // Determine genre based on movie title (you can improve this by adding data-genre attribute)
    let movieGenres = [];
    if (title.includes('him') || title.includes('alter')) {
      movieGenres = ['action', 'drama'];
    } else if (title.includes('demon')) {
      movieGenres = ['action', 'adventure', 'animation'];
    } else if (title.includes('dracula')) {
      movieGenres = ['horror'];
    } else if (title.includes('fantastic')) {
      movieGenres = ['action', 'adventure', 'sci-fi'];
    }
    
    // Check genre filter
    let genreMatch = selectedGenres.length === 0 || 
                     selectedGenres.some(genre => movieGenres.includes(genre));
    
    // Check price filter
    let priceMatch = true;
    if (selectedPrice === 'low') {
      priceMatch = priceValue < 1500;
    } else if (selectedPrice === 'high') {
      priceMatch = priceValue >= 1500;
    }
    
    // Show or hide card
    if (genreMatch && priceMatch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function clearFilters() {
  // Uncheck all checkboxes
  document.querySelectorAll('.filter-section input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Reset price to "all"
  document.querySelector('.filter-section input[value="all"]').checked = true;
  
  // Show all cards
  const noveltiesCards = document.querySelectorAll('#Novelties .movie-card');
  noveltiesCards.forEach(card => {
    card.style.display = 'block';
  });
}