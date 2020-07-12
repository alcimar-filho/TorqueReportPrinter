const  {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');

const sql = require('mssql');

//change the connection string below to the connection string of your database

var connectionString = 'mssql://username:password@localhost/database'

app.on('ready', () =>{

    let interface = new BrowserWindow({
        width: 800,
        height: 450,
        show: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    interface.setMenu(null);
    
    interface.loadURL(`file://${__dirname}/src/interface.html`);

    //interface.webContents.openDevTools();

    let relatorio = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    relatorio.setMenu(null);
    
    relatorio.loadURL(`file://${__dirname}/src/relatorio.html`);

    ipcMain.on('gerar-relatorio',(event,vin)=>{
        buscaResultados(vin).then(resultados => {
            if(resultados.length>0){
                relatorio.show();
                relatorio.webContents.send('gerar-relatorio',resultados,vin);
                interface.webContents.send('vin-encontrado');
            }
            else{
                interface.webContents.send('vin-invalido')
            }    
            })
            .catch(() => interface.webContents.send('sem-conexao'))
        
    });

    ipcMain.on('imprimir-relatorio', () =>{
        relatorio.webContents.print({silent: true,color:false,printBackgroung:true},() => relatorio.hide());
    });

    interface.on('close', ()=>{
        app.quit();
    });

    relatorio.on('close', ()=>{
        app.quit();
    });
       
});



async function buscaResultados(vin) {
    const queryResultados = 
        `select * from vResult where ID in (
        SELECT [ResultID]
        FROM [dbo].[ResultToResultIdentifier] as RTRI
        inner join [dbo].[ResultIdentifier] as RI
        ON RI.ID = RTRI.ResultIdentifierID
        WHERE [Identifier] = '${vin}')`
    try {
        await sql.connect(connectionString);
        const result = await sql.query(queryResultados);
        return result.recordset;
    } catch (err) {
        console.log(err);
    }
};
