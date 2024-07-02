document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const homeLink = document.getElementById('home-link');
    const profileLink = document.getElementById('profile-link');
    const searchLink = document.getElementById('search-link');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const movieList = document.getElementById('movie-list');
    const movieDetails = document.createElement('div');
    movieDetails.id = 'movie-details';
    document.body.appendChild(movieDetails);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileSection = document.getElementById('edit-profile');
    const editProfileForm = document.getElementById('edit-profile-form');
    const newUsernameInput = document.getElementById('new-username');
    const newEmailInput = document.getElementById('new-email');
    const watchlistMovies = document.getElementById('watchlist-movies');
    const reviewsList = document.getElementById('reviews-list');
    const logoutBtn = document.getElementById('logout-btn');

    const movies = [
        { title: 'Inception', image: 'https://rukminim2.flixcart.com/image/850/1000/l27wtjk0/poster/q/m/r/medium-inception-movie-hd-matte-finish-poster-butcutnw9953-original-imagdhvxethajha4.jpeg?q=90&amp;crop=false', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', link: 'https://www.youtube.com/watch?v=YoHD9XEInc0' , link:'https://www.tokyvideo.com/video/inception-movie'},
        { title: 'The Matrix', image: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" , description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', link: 'https://www.youtube.com/watch?v=vKQi3bBA1y8' , link:'https://www.dailymotion.com/video/x8l4y3i'},
        { title: 'Interstellar', image: "https://rukminim2.flixcart.com/image/850/1000/jsxjekw0/poster/p/h/x/medium-interstellar-e-interstellar-movies-poster-for-room-office-original-imafed464espvnzr.jpeg?q=90&amp;crop=false", description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.', link: 'https://www.youtube.com/watch?v=zSWdZVtXT7E' ,link:'https://www.dailymotion.com/video/x7yt452'},
        { title: 'The Dark Knight', image:"https://rukminim2.flixcart.com/image/850/1000/k8xduvk0/poster/j/m/z/medium-the-dark-knight-poster-decorative-wall-poster-wall-d-cor-original-imafqu8evqxuvfvg.jpeg?q=90&amp;crop=false", description: 'Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy.', link: 'https://www.youtube.com/watch?v=EXeTwQWrcwY' ,link:'https://www.youtube.com/playlist?list=PLqYoiTryxh2MKxzlCPl1-OXFD885sgNio'},
        { title: 'Avengers: Endgame', image:"https://m.media-amazon.com/images/I/91hIN+dNYUL.jpg" , description: 'The Avengers assemble once more to undo Thanos’ actions and restore order to the universe.', link: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',link:'https://www.youtube.com/playlist?list=PLfpye402lkmbiuZuwzx8JMKGqmdVm0Jbv' },
        { title: 'Jurassic Park', image:"https://mir-s3-cdn-cf.behance.net/project_modules/hd/f00bf346385235.58520f9022451.jpg" , description: 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.', link: 'https://www.youtube.com/watch?v=lc0UehYemQA' ,link:'https://www.youtube.com/watch?v=RIxAGZFB2FE'},
        { title: 'Titanic', image: "https://images-cdn.ubuy.co.in/634e8a295969a905551ac90d-liqixi-retro-metal-sign-vintage-tin-sign.jpg", description: 'A love story that unfolds during the ill-fated voyage of the RMS Titanic.', link: 'https://www.youtube.com/watch?v=2e-eXJ6HgkQ' ,link:'https://www.youtube.com/watch?v=uTfnXBvfXOI'},
        { title: 'The Lion King', image:"https://m.media-amazon.com/images/I/61SmZNlmpML._AC_UF1000,1000_QL80_.jpg", description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.', link: 'https://www.youtube.com/watch?v=4sj1MT05lAA' ,link:'https://www.twitch.tv/videos/391697961'},
        { title: 'Forrest Gump', image:"https://i.etsystatic.com/23402008/r/il/95ec24/5607149375/il_570xN.5607149375_flx6.jpg", description: 'The story of Forrest Gump, a simple man with a low IQ but good intentions.', link: 'https://www.youtube.com/watch?v=bLvqoHBptjg' ,link:'https://www.youtube.com/playlist?list=PLLWBphTHcHs9JsEYJhddZxj1tcsBwfrpN'},
        { title: 'Gladiator', image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ba264932828071.56955383cb720.jpg", description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', link: 'https://www.youtube.com/watch?v=owK1qxDselE' ,link:'https://www.youtube.com/playlist?list=PLfTV-SQ2oCwOO5HD1pmK6nONtzvIUFHh9'}
    ];

    const fetchMovies = async () => {
        return movies;
    };

    const displayMovies = (movies, container) => {
        container.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            const movieImg = document.createElement('img');
            movieImg.src = movie.image;
            movieImg.alt = movie.title;

            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.title;

            movieDiv.appendChild(movieImg);
            movieDiv.appendChild(movieTitle);
            container.appendChild(movieDiv);

            movieDiv.addEventListener('click', () => {
                showMovieDetails(movie);
            });
        });
    };

    const showMovieDetails = (movie) => {
        movieDetails.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.description}</p>
           
            <a href="${movie.link}" target="_blank">Watch Movie</a>
            <br><br>
            <button id="close-btn">Close</button>
        `;
        movieDetails.style.display = 'block';
        overlay.style.display = 'block';

        document.getElementById('close-btn').addEventListener('click', () => {
            movieDetails.style.display = 'none';
            overlay.style.display = 'none';
        });

        overlay.addEventListener('click', () => {
            movieDetails.style.display = 'none';
            overlay.style.display = 'none';
        });
    };

    const showSection = (sectionId) => {
        sections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    };

    homeLink.addEventListener('click', () => showSection('home'));
    profileLink.addEventListener('click', () => showSection('profile'));
    searchLink.addEventListener('click', () => showSection('search'));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        displayMovies(filteredMovies, searchResults);
    });

    fetchMovies().then(movies => {
        displayMovies(movies, movieList);
    });
});
