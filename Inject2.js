$(document).ready(function() {
    $("div[class='music-popular__item']").css("background", "#9cddf7").css("border-radius", "10px").css("margin", "10px");

    $("div[class='music-popular__item']").html((index, oldHtml) => {
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
        let songName = e.closest(".music-popular__item").find(".popular-play-name>a").html()
        let artistName = e.closest(".music-popular__item").find(".popular-play-composition>a").html()
        let musicURL = e.closest(".music-popular__item").find(".btn_player>button").attr("data-url")

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