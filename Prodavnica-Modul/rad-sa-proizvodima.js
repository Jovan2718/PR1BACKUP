const fs = require('fs')
const PATH = "proizvodi.json"

//Citanje proizvoda iz jsona(funkcija)
let procitajPodatkeIzFajla = () => {
    let proizvodi = fs.readFileSync(PATH, (err, data) => {
        if (err) throw err
        return data
    })
    return JSON.parse(proizvodi)
}

//Upisivanje proizvoda u json(funkcija)
let snimiProizvode = (data) => {
    fs.writeFileSync(PATH, JSON.stringify(data))
}
//Modul za citanje proizvoda
exports.sviProizvodi = () => {
    return procitajPodatkeIzFajla();
}

//Dodavanje novog proizvoda(modul)
exports.addProizvod = (noviProizvod) => {
    let id = 1
    let proizvodi = this.sviProizvodi()
    if (proizvodi.length > 0) {
        id = proizvodi[proizvodi.length - 1].id + 1
    }
    noviProizvod.id = id
    proizvodi.push(noviProizvod)
    snimiProizvode(proizvodi)
}

//Nalazenje proizvoda po id-u
exports.getProizvod = (id) => {
    return this.sviProizvodi().find(proizvod => proizvod.id == id)
}

//Update podataka proizvoda preko id-a(modul)
exports.updateProizvod = (id, noviProizvod) => {
    let proizvodi = this.sviProizvodi()
    for (let i = 0; i < proizvodi.length - 1; i++) {
        if (id == proizvodi[i].id) {
            noviProizvod.id = parseInt(id)
            proizvodi[i] = noviProizvod
        }
    }
    console.log(proizvodi)
    snimiProizvode(proizvodi)
}

//Modul za pretragu po oznakama proizvoda
exports.getProizvodByOznaka = (oznaka) => {
    return this.sviProizvodi().filter(proizvod => {
        return imaOznaku(proizvod, oznaka)
    });
}

const imaOznaku = (proizvod, oznaka) => {
    const nasao = proizvod.oznaka.filter(o => o == oznaka).length > 0;
    return nasao;
}
//Modul za filtriranje po kategoriji
exports.getProizvodByKategorija = (kategorijaProizvoda) => {
    return this.sviProizvodi().filter(proizvod => proizvod.kategorijaProizvoda.includes(kategorijaProizvoda));
}

//Modul za brisanje proizvoda preko id-a
exports.deleteProizvod = (id) => {
    snimiProizvode(this.sviProizvodi().filter(proizvod => proizvod.id != id))
}
