// função para deixar o fundo da nav branca se usuario rolar para baixo
atualPosicao = 0
window.addEventListener("scroll", () => {
    
    if (scrollY <= 200) {
        console.log("estou no topo")
        let cabecalho = document.querySelector("header")
        let nav = cabecalho.querySelector("nav")
        cabecalho.style.position = "fixed"
        cabecalho.style.backgroundColor = "transparent"
        nav.style.display = "flex"
    }
    if (scrollY < atualPosicao && scrollY > 200) {
        console.log("estou subindo a 500")
        let cabecalho = document.querySelector("header")
        let nav = cabecalho.querySelector("nav")

        cabecalho.style.backgroundColor = "white"
        cabecalho.style.animation = "cabecalho-aparecer 0.3s linear 1"

        nav.style.animation = "nav-aparecer 0.3s linear 1"
        nav.style.display = "flex"
        
    }if (scrollY > atualPosicao && scrollY > 200) {
        let cabecalho = document.querySelector("header")
        let nav = cabecalho.querySelector("nav")
        
        cabecalho.style.backgroundColor = ""
        cabecalho.style.animation = "cabecalho-voltar 0.3s linear 1"
        
        nav.style.display = "none"
        
    }
    
    atualPosicao = scrollY;
    
});

let navegacao = document.querySelector("ul")

navegacao.querySelectorAll("li").forEach(entrada => {
    entrada.addEventListener("click", () => {
        let pagina = entrada.className
        let secao = document.getElementById(pagina)
        
        secao.scrollIntoView({behavior: "smooth"})
        //colocar verificação se for nulo
    })
})

let secoes = document.querySelectorAll('section')

const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting) {
            let inicio = document.querySelector("section")
            
            let destaque = entrada.target.className
            
            let filho = inicio.querySelector("." + destaque)
            
            Object.assign(filho.style, {
                borderBottom: "black solid",
                fontSize: "20px",
                fontWeight: "800", 
                transition: "0.3s"
            })

        }else {
            let inicio = document.querySelector("section")
            let destaque = entrada.target.className
            let filho = inicio.querySelector("." + destaque)
            if(filho == null) {

            }else {
                Object.assign(filho.style, {
                borderBottom: "",
                fontSize: "",
                fontWeight: "" 
            })
            }
        }
    })
}, {threshold: 0.65 })

secoes.forEach(secao => observer.observe(secao)); //rodando a função de observer

//script da segunda seção (NEWS)

containerNovidades = document.querySelectorAll("section")[1];

produtos = containerNovidades.getElementsByClassName("produto")

quantidadeProdutos = containerNovidades.querySelector("div p")
quantidadeProdutos.innerHTML = "(" + produtos.length + ")"
console.log(quantidadeProdutos)



botaoAvancar = document.querySelector(".botao-avancar")
botaoVoltar = document.querySelector(".botao-voltar")
contador = 0

produtoss = containerNovidades.querySelectorAll(".produto")

carrossel = document.querySelector(".container-produtos");
finalDoCarrossel = 0
maximoDoCarrossel = carrossel.scrollWidth - carrossel.clientWidth
pulo = maximoDoCarrossel/(produtos.length - 3)

botaoVoltar.addEventListener("click", () => {
    contador += pulo
    
    if(finalDoCarrossel > 5) {
        finalDoCarrossel -= pulo
        produtoss.forEach((produto) => {
            produto.style.transform = `translateX(${contador}px)`;
            produto.style.transition = "0.4s"
            
        })
    }else{
        produtoss.forEach((produto) => {
            produto.style.transform = `translateX(${contador}px)`
            produto.style.transition = "0.4s"
            
            setTimeout(() => {
                
                produto.style.transform = `translateX(${contador}px)`;
                
            }, 400)
            
        })
        contador -= pulo
    }
    
})

botaoAvancar.addEventListener("click", () => {
    contador -= pulo
    finalDoCarrossel += pulo
    
    if(contador > -maximoDoCarrossel - 5) {
        
        produtoss.forEach((produto) => {
            produto.style.transform = `translateX(${contador}px)`;
            produto.style.transition = "0.4s"
            
        })
    }else{
        produtoss.forEach((produto) => {
            produto.style.transform = `translateX(${contador}px)`
            produto.style.transition = "0.4s"
            
            setTimeout(() => {
                
                produto.style.transform = `translateX(${contador}px)`;
                
            }, 400)
            
        })
        contador += pulo
        finalDoCarrossel -= pulo
    }
})

function aumentar() {
    produtos = document.getElementById("segundo-container");
    produto = produtos.querySelectorAll(".produto")
    linhas = Math.ceil(produto.length/3) //arredonda para cima, o "3" é quantos produtos tenho cada linha
    
    if(linhas > 1) {
        produtos.style.height = `${linhas * 23 + 2}rem`
        produtos.style.transition = "0.5s"
        alturaCarrosel = parseInt(getComputedStyle(produtos).height)
        more = document.querySelector(".more")
        more.textContent = more.innerText === "More" ? "less" : "More";
        seta = document.querySelector(".seta-more")
        seta.style.transform = "rotateZ(180deg)"
        seta.style.transition = "0.5s"
        if(alturaCarrosel > 368) {
            produtos.style.height = `23rem`
            produtos.style.transition = "0.5s"
            seta.style.transform = "rotateZ(0deg)"
            seta.style.transition = "0.5s"
        }
        
    }else {
        more = document.querySelector(".more")
        more.textContent = "Sem more"
    }
}
