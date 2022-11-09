//@ts-check

const inputs = document.querySelectorAll('.toggle__switch input');

if (inputs.length !== 0) {
  inputs.forEach((input) => {
    input.addEventListener('click', () => {
      if (typeof input.getAttribute('checked') !== 'string') {
        inputs.forEach((input) => input.removeAttribute('checked'));

        input.toggleAttribute('checked');
        input.parentElement?.classList.toggle('sr-only');
      }
    });
  });
} else {
  console.error('Empty NodeList');
}
