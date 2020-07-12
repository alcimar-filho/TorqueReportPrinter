const {ipcRenderer} = require('electron');

const dados = document.querySelector('#dados');
const engineStatus = document.querySelector('#engine-status');
const engineNumber = document.querySelector('#engine-number');
const type = document.querySelector('#type');
const buildStatus = document.querySelector('#build-status');
const printDate = document.querySelector('#print-date');

const today = new Date();

ipcRenderer.on('gerar-relatorio', (event,resultados,vin) => preencherFormulario(resultados,vin));
    
function preencherFormulario(resultados,vin){ 
    dados.innerHTML = "";   
    resultados
        .sort((a,b) => {
            if (a.DateTime > b.DateTime) {
                return 1;
            }
            if (a.DateTime < b.DateTime) {
                return -1;
            }
            return 0;})
        .forEach((result,i) => {
            let tr = document.createElement('tr')
            tr.innerHTML =
            `<td class="result">${i+1}</td>
            <td class="result">${result.Description}</td>
            <td class="result">${result.Station}</td>
            <td class="result">${result.DateTime}</td>
            <td class="result">${result.Tmin}</td>
            <td class="result">${result.Tmax}</td>
            <td class="result">${result.Torque}</td>
            <td class="result">${result.Amin}</td>
            <td class="result">${result.Amax}</td>
            <td class="result">${result.Angle}</td>
            <td class="result">${result.Status}</td>
            <td class="result">${result.BatchTarget}</td>
            <td class="result">${result.Operator}</td>`;
            dados.appendChild(tr);
        });
    
    engineStatus.innerHTML = 'OK'
    engineNumber.innerHTML = vin
    type.innerHTML = resultados[0].Model[0]+resultados[0].Model[1]+resultados[0].Model[5]
    buildStatus.innerHTML = 'OK'
    printDate.innerHTML = `${doisDigitos(today.getDate())} / ${doisDigitos(today.getMonth())} / ${today.getFullYear()}`

    ipcRenderer.send('imprimir-relatorio');
}

function doisDigitos(n){
    return n > 9 ? "" + n: "0" + n;
}