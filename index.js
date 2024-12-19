const fs = require('fs');
const path = require('path');

const carsFilePath = path.join(__dirname, 'cars.json');






if (!fs.existsSync(carsFilePath)) {
    fs.writeFileSync(carsFilePath, '[]', 'utf8'); 
    console.log('cars.json fayli yaratildi.');
}





function createFolders(...folderNames) {
    folderNames.forEach(folderName => {
        const folderPath = path.join(__dirname, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Papka yaratildi: ${folderName}`);
        } else {
            console.log(`Papka mavjud: ${folderName}`);
        }
    });
}




function addCar(data) {
    const cars = fs.readFileSync(carsFilePath, 'utf8'); 
    const updatedCars = cars.slice(0, -1) + (cars.length > 2 ? ',' : '') + JSON.stringify(data) + ']'; 
    fs.writeFileSync(carsFilePath, updatedCars, 'utf8');
    console.log(`Mashina qo'shildi: ${data.model}`);
}





function getAllCars() {
    return fs.readFileSync(carsFilePath, 'utf8');
}





function deleteCarById(id) {
    const cars = fs.readFileSync(carsFilePath, 'utf8');
    const carsArray = JSON.parse(cars);
    const updatedCarsArray = carsArray.filter(car => car.id !== id); 
    const updatedCars = JSON.stringify(updatedCarsArray, null, 2); 
    fs.writeFileSync(carsFilePath, updatedCars, 'utf8');
    console.log(`ID: ${id} bo'yicha mashina o'chirildi.`);
}




function readCarsStream() {
    const readStream = fs.createReadStream(carsFilePath, { encoding: 'utf8' });
    readStream.on('data', chunk => console.log(chunk));
    readStream.on('end', () => console.log('Oqish tugadi.'));
}


function writeCarsStream(data) {
    const writeStream = fs.createWriteStream(carsFilePath);
    writeStream.write(data);
    writeStream.end(() => console.log('Yozish tugadi.'));
}


createFolders('folder1', 'folder2'); 
addCar({ id: 1, model: 'Tesla Model 3', price: 45000, year: 2022, color: 'Red', mileage: 5000 });
console.log(getAllCars()); 
deleteCarById(1); 
readCarsStream();
writeCarsStream('[{"id":2,"model":"BMW X5","price":35000}]'); 
