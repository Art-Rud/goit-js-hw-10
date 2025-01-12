const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMin = document.querySelector('[data-minutes]');
const timerSec = document.querySelector('[data-seconds]');
const input = document.querySelector('input');
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
let userSelectedDate = null;
startBtn.disabled = true;
flatpickr('#datetime-picker', {
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      longhand: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
  },
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    startBtn.addEventListener('click', () => {
      const timeCalc = setInterval(() => {
        let timerDif = userSelectedDate - Date.now();
        console.log(timerDif);
        if (timerDif <= 0) {
          clearInterval(timeCalc);
          return;
        }
        const timerDifCalc = convertMs(timerDif);
        timerDays.textContent = timerDifCalc.days.toString().padStart(2, 0);
        timerHours.textContent = timerDifCalc.hours.toString().padStart(2, 0);
        timerMin.textContent = timerDifCalc.minutes.toString().padStart(2, 0);
        timerSec.textContent = timerDifCalc.seconds.toString().padStart(2, 0);
        if (timerDifCalc != 0) {
          startBtn.disabled = true;
          startBtn.classList.remove('enabled');
        }
      }, 1000);
    });
    if (userSelectedDate <= new Date()) {
      startBtn.disabled = true;
      startBtn.classList.remove('enabled');
      input.classList.remove('disable-input');
      // alert('Please choose a date in the future');
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: '"Please choose a date in the future"',
        icon: 'far fa-times-circle',
        iconColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        messageColor: '#fff',
      });
    } else {
      startBtn.disabled = false;
      startBtn.classList.add('enabled');
      input.disabled = true;
      input.classList.add('disable-input');
    }
  },
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
