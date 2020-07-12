const {ipcRenderer} = require('electron');

const botaoImprimir = document.querySelector('form');
const vin = document.querySelector('form input');
const mensagemDeErro = document.querySelector('#mensagem-de-erro');

vin.focus();

botaoImprimir.addEventListener('submit', (event)=> {
    event.preventDefault();
    mensagemDeErro.innerHTML = ''
    if(vin.value.trim().length==7){
        ipcRenderer.send('gerar-relatorio',vin.value.trim());
        vin.focus();
    }
    else{
        mensagemDeErro.innerHTML = 'O número do motor deve ter 7 digitos'
        vin.focus();
    }
});

ipcRenderer.on('vin-invalido', () => {mensagemDeErro.innerHTML = 'Número de motor não encontrado'; vin.focus();});

ipcRenderer.on('vin-encontrado', () => vin.value = '');

ipcRenderer.on('sem-conexao', () => alert('Falha ao conectar com o banco de dados'));

