const facilities = [
    {
        id: 1,
        name: "Kigali University Teaching Hospital",
        type: "hospital",
        district: "Gasabo",
        coordinates: { latitude: -1.9536, longitude: 30.0605 },
        services: ["emergency", "surgery", "maternity", "pediatrics"],
        last_updated: "2026-04-06"
    },
    {
        id: 2,
        name: "Kibagabaga District Hospital",
        type: "hospital",
        district: "Gasabo",
        coordinates: { latitude: -1.9278, longitude: 30.1045 },
        services: ["emergency", "maternity", "general"],
        last_updated: "2026-04-06"
    },
    {
        id: 3,
        name: "Remera Health Center",
        type: "health_center",
        district: "Gasabo",
        coordinates: { latitude: -1.9502, longitude: 30.1123 },
        services: ["consultation", "vaccination", "maternity"],
        last_updated: "2026-04-06"
    },
    {
        id: 4,
        name: "Kicukiro Health Center",
        type: "health_center",
        district: "Kicukiro",
        coordinates: { latitude: -1.9823, longitude: 30.0721 },
        services: ["consultation", "vaccination", "family planning"],
        last_updated: "2026-04-06"
    },
    {
        id: 5,
        name: "Nyamirambo Clinic",
        type: "clinic",
        district: "Nyarugenge",
        coordinates: { latitude: -1.9901, longitude: 30.0412 },
        services: ["consultation", "pharmacy"],
        last_updated: "2026-04-06"
    },
    {
        id: 6,
        name: "Muhima District Hospital",
        type: "hospital",
        district: "Nyarugenge",
        coordinates: { latitude: -1.9567, longitude: 30.0489 },
        services: ["emergency", "surgery", "general"],
        last_updated: "2026-04-06"
    },
    {
        id: 7,
        name: "Masaka Hospital",
        type: "hospital",
        district: "Kicukiro",
        coordinates: { latitude: -2.0123, longitude: 30.0891 },
        services: ["emergency", "maternity", "pediatrics"],
        last_updated: "2026-04-06"
    },
    {
        id: 8,
        name: "Kanombe Health Center",
        type: "health_center",
        district: "Kicukiro",
        coordinates: { latitude: -1.9734, longitude: 30.1398 },
        services: ["consultation", "vaccination", "family planning"],
        last_updated: "2026-04-06"
    },
    {
        id: 9,
        name: "Kimironko Health Center",
        type: "health_center",
        district: "Gasabo",
        coordinates: { latitude: -1.9401, longitude: 30.1187 },
        services: ["consultation", "maternity", "vaccination"],
        last_updated: "2026-04-06"
    },
    {
        id: 10,
        name: "Gikondo Clinic",
        type: "clinic",
        district: "Kicukiro",
        coordinates: { latitude: -1.9789, longitude: 30.0654 },
        services: ["consultation", "pharmacy"],
        last_updated: "2026-04-06"
    }
];

console.log("script loaded")
console.log(facilities.length)
console.log(document.querySelector('.cards-container'))

function renderTable(facilities){
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    facilities.forEach(function(facility){
        let row = document.createElement('tr');
        row.innerHTML = `<td>${facility.id}</td>
        <td>${facility.name}</td>
        <td>${facility.type}</td>
        <td>${facility.district}</td>
        <td>${facility.coordinates.latitude},${facility.coordinates.longitude}</td>
        <td>${facility.services.join(", ")}</td>
        <td>${facility.last_updated}</td>`        
        tbody.appendChild(row);
    });
    

}

renderTable(facilities)

function renderCards(facilities){
    const cards = document.querySelector('.cards-container');
    cards.innerHTML = '';
    facilities.forEach(function(facility){
        let card= document.createElement('div')
        card.className = 'card'   
        card.innerHTML = `
                <div class="card-top">
                    <span class="icon">🏥</span>
                    <h3>${facility.name}</h3>
                </div>
                <div class="card-details">
                    <p><strong>Type:</strong>${facility.type}</p>
                    <p><strong>District:</strong> ${facility.district}</p>
                    <p><strong>Services:</strong> ${facility.services.join(", ")}</p>
                 </div>`
                cards.appendChild(card);
    });
    
}
 renderCards(facilities);


 // Make the search form actually work

 const districtInput = document.querySelector('#district-input');
 const selectButton = document.querySelector('select');
 const searchButton = document.querySelector('input[type="submit"]');
 const clearButton = document.querySelector('.Clear-button');

  districtInput.addEventListener('keyup', liveSearch); 
searchButton.addEventListener('click', getDistrict);
clearButton.addEventListener('click', resetTable);


function getDistrict(e){
e.preventDefault();
const district = districtInput.value.trim();
const filtered = filterByDistrict(facilities, district);
if (district === ""){
    renderTable(facilities);
}
else{
renderTable(filtered);
renderCards(filtered);
}
}
function liveSearch(){
const district = districtInput.value.trim();
const filtered = filterByDistrict(facilities, district);
if (district === ""){
    renderTable(facilities);
}
else{
renderTable(filtered);
renderCards(filtered);
} 
}

function filterByDistrict(facilities, district){
    return facilities.filter(function(facility){ 
        return facility.district.toLowerCase() === district.toLowerCase();
    });
} 

function resetTable(e){
e.preventDefault();
districtInput.value = '';
selectButton.value = '';
renderTable(facilities);
renderCards(facilities);
}
