let movies = [];


function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('movies'));

}

function saveTolocalStorage() {
  localStorage.setItem('movies',JSON.stringify(movies));
}

function Movie(name ,category, issue ) {
  this.name = name;
  this.category = category;
  this.issue = issue;
  movies.push(this);
}

Movie.prototype.renderMovieRow = function (id ){
  let tableEl = document.getElementsByTagName('table')[0];
  if (!tableEl){
    renderTableHeader();
    tableEl = document.getElementsByTagName('table')[0];
  }


  const trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  const tdEl = document.createElement('td');
  tdEl.innerHTML = `<a onclick= "del(${id})">x</a>`;
  trEl.appendChild(tdEl);
  const tdEl2 = document.createElement('td');
  tdEl2.textContent = this.name;
  trEl.appendChild(tdEl2);
  const tdEl3 = document.createElement('td');
  tdEl3.innerHTML = `<img src="./img/${this.category.toLowerCase()}.png" alt="${this.category}">`;
  trEl.appendChild(tdEl3);
  const tdEl4 = document.createElement('td');
  tdEl4.textContent = this.issue;
  trEl.appendChild(tdEl4);
};

function renderAllTable(){
  clearTable();
  renderTableHeader();
  renderAllMovie();
}

function clearTable() {
  const tableSectionEl = document.getElementById('tablecontainer');
  tableSectionEl.innerHTML = '';
}

function renderTableHeader() {
  const tableSectionEl = document.getElementById('tablecontainer');
  const tableEl = document.createElement('table');
  tableSectionEl.appendChild(tableEl);
  const trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  const thEl = document.createElement('th');
  thEl.textContent = '#';
  trEl.appendChild(thEl);
  const thEl2 = document.createElement('th');
  thEl2.textContent = 'Image';
  trEl.appendChild(thEl2);
  const thEl3 = document.createElement('th');
  thEl3.textContent = 'name';
  trEl.appendChild(thEl3);
  const thEl4 = document.createElement('th');
  thEl4.textContent = 'issue';
  trEl.appendChild(thEl4);
}

function renderAllMovie() {
  for (let i in movies) {
    movies[i].renderMovieRow();
  }
}

function del (id) {
  movies.splice(id,1);
  saveTolocalStorage();
  if(movies.length > 0){
    renderAllTable();
  }else {
    clearTable();
  }
}

function createObjects(){
  let movielist = getFromLocalStorage() || [];
  if( movielist.length > 0){
    for( let i in movielist){
      new Movie(movielist[i].name, movielist[i].category, movielist[i].issue);

    }
  }
}

function init() {
  createObjects();
  if(movies.length > 0 ) {
    renderAllTable();
  }
}

function handleSubmit(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let category = e.target.category.value;
  let issue = e.target.issue.value;
  let newmovie = new Movie (name,category,issue);
  newmovie.renderMovieRow(movies.length - 1);
  saveTolocalStorage();
  e.target.reset();
}

function handleClear() {
  localStorage.removeItem( 'movies');
  clearTable;
}

const formEl = document.getElementById('form');
formEl.addEventListener('submit', handleSubmit);

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', handleClear);

init();
