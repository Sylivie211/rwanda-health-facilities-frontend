/* const facilities = [
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
]; */

console.log("script loaded")
//console.log(facilities.length)
console.log(document.querySelector('.cards-container'))

let allFacilities = []

/* async function loadFacilities() {
    
    try{
        document.querySelector('#loading').style.display = 'block';
        const response = await fetch('http://localhost:8080/facilities')
        
        if(!response.ok){
            throw new Error('API error: ' + response.status);
        }
        
        const data = await response.json()
        allFacilities = data;  
        //saved data 
        const saved = localStorage.getItem('lastDistrict');
        if (saved) {
            districtInput.value = saved;
            const filtered = filterByDistrict(allFacilities, saved);
            renderTable(filtered);
            renderCards(filtered);

            
        } else {
            renderTable(data);
            renderCards(data);
        }

        renderLineChart(allFacilities);
        renderPieChart(allFacilities);
    } catch(error){
        console.log('Could not load facilities: ' + err.message);
        renderTable([]);
        renderCards([]);       
        
    }finally{
        document.querySelector('#loading').style.display = 'none';
    }
}


loadFacilities(); */


/* New load */
async function loadAndRender(filters = {}) {
    setState('loading')
    try {
        const data = await fetchFacilities(filters);
        allFacilities = data;
        if (data.length === 0) {
            setState('empty');
            return;
        }
        renderTable(data);
        renderCards(data);
        renderLineChart(data);
        renderPieChart(data);
        setState('success')
    } catch (error) {
        setState('error', error.message);
    }
}

function setState(state, message = '') {
    const loadingEl = document.querySelector('#loading');
    const emptyEl = document.querySelector('#empty');
    const errorEl = document.querySelector('#error');
    const tableEl = document.querySelector('.table-wrapper');
    const chartsEl = document.querySelector('.charts-container');
    const cardsEl = document.querySelector('.cards-container');

    // Hide everything first, then show only what this state needs
    loadingEl.style.display = 'none';
    emptyEl.style.display = 'none';
    errorEl.style.display = 'none';
    tableEl.style.display = 'none';
    chartsEl.style.display = 'none';
    cardsEl.style.display = 'none';

    if (state === 'loading') {
        loadingEl.style.display = 'block';
    } else if (state === 'success') {
        tableEl.style.display = 'block';
        chartsEl.style.display = 'block';
    } else if (state === 'empty') {
        emptyEl.style.display = 'block';
    } else if (state === 'error') {
        errorEl.style.display = 'block';
        errorEl.textContent = message;
    }
}

async function fetchFacilities(filters = {}) {
    const params = new URLSearchParams();
    if (filters.district) params.append('district', filters.district);
    if (filters.type) params.append('type', filters.type);

    const url = 'http://localhost:8080/facilities' + (params.toString() ? '?' + params.toString() : '');
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('API error: ' + response.status);
    }

    return await response.json();
}

function renderTable(allFacilities){
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    allFacilities.forEach(function(facility){
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

//renderTable(facilities)

function renderCards(allFacilities){
    const cards = document.querySelector('.cards-container');
    cards.innerHTML = '';
    allFacilities.forEach(function(facility){
        let card= document.createElement('div')
        card.className = 'card'   
        card.innerHTML = `
                <div class="card-top">
                    <span class="icon">'🏥'</span>
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
 //renderCards(facilities);


 // Make the search form actually work

 const districtInput = document.querySelector('#district-input');
 const selectButton = document.querySelector('select');
 const searchButton = document.querySelector('input[type="submit"]');
 const clearButton = document.querySelector('.Clear-button');
 

districtInput.addEventListener('keyup', liveSearch); 
searchButton.addEventListener('click', getDistrict);
clearButton.addEventListener('click', resetTable);
selectButton.addEventListener('change', getType);


function getDistrict(e){
    e.preventDefault();
    const district = districtInput.value.trim();
    const type = selectButton.value;
    localStorage.setItem('lastDistrict', district);

    loadAndRender({ district, type });
}

function getType(){
    const district = districtInput.value.trim();
    const type = selectButton.value;

    loadAndRender({ district, type });
}

const saved = localStorage.getItem('lastDistrict');
if (saved) {
    districtInput.value = saved;
    loadAndRender({ district: saved });
} else {
    loadAndRender({});
}

function liveSearch(){
    const district = districtInput.value.trim();
    const type = selectButton.value;

    loadAndRender({ district, type }); 
}

/* function filterByDistrict(allFacilities, district){
    return allFacilities.filter(function(facility){ 
        return facility.district.toLowerCase() === district.toLowerCase();
    });
} 

function filterByType(facilities, type) {
    return facilities.filter(function(facility){
        return facility.type.toLowerCase() === type.toLowerCase();
    });
} */

function resetTable(e){
e.preventDefault();
districtInput.value = '';
selectButton.value = '';
localStorage.removeItem('lastDistrict'); 
loadAndRender({});
}

function countByDistrict(facilities) {
  return facilities.reduce((counts, facility) => {
    const district = facility.district;
    counts[district] = (counts[district] || 0) + 1;
    return counts;
  }, {});
}


let lineChartInstance = null;
let pieChartInstance = null;

function renderLineChart(facilities){
    result = countByDistrict(facilities);
    labels= Object.keys(result)
    data = Object.values(result)

    const ctx = document.getElementById('analyticsChart');


    if (lineChartInstance) {
    lineChartInstance.destroy();
    }
    lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Facilities per District',
                data: data,
                borderColor: '#3e95cd',
                backgroundColor: 'rgba(62, 149, 205, 0.2)',
                fill: true,
                tension: 0.3                
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1 // counts are whole numbers, no need for 1.5 facilities
                }
                }
            }           
        }
    });
}
function countByType(facilities){
    return facilities.reduce((counts, facility) => {
        const type = facility.type
        counts[type] = (counts[type] || 0) + 1

        return counts
    }, {});
}

function renderPieChart(facilities){
    result = countByType(facilities);
    labels= Object.keys(result)
    data = Object.values(result)

    ctx = document.getElementById('typeChart')


    if (pieChartInstance) {
    pieChartInstance.destroy();
    }
    pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels : labels,
            datasets: [{
                label: 'Facilities per Type',
                data: data,
                borderColor: '#3e95cd',
                backgroundColor: [
                    '#3e95cd',  // hospital
                    '#8e5ea2',  // health_center
                    '#3cba9f',  // clinic
                    '#e8c3b9'   // (extra, in case a 4th type shows up)
                ],
            }]
        }
    })
}
/* renderLineChart(allFacilities); */