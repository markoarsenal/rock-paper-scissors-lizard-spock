const LOG_ID = 'log';

const logMessage = (message: string, logElement: HTMLElement) => {
  logElement.innerHTML += message + '<br />';
};

const createLogElement = () => {
  const logElement = document.createElement('div');

  logElement.id = LOG_ID;
  logElement.className = 'fixed top-0 right-0 w-full p-2 text-sm bg-main';

  return logElement;
};

export const displayLog = (message: string) => {
  const logElement = document.getElementById(LOG_ID);

  if (logElement) {
    logMessage(message, logElement);
  } else {
    const newLogElement = createLogElement();

    document.body.appendChild(newLogElement);
    logMessage(message, newLogElement);
  }
};

export const clearLog = () => {
  const logElement = document.getElementById(LOG_ID);
  if (logElement) logElement.innerHTML = '';
};
