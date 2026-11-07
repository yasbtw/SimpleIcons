const express = require('express');
const fs = require('fs').promises
const path = require('path')
const app = express()
const port = 3000
const SIZE = 256;

app.get('/:id', async (req, res) => {
    const r = req.params.id.split(',');
    const rwidth = req.query.size/100 || 1;
    const spacing = parseInt(req.query.spacing) || 10;
    console.log(spacing)
    const width = r.length*(SIZE+spacing);
    let response = `<svg xmlns="http://www.w3.org/2000/svg" width="${width*rwidth}" height="${SIZE*rwidth}" viewBox="0 0 ${width} ${SIZE}">`;
        for (const [i,p] of r.entries()){
            const filePath = path.join(__dirname, 'icons', `${p}.svg`);
            const icon = await fs.readFile(filePath, 'utf8').catch(()=> null); 
            response  += `<g transform="translate(${i*(SIZE+spacing)},0)">${icon}</g>`
            console.log(i, p);
        }
        res.setHeader('Content-Type', 'image/svg+xml');
        response += '</svg>'
        res.send(response, 'utf-8');
})

app.listen(port, () => {
  console.log(`SimpleIcons is running on port ${port}`)
})