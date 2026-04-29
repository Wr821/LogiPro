const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

// Manter referência global da janela
let mainWindow;

function createWindow() {
  // Criar janela do navegador
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets/icon.png'), // Ícone da aplicação
    title: 'RC Transportes - Sistema de Gestão',
    show: false, // Não mostrar até estar pronto
    autoHideMenuBar: false, // Manter barra de menu
    titleBarStyle: 'default'
  });

  // Carregar a aplicação
  const startUrl = isDev 
    ? 'http://localhost:3001' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Mostrar janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focar na janela
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitido quando a janela é fechada
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Configurar menu personalizado
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Recarregar',
          accelerator: 'F5',
          click: () => {
            mainWindow.reload();
          }
        },
        {
          label: 'Forçar Recarregar',
          accelerator: 'Ctrl+F5',
          click: () => {
            mainWindow.webContents.reloadIgnoringCache();
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Desfazer' },
        { role: 'redo', label: 'Refazer' },
        { type: 'separator' },
        { role: 'cut', label: 'Recortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Colar' },
        { role: 'selectall', label: 'Selecionar Tudo' }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'reload', label: 'Recarregar' },
        { role: 'forcereload', label: 'Forçar Recarregar' },
        { role: 'toggledevtools', label: 'Ferramentas do Desenvolvedor' },
        { type: 'separator' },
        { role: 'resetzoom', label: 'Zoom Normal' },
        { role: 'zoomin', label: 'Aumentar Zoom' },
        { role: 'zoomout', label: 'Diminuir Zoom' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre RC Transportes',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre RC Transportes',
              message: 'RC Transportes - Sistema de Gestão',
              detail: 'Versão 1.0.0\n\nSistema completo para gestão de transportes, motoristas, veículos e adiantamentos.\n\nDesenvolvido em 2025',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Abrir links externos no navegador padrão
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Prevenir navegação externa
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const startUrlObj = new URL(startUrl);
    
    if (parsedUrl.origin !== startUrlObj.origin) {
      event.preventDefault();
    }
  });
}

// Este método será chamado quando o Electron terminar de inicializar
app.whenReady().then(createWindow);

// Sair quando todas as janelas estiverem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // No macOS é comum recriar a janela quando o ícone do dock é clicado
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Configurações de segurança
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

// Definir nome da aplicação
app.setName('LoginPro - sistema de gestão de transportes');

// Configurar protocolo personalizado se necessário
if (!isDev) {
  app.setAsDefaultProtocolClient('rc-transportes');
}