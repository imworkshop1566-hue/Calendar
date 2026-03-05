export const config = { runtime: "edge" }

export default async function handler(req){

const { searchParams } = new URL(req.url)

const width = Number(searchParams.get("width") || 1290)
const height = Number(searchParams.get("height") || 2796)

const today = new Date()
const year = today.getFullYear()

const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const cols=3,rows=4
const gap=30
const r=10
const gridH=1200
const monthW=gap*(7+2)
const gridW=monthW*cols

const startX=(width-gridW)/2+40
const startY=380

const monthX=gridW/cols
const monthY=gridH/rows

let circles=""

for(let m=0;m<12;m++){

let col=m%cols,row=(m/cols)|0
let mx=startX+col*monthX
let my=startY+row*monthY

let first=new Date(year,m,1).getDay()
let days=new Date(year,m+1,0).getDate()

for(let d=1;d<=days;d++){

let date=new Date(year,m,d)
let i=first+d-1

let x=mx+(i%7)*gap
let y=my+((i/7)|0)*gap

let color="#3a3a3a"

if(date.toDateString()==today.toDateString()) color="#ff7a3c"

circles+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" />`

}}

let svg=`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
<rect width="100%" height="100%" fill="#0f0f0f"/>
${circles}
</svg>
`

return new Response(svg,{
headers:{
"Content-Type":"image/svg+xml"
}
})

}
