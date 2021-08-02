



const tBody = document.querySelector("#table-body");
const apiURL = "https://api.covid19api.com/summary";


const fetchData = async function () {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}
fetchData();

const renderData = async function () {
    body = await fetchData();
    console.log(body);
    tBody.innerHTML="";

    for (let i = 0; i < body["Countries"].length; i++) {
        var customCountry = body["Countries"][i];
        var activeCases=customCountry["TotalConfirmed"] - (customCountry["TotalRecovered"] + customCountry["TotalDeaths"]);

        if(activeCases<0){
            activeCases="-";
        }


        tBody.innerHTML += `
        <tr>
        <th scope="row">${customCountry["Country"]}</th>
        <td>${customCountry["TotalConfirmed"]}</td>
        <td>${activeCases}</td>
        <td>${customCountry["TotalRecovered"]}</td>
        <td>${customCountry["TotalDeaths"]}</td>
    </tr>
        `
        console.log(body["Countries"][i]["Country"]);

    }

    $(document).ready(function () {
        $('#data-table').DataTable();
    });

}
renderData();


