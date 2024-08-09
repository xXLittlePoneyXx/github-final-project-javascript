const searchBar = document.getElementById("searchBar");
const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");
const recommendations = document.getElementById("recommendations");

function displayRecommendations(keyword) {
    fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        data[keyword].forEach((recommendation) => {
            if ("cities" in recommendation) {
                recommendation = recommendation["cities"][0];
            }
            newRecommendation = document.createElement("div");
            newRecommendation.innerHTML = `<h3>${recommendation.name}</h3><img src=img/${recommendation.imageUrl} width=100><br><p>${recommendation.description}</p>`;
            recommendations.appendChild(newRecommendation);
        });
    })
    .catch(error => alert("Error: " + error));
}

btnSearch.addEventListener("click", function() {
    searchText = searchBar.value.toLowerCase();
    if (searchText === "beach") {
        searchText = "beaches";
    } else if (searchText === "temple") {
        searchText = "temples";
    } else if (searchText === "country") {
        searchText = "countries";
    }
    acceptedKeywords = ["beaches", "temples", "countries"];
    if (acceptedKeywords.includes(searchText)) {
        displayRecommendations(searchText);
    }
});

btnReset.addEventListener("click", function() {
    recommendations.replaceChildren();
});