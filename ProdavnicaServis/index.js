var express = require('express')
var prodavnicaServis=require('prodavnica-modul')
var app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/',(request, response)=>{
    response.send("Server radi!")
})

app.get('/sviproizvodi',(request, response)=>{
    response.send(prodavnicaServis.sviProizvodi())
})

app.post('/addproizvod',(request, response)=>{
    prodavnicaServis.addProizvod(request.body)
    response.end("Proizvod uspesno dodat!")
})

app.get('/getproizvodbyid/:id',(request, response)=>{
    response.send(prodavnicaServis.getProizvod(request.params["id"]))
})

app.post('/updateproizvoda/:id',(request, response)=>{
    console.log("radi")
    prodavnicaServis.updateProizvod(request.params["id"],request.body)
    response.end("Proizvod je uspesno promenjen!")
})

app.delete('/deleteproizvod/:id',(request, response)=>{
    prodavnicaServis.deleteProizvod(request.params["id"])
    response.end("Proizvod uspesno obrisan!")
})

app.get('/getproizvodbyoznaka',(request, response)=>{
    response.send(prodavnicaServis.getProizvodByOznaka(request.query["oznaka"]))
})

app.get('/getproizvodbykategorija',(request, response)=>{
    response.send(prodavnicaServis.getProizvodByKategorija(request.query["kategorijaProizvoda"]))
})

app.listen(port,()=>{console.log(`Startovan server na portu ${port}`)})