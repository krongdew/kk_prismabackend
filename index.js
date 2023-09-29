var express = require('express')
var cors = require('cors')
var app = express()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
app.use(cors())


app.get('/User', async function (req, res, next) {
  const allUsers = await prisma.user.findMany()
  res.json({user: allUsers})
})

app.get('/User/:id', async function (req, res, next) {
    const id = req.params.id
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
        include:{
            posts:true,
        },
    })
    res.json({user: user})
  })

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})