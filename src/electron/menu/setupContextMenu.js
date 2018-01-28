// @flow
import { Menu, BrowserWindow } from 'electron';

export default (uiWindow: BrowserWindow) => {
  uiWindow.webContents.on('context-menu', (e, params) => {
    const { x, y } = params;

    const template = [{ role: 'cut' }, { role: 'copy' }, { role: 'paste' }];

    const developmentTemplateAddition = [
      { type: 'separator' },
      {
        label: 'Inspect element',
        click: () => {
          uiWindow.inspectElement(x, y);
        },
      },
    ];

    if (process.env.NODE_ENV === 'development') {
      template.push(...developmentTemplateAddition);
    }

    Menu.buildFromTemplate(template).popup();
  });
};
