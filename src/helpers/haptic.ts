const HAPTIC_ID = '___haptic-switch___';
const HAPTIC_DURATION_MS = 10;

function getHapticElements() {
  let input = document.querySelector<HTMLInputElement>(`#${HAPTIC_ID}`);
  let label = document.querySelector<HTMLLabelElement>(`label[for="${HAPTIC_ID}"]`);

  if (!input || !label) {
    input = document.createElement('input');
    input.type = 'checkbox';
    input.id = HAPTIC_ID;
    input.setAttribute('switch', '');
    input.style.visibility = 'hidden';
    input.style.opacity = '0';
    input.style.position = 'absolute';
    input.style.pointerEvents = 'none';

    document.body.appendChild(input);

    label = document.createElement('label');
    label.htmlFor = HAPTIC_ID;
    label.style.visibility = 'hidden';
    label.style.opacity = '0';
    label.style.position = 'absolute';
    label.style.pointerEvents = 'none';

    document.body.appendChild(label);
  }

  return { input, label };
}

function triggerHaptic(duration = HAPTIC_DURATION_MS) {
  if (typeof window === 'undefined') return;

  if (navigator?.vibrate) {
    navigator.vibrate(duration);
  } else {
    const { label } = getHapticElements();
    label.click();
  }
}

export { triggerHaptic };
