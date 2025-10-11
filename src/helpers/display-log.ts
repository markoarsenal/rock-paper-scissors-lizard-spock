const LOG_ID = 'log';

const logMessage = (message: string, logElement: HTMLElement) => {
  logElement.innerHTML = message;
};

const createLogElement = () => {
  const logElement = document.createElement('div');

  logElement.id = LOG_ID;
  logElement.className = 'fixed bottom-0 right-0 w-full p-2 bg-main';

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
