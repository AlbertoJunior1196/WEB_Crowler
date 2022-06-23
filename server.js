import { json } from 'express';
import fetch from 'node-fetch';



/*async function start() {

const res = await fetch('https://www.anapioficeandfire.com/api/books');

const json = await res.json();

console.log(json);

}

start();
*/
function preparar_books(data){
    
    var arr_Books=[];
    data.forEach(element => {
        arr_Books.push({
            id_book: element.url.split("/").pop(),
            name_book: element.name,
            isbn: element.isbn,
            authors: element.authors,
            num_pages: element.numberOfPages,
            publisher: element.publisher,
            data_release: element.released,
            characters:extrai_idUrl(element.characters),
        })
    });
   
    return arr_Books;
}
function preparar_characters(data){
    var arr_characters=[];
    data.forEach(element => {
        arr_characters.push({
            id_character: element.url.split("/").pop(),
            name_character: element.name,
            gender:element.gender,
            culture:element.culture,
            titles:element.titles,
            nick_names:element.aliases,
            tv_series:element.tvSeries,
            books:extrai_idUrl(element.books),
        })
    });
   
    return arr_characters;
}
function preparar_houses(data){
    console.log(data);
    var arr_houses=[];
    data.forEach(element => {
        arr_houses.push({
            id_houses: element.url.split("/").pop(),
            name_houses: element.name,
            region:element.region,
            titles:element.titles,
            lord:ObterId(element.currentLord),
            founder: ObterId(element.founder),
            members:extrai_idUrl(element.swornMembers),
        })
    });
    console.log(arr_houses)
    return arr_houses;
} 
async function scrawlData(){
    const data_books= await fetch('https://www.anapioficeandfire.com/api/books');
    const json_books=await data_books.json();
    const data_characters= await fetch('https://www.anapioficeandfire.com/api/characters');
    const json_characters=await data_characters.json();
    const data_houses= await fetch('https://www.anapioficeandfire.com/api/houses');
    const json_houses=await data_houses.json();

    sentDataBook(preparar_books(json_books));
    console.log("------------------------------------->------------------<-------------");
    sendDataCharacters(preparar_characters(json_characters));
    console.log(preparar_characters(json_characters))
    console.log("------------------------------------->------------------<-------------");
    sendDataHouses(preparar_houses(json_houses)); 
}
async function sentDataBook(arr_books){
    const response = await fetch('http://localhost:9000/books', {
    method: 'POST',
    body:JSON.stringify(arr_books), // string or object
    headers: {
      'Content-Type': 'application/json'
    } 
  });
  const resposta = await response;
  console.log(response);
}
async function sendDataHouses(arr_houses){
    const response = await fetch('http://localhost:9000/houses', {
    method: 'POST',
    body:JSON.stringify(arr_houses), // string or object
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
async function sendDataCharacters(arr_characters){
    const response = await fetch('http://localhost:9000/characters', {
    method: 'POST',
    body:JSON.stringify(arr_characters), // string or object
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
/* funções auxiliares */
function ObterId(data){
    if(data.length>0){
        return data.split("/").pop()
    }
    return '';  
}
function extrai_idUrl(data){
    var arr_id=[];
    data.forEach(element=>{
        arr_id.push(element.split("/").pop())
    })
    return arr_id; 
}
/*----------------------------*/
scrawlData();  