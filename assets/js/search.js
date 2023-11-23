let feed=function(query)
{
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q="+query)
    .then(res=>{
        if(res.ok) return res.json();
    })
    .then(queryData=>{
        let reorderedArr=queryData.data.toSorted((a, b)=> b.rank-a.rank);
        console.log(queryData);
        console.log(reorderedArr);

        document.querySelector(".artist-title").innerHTML=`<h3 class="text-white fw-bold">Risultato più rilevante</h3>`;
        document.querySelector(".popular-songs").innerHTML=`<h3 class="text-white fw-bold">Brani</h3>`;

        document.querySelector("#search-result>div").innerHTML=
        `
            <div class="artist-side-search d-flex flex-column justify-content-around h-100 p-3">
                <img class="rounded-circle align-self-start artist-search-img" src="${queryData.data[0].artist.picture}" alt="">
                <h3 class="text-white fw-bold"><a href="artist.html?artistId=${queryData.data[0].artist.id}" class="text-decoration-none text-white">${queryData.data[0].artist.name}</a></h3>
                <span class="text-white fw-bold">${queryData.data[0].artist.type}</span>
            </div>
        `;

        document.querySelector(".song-side-search").innerHTML="";
        for(let i=0; i<4; i++)
        {
            document.querySelector(".song-side-search").innerHTML+=
            `
                <div class="d-flex justify-content-between align-items-center my-2">
                    <div class="d-flex gap-2 align-items-center">
                        <img src="${reorderedArr[i].album.cover_small}" alt="">
                        <div class="d-flex flex-column">
                            <a class="text-decoration-none text-white">${reorderedArr[i].title}</a>
                            <a href="artist.html?artistId=${reorderedArr[i].artist.id}" class="text-decoration-none text-white-50">${reorderedArr[i].artist.name}</a>
                        </div>
                    </div>

                    <div>
                        <i class="fa-regular fa-heart text-white-50"></i>
                        <span class="text-white-50">${reorderedArr[i].duration}</span>
                    </div>
                </div>
            `;
        }
    })
}

let searchInput=document.getElementById("search");
searchInput.addEventListener("input", ()=>{
    if(searchInput.value!="") feed(searchInput.value);
    else
    {
        document.querySelector(".song-side-search").innerHTML="";
        document.querySelector("#search-result>div").innerHTML="";
        document.querySelector(".artist-title").innerHTML="";
        document.querySelector(".popular-songs").innerHTML="";
    }
})