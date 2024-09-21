$(document).ready(function(){    
   // C:\Users\Вардан\Desktop\Google Расширения ПРИМЕР\От Мурада 18.09\Chrome_extension_saver 20.01\Chrome_extension_saver 20.01\popup.js
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.style.display="none"
    let albums_Block = document.getElementById('albums_Block');
    albums_Block.style.display="none"
    let albumArr = []
    //alert($('#dataContainer').children().length)
    //C:\Users\Вардан\Desktop\Google Расширения ПРИМЕР\новое\Последняя версия плеера\Chrome_extension_saver 20.01\popup.js
    // Считываем данные из chrome.storage
    chrome.storage.local.get(['jsonArray'], (result) => {
        const jsonArray = result.jsonArray || []; // Если нет, создаем пустой массив
    
        // Отображаем данные в всплывающем окне
        jsonArray.forEach((item, index) => {
            
            let obj = parseJsonToObj(item)
            let div = makeAudioElem(obj)[0]
            // Создаем кнопку для удаления
            const deleteButton = div.querySelector('.delButt');
               
            deleteButton.addEventListener('click', (e) => {
                // Удаляем элемент по индексу
                jsonArray.splice(index, 1); // Удаляем элемент из массива
                //let elem = e.target.closest('container-audio')
                alert(e.target)
                dataContainer.removeChild(e.target.closest(".container-audio"))
                // Сохраняем обновленный массив в chrome.storage
                chrome.storage.local.set({ jsonArray: jsonArray }, () => {
                    console.log(`Элемент "${item}" удален.`);
                    //updateUI(); // Обновляем интерфейс
                });
            });
            //C:\Users\Вардан\Desktop\Google Расширения ПРИМЕР\новое\Последняя версия плеера\Chrome_extension_saver\popup.js
            // Добавляем кнопку в элемент
            
            div.appendChild(deleteButton);
            dataContainer.appendChild(div);
            
        });
        
       
        // if (jsonArray.length === 0) {
        //     // Выводим сообщение, если данных нет
        //     dataContainer.textContent = "Нет данных";
        // }
        if(dataContainer.children.length>0){

            initAudioPlayer(dataContainer)
        }
    });
    
 
  
  //событие клика на создания нового альбома
$(".createMyPlaylistButt").on("click",function(e){
    let nameAlbum = document.querySelector("#nameAlbum").value
    let albObj = getInfoForAlbum(nameAlbum)
    addToJsonAlbumArray(albObj)
    alert(`Альбом ${nameAlbum} успешно создан`)
    
})
   
function addToJsonAlbumArray(obj) {
    chrome.storage.local.get(['jsonAlbumArray'], (result) => {
        const jsonAlbumArray = result.jsonAlbumArray || [];
        const jsonAlbumString = JSON.stringify(obj)
       
            jsonAlbumArray.push(jsonAlbumString)
    
        chrome.storage.local.set({ jsonAlbumArray }, () => {
            console.log("Создан альбом ", jsonAlbumString)
        })
    })
}

function getInfoForAlbum(albumName,arrSongs=[]) {
    let obj = {}
    obj.album = albumName
    obj.songs = arrSongs
    return obj
}

// $(".addBtn").on("click", function(e) {
//     let albObj = getInfoForAlbum($(this))
//     addToJsonAlbumArray(albObj)
// })

  
  $("#albums_Block").on("click",function(e){
    
    if(e.target.className=="delAlbum"){
        //alert(e.target)
        let nameAlbum = e.target.closest(".albumBlock").querySelector(".albumTitle").innerHTML
        document.querySelector("#albums_Block").removeChild(e.target.closest(".albumBlock"))
       
        alert(`Альбом ${nameAlbum} успешно удален`)
    }
        if(e.target.className=="openAlbum"){
            let elemsAudio = e.target.closest(".albumBlock").querySelector(".album_audioBlock")
            if(elemsAudio.style.visibility == "hidden" || elemsAudio.style.visibility  == ""){
                elemsAudio.style.visibility = "visible";
                elemsAudio.style.display = "block";
            }
            else{
                elemsAudio.style.visibility = "hidden";
                elemsAudio.style.display = "none";
            }
        }
    })

    // $(".openAlbum").on("click",function(e){
    //     let elemsAudio = e.target.closest(".albumBlock").querySelectorAll(".container-audio")
    //     elemsAudio.forEach((elemAudio)=>{
    //         if (elemAudio.style.visibility === "hidden" || elemAudio.style.visibility === "") {
    //             // Если элемент скрыт или значение не установлено, показываем его
    //             elemAudio.style.visibility = "visible";
    //             elemAudio.style.display = "block";
    //         } else {
    //             // Если элемент видим, скрываем его
    //             elemAudio.style.visibility = "hidden";
    //             elemAudio.style.display = "none";
    //         }
    //     })
        
    //  })

//событие клика на окна для просмотра альбомов
$(".open_albumsButt").on("click",function(e){
    albums_Block.replaceChildren()
// Отображаем данные в всплывающем окне
        chrome.storage.local.get(['jsonAlbumArray'], (result) => {
            const jsonAlbumArray = result.jsonAlbumArray || []; // Если нет, создаем пустой массив
            console.log(jsonAlbumArray)
            // Отображаем данные в всплывающем окне
            jsonAlbumArray.forEach((item, index) => {
                console.log(item)
                let obj = parseJsonToObj(item)
                let div = createAlbum(obj)[0]
                // Создаем кнопку для удаления
                const deleteButton = div.querySelector('.delAlbum');
                let openAlbum = div.querySelector(".openAlbum")
                deleteButton.addEventListener('click', (e) => {
                    // Удаляем элемент по индексу
                    jsonAlbumArray.splice(index, 1); // Удаляем элемент из массива
                    //let elem = e.target.closest('container-audio')
                    //alert(e.target)
                    albums_Block.removeChild(e.target.closest(".albumBlock"))
                    // Сохраняем обновленный массив в chrome.storage
                    chrome.storage.local.set({ jsonAlbumArray: jsonAlbumArray }, () => {
                        console.log(`Элемент "${item}" удален.`);
                        //updateUI(); // Обновляем интерфейс
                    });
                });

                openAlbum.addEventListener('click', (e) =>{
                    let elemsAudio = e.target.closest(".albumBlock").querySelector(".album_audioBlock")
                    if(elemsAudio.style.visibility == "hidden" || elemsAudio.style.visibility  == ""){
                        elemsAudio.style.visibility = "visible";
                        elemsAudio.style.display = "block";
                    }
                    else{
                        elemsAudio.style.visibility = "hidden";
                        elemsAudio.style.display = "none";
                    }

                })
                    
                
                //C:\Users\Вардан\Desktop\Google Расширения ПРИМЕР\новое\Последняя версия плеера\Chrome_extension_saver\popup.js
                // Добавляем кнопку в элемент
                             
                albums_Block.appendChild(div);
                
            });
        })

        if($("#albums_Block").css("visibility")=="visible"){
            toHide($("#albums_Block"))
        }
        else if($("#albums_Block").css("visibility")=="hidden"){
            toHide($("#dataContainer"))
            toHide($("#createMyPlaylistWind"))
            toVisible($("#albums_Block"))

        }
    })



//событие клика на окна для создания альбомов
    $(".open_createMyPlaylistButt_wind").on("click",function(e){
        
        if($("#createMyPlaylistWind").css("visibility")=="visible"){
            toHide($("#createMyPlaylistWind"))
        }
        else if($("#createMyPlaylistWind").css("visibility")=="hidden"){
            toHide($("#dataContainer"))
            toHide($("#albums_Block"))
            toVisible($("#createMyPlaylistWind"))

        }
    })


//событие клика на открытии аудиоплеера
    $(".openPlaylistButt").on("click",function(e){
      
        if($("#dataContainer").css("visibility")=="visible"){
            toHide($("#dataContainer"))
            
        }
        else if($("#dataContainer").css("visibility")=="hidden"){
            toHide($("#createMyPlaylistWind"))
            toHide($("#albums_Block"))
            toVisible($("#dataContainer"))
        }
    })
    
   
  
//выбор альбома и добавление песни в него
    $("#dataContainer").on("click",function(e){
         //событие добавления музыки Hв альбом
        if(e.target.className === "intoAlbom_butt"){
            let par = e.target.closest('.container-audio')
            chrome.storage.local.get(['jsonAlbumArray'], (result) => {
                const jsonAlbumArray = result.jsonAlbumArray || [];
                albumArr = []
                jsonAlbumArray.forEach((item, index) => {
                    let obj = parseJsonToObj(item)
                    albumArr.push(obj.album)   
                })
            })
            let selectElem = make_dropdownList(albumArr)[0]
            let hasSelChild = par.querySelector(".selectAlb")
           
            if(hasSelChild){
               //par.removeChild(selectElem)
                //alert("deleted")
                par.removeChild(par.querySelector(".selectAlb"))
            }
            else if(!hasSelChild){
                par.appendChild(selectElem)
                //alert("added")
            }
            
        }
        
        if(e.target.className === "selectAlb"){
            e.target.addEventListener("change", function(){
                let text = this.options[this.selectedIndex].text;
                let par = e.target.closest('.container-audio')
                par.setAttribute("album",text)
                let albums_Block_childrens = document.querySelector("#albums_Block").childNodes
                albums_Block_childrens.forEach(item=>{
                    if(item.className=="albumBlock" && item.querySelector('.album_audioBlock') && item.getAttribute("album")==text){
                        //alert("123")
                        let parClone = par.cloneNode(true);
                        item.querySelector('.album_audioBlock').appendChild(parClone)
                    }
                })
              });
        }
        
    })

 

   function make_dropdownList(arr){
    let array = []
        let select = document.createElement('select')
        select.classList.add("selectAlb")
        for(let i=0;i<arr.length;i++){
            let option = document.createElement('option')
            option.classList.add("optionAlb")
            option.value = arr[i]
            option.innerHTML = arr[i]
            select.appendChild(option)
        }
        array.push(select)
        return array
   }


})
