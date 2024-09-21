$(document).ready(function() {
    $("td[class='artist-title']").closest("tr").css("background", "#9cddf7").css("border-radius", "10px").css("margin", "10px");

    $("td[class='artist-title']").html((index, oldHtml) => {
        return oldHtml + "<button class = 'addBtn' title='Добавить в свой плейлист'></button>"
    })


    function addToJsonArray(obj) {
        chrome.storage.local.get(['jsonArray'], (result) => {
            const jsonArray = result.jsonArray || [];
            const jsonString = JSON.stringify(obj)
            jsonArray.push(jsonString)

            chrome.storage.local.set({ jsonArray }, () => {
                console.log("Добавлен в ", jsonString)
            })
        })
    }

    function getInfoFromClick(e) {
        let songInfo = e.closest(".item-song").find("td[class^='play']").attr("data-title").split(" - ")
        let songName = songInfo[1]
        let artistName = songInfo[0]
        let musicURL = "https://rux.muzmo.cc" + e.closest(".item-song").find("td[class^='play']").attr("data-file")


        let obj = {}
        obj.songName = songName
        obj.artistName = artistName
        obj.musicURL = musicURL
        return obj
    }



    $(".addBtn").on("click", function(e) {
        let songObj = getInfoFromClick($(this))
        addToJsonArray(songObj)

        //alert(json)
    })


})