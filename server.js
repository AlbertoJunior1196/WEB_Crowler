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
async function obterTodosLivros(url){
    var Todos=[];
    var data=[];
    var pagina=0;
    var busca=true;
    while(busca){
        const dados= await fetch(url+`?page=${pagina.toString()}&pageSize=50`);
        data=await dados.json();
        console.log(data);
        if(data.length>0)
            sentDataBook(preparar_books(data));
        Todos=Todos.concat(data);
        pagina++;
        console.log(pagina)
        if(data.length==0){
            busca=false;
        }
    }
    return Todos;
} 
async function obterTodosHouses(url){
    var Todos=[];
    var data=[];
    var pagina=0;
    var busca=true;
    while(busca){
        const dados= await fetch(url+`?page=${pagina.toString()}&pageSize=50`);
        data=await dados.json();
        console.log(data);
        if(data.length>0)
            sendDataHouses(preparar_houses(data));
        Todos=Todos.concat(data);
        pagina++;
        console.log(pagina)
        if(data.length==0){
            busca=false;
        }
    }
    return Todos;
} 
async function obterTodoscharacters(url){
    var Todos=[];
    var data=[];
    var pagina=0;
    var busca=true;
    while(busca){
        const dados= await fetch(url+`?page=${pagina.toString()}&pageSize=50`);
        data=await dados.json();
        console.log(data);
        if(data.length>0)
            sendDataCharacters(preparar_characters(data));
        Todos=Todos.concat(data);
        pagina++;
        console.log(pagina)
        if(data.length==0){
            busca=false;
        }
    }
    return Todos;
} 
async function scrawlData(){
    const json_books= obterTodosLivros('https://www.anapioficeandfire.com/api/books');
    const json_characters=obterTodoscharacters('https://www.anapioficeandfire.com/api/characters');
    const json_houses= obterTodosHouses('https://www.anapioficeandfire.com/api/houses');;

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
  console.log("enviei");
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

function obtemEstatisticas(books,houses,charactrers){
    var numeroLivros=books.length;
    var livroComMaicharateres=ObtemLivroComMaisCharacters(books);
    var numeroHouses=houses.length;
    var numerocharacters=charactrers.length;
    var numcharateresMasculino;
    var numcharactersFeminino;
}
function ObtemLivroComMaisCharacters(books){
    var numCharacter=books[0].characters.length;
    var livro;
    for(i=1;i<books.length;i++){
        if(books[i].characters.length>numCharacter){
            livro=books[i];
            numCharacter=books[i].characters.length;
        }
    }
    return books;
}
function ObtemCharateresMasculinos(characters){
    var numMasc=0;
    characters.forEach(function(element){
        if(element.gender=="Male")
        numMasc++;
    })
    return numMasc;
}
function ObtemCharateresFemininos(characters){
    var numMasc=0;
    characters.forEach(function(element){
        if(element.gender=="Male")
        numMasc++;
    })
    return numMasc;
}
/*----------------------------*/
scrawlData();  