// handler here 
const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('button-search');
const bookContainer = document.getElementById('book-container');
const searchResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error');

searchBtn.addEventListener('click',function(){
    const search = searchField.value;

    // for empty search 
    if (search === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    if(search !==""){
        errorDiv.innerText = '';
    }

    // clear data 
    searchField.value = '';
    bookContainer.innerHTML = '';
    searchResult.innerText = '';

    // fetch er jonn
    const url =`https://openlibrary.org/search.json?q=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => bookReview(data.docs))
})


const bookReview = books => {
    // search result show here 
    let result = books.length;
    if(result === 0){
        searchResult.innerText = `Result not found`;
        return;
    };
    if(0 < result < 100){
        searchResult.innerText = `search result : ${result}`;
    };
    
    // book card here 
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
            <div class="card h-75">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" style="weight: 50" alt="...">
                <div class="card-body">
                <h5 class="card-title">Book name : ${book.title}</h5>
                <h6> Author name : ${book.author_name}</h6>
                <h6> publisher name : ${book.publisher[0]}</h6>
                <h6> First publish year : ${book.first_publish_year}</h6>
                
            </div>
        `
        bookContainer.appendChild(div);
   });     
}