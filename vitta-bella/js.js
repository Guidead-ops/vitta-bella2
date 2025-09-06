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
    console.log(contador)
    if(finalDoCarrossel < maximoDoCarrossel) {
        
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
    console.log(contador)
    
    if(contador > -maximoDoCarrossel) {
        finalDoCarrossel += Math.max(pulo, -maximoDoCarrossel)
        console.log(finalDoCarrossel)
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
    }
})
