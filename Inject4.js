$(document).ready(function() {
    $(".track__info").css("background", "#9cddf7").css("border-radius", "10px").css("margin", "10px");

    $(".track__info").html((index, oldHtml) => {
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
        let songName = e.closest("div[class='track__info']").find(".track__title").html()
        let artistName = e.closest("div[class='track__info']").find(".track__desc").html()
        let tmp_str = e.closest("li[class^='tracks__item']").attr("data-musmeta")
        let first_pos = tmp_str.indexOf('url') + 6;
        let last_pos = tmp_str.indexOf('mp3') + 3;
        let tmp_musicURL = tmp_str.substr(first_pos, last_pos - first_pos).replace(/\\\//g, '/');
        let musicURL = tmp_musicURL



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