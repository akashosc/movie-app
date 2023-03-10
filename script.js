const API_KEY="api_key=d92331e8e6d683447ab4aa0779a7286f";
const BASE_URL="https://api.themoviedb.org/3";
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL="https://image.tmdb.org/t/p/w500";
const searchUrl=BASE_URL+'/search/movie?'+API_KEY;
getMovies(API_URL);
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
function getMovies(url){
     fetch(url).then(res=>res.json()).then(data=>{
        console.log(data);
        showMovies(data.results);
     })
}

function showMovies(data){
    main.innerHTML='';
    data.forEach(movie => {
        const{title,poster_path,overview,vote_average}=movie;
        const movieEle=document.createElement('div');
    movieEle.classList.add('movie');
    movieEle.innerHTML=`<img src="${IMG_URL+poster_path}" alt="${title}">
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${gatColor(vote_average)}">${vote_average}</span>
    </div>
     <div class="overview">
       <h3>Overview</h3>
         ${overview}
     </div>`
     main.appendChild(movieEle);    
    });

    
}


function gatColor(value){
    if(value>=8){
       return 'green';
    }else if(value>=5){
        return 'orange';
    }else{
        return 'red';
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchterm=search.value;
    if(searchterm){
        getMovies(searchUrl+'&query='+searchterm);
    }else{
        getMovies(API_URL);
    }
})











