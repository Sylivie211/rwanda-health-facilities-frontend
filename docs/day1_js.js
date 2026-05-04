 const facility = {
    name: "Kigali University Teaching Hospital",
    type: "hospital",
    district: "Gasabo",
    services: ["emergency", "surgery", "maternity", "pediatrics"]
};


function describeFacility(facility){
    return `facility= ${facility.name}`
}
console.log("Printing the facility Name:")
let x = describeFacility(facility);
console.log(x);
console.log("printing out the services");
 for( let i = 0; i <= facility.services.length; i++ ){
    console.log(`facility:${facility.services[i]}`)
}
console.log("printing out the services:");
facility.services.forEach(function(service, index) {
console.log(`service ${index + 1}: ${service}`)
})


const facilities = [
    {
        name: "Kigali University Teaching Hospital",
        type: "hospital",
        district: "Gasabo",
        services: ["emergency", "surgery", "maternity", "pediatrics"]
    },
    {
        name: "Kibagabaga District Hospital",
        type: "hospital",
        district: "Gasabo",
        services: ["emergency", "maternity", "general"]
    },
    {
        name: "Nyamirambo Clinic",
        type: "clinic",
        district: "Nyarugenge",
        services: ["consultation", "pharmacy"]
    }
];
 

function filterByDistrict(facilities, district){
    return facilities.filter(function(facility){
        return facility.district === district;
    });
}
console.log("filtering facilities from Gasabo:");
x = filterByDistrict(facilities, "Gasabo");
console.log(x);