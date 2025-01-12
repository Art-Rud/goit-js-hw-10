import iziToast from 'izitoast';
const form = document.querySelector('.form');
const input = document.querySelector('[name="delay"]');
const inputs = document.querySelectorAll('[name="state"]');
const fieldset = document.querySelector('.fieldset');
const fulfilled = document.querySelector('[value="fulfilled"]');
const rejected = document.querySelector('[value="rejected"]');
const btn = document.querySelector('[type="submit"]');
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = input.value;
  const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilled.checked) {
        resolve(delay);
      } else if (rejected.checked) {
        reject(delay);
      }
    }, delay);
  });

  promis
    .then(delay => {
      // console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        icon: 'far  fa-check-circle',
        iconColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        messageColor: '#fff',
      });
    })
    .catch(delay => {
      // console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        message: ` Rejected promise in ${delay}ms`,
        icon: 'far fa-times-circle',
        iconColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        messageColor: '#fff',
      });
    });
});
inputs.forEach(inp => {
  inp.addEventListener('change', () => {
    if (inp.checked) {
      fieldset.classList.add('fieldset-border');
    } else {
      fieldset.classList.remove('fieldset-border');
    }
  });
});
setTimeout(() => {
  iziToast.info({
    title: 'Hello',
    titleColor: '#fff',
    message: 'Welcome!',
    icon: 'far fa-bell',
    iconColor: '#fff',
    backgroundColor: '#09f',
    position: 'topRight',
    messageColor: '#fff',
  });
}, 1000);
