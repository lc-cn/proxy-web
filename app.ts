import Koa from 'koa';
import {URL} from 'url'
import * as fs from 'fs'
import koaStatic from 'koa-static';
function mapToObject(map:Headers):Record<string, string>{
    return Object.fromEntries(map.entries())
}
const app = new Koa();
const port= Number(process.env.PORT||'3000')
const deployPath=process.env.DEPLOY_PATH||'/p'
app
    .use(koaStatic('public'))
    .use(async (ctx)=>{
        const {proxy_host=ctx.request.hostname,proxy_port,proxy_protocol=ctx.request.protocol,...query} = ctx.query
        if(proxy_host===ctx.request.hostname) return ctx.body=await fetch("https://markdown2html.deno.dev",{
            method:"POST",
            body:fs.readFileSync('./README.md','utf8')
        }).then(r=>r.text())
        const url=new URL(`${ctx.request.protocol}://${ctx.request.hostname}${ctx.request.path.replace(deployPath,'')}`)
        url.hostname=proxy_host
        url.port=proxy_port
        url.protocol=proxy_protocol
        url.search=new URLSearchParams(query).toString()
        const headers=new Headers(ctx.request.headers) as Headers
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        headers.entries()
        try{
            const res=await fetch(url.href,{
                headers:mapToObject(headers),
                method:ctx.request.method,
                body:ctx.request.body
            })
            ctx.body=await res.text()
        }catch (e){
            ctx.writeHead(500)
            ctx.body=String(`proxy host ${proxy_host} failed:${e.message}`)
        }
    })

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
