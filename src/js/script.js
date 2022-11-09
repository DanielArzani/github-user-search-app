//@ts-check

const inputs = document.querySelectorAll('.toggle__switch input');
const labels = document.querySelectorAll('.toggle__switch label');

if (inputs.length > 0) {
  inputs.forEach((input) => {
    const label = input.parentElement;

    input.addEventListener('click', () => {
      if (label !== null) {
        if (label.dataset.hidden === 'true') {
          label.dataset.hidden = 'false';
        } else {
          labels.forEach((label) => {
            if (label instanceof HTMLLabelElement) {
              label.dataset.hidden = 'false';
            }
          });

          label.dataset.hidden = 'true';
          label.firstElementChild?.toggleAttribute('checked');
        }
      }
    });
  });
} else {
  console.error('Empty NodeList');
}
