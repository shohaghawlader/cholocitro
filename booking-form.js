const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const bookingForm = document.getElementById('bookingForm');
const packageSelect = document.getElementById('packageSelect');

const selectedPackage = new URLSearchParams(window.location.search).get('package');
if (selectedPackage && packageSelect) {
  let matchingOption = [...packageSelect.options].find(
    option => option.value === selectedPackage || option.textContent === selectedPackage
  );

  if (!matchingOption) {
    matchingOption = new Option(selectedPackage, selectedPackage);
    packageSelect.add(matchingOption);
  }

  packageSelect.value = matchingOption.value || matchingOption.textContent;
}

bookingForm?.addEventListener('submit', event => {
  event.preventDefault();

  const form = new FormData(bookingForm);
  const details = {
    name: form.get('name')?.trim(),
    phone: form.get('phone')?.trim(),
    eventType: form.get('eventType'),
    eventDate: form.get('eventDate'),
    location: form.get('location')?.trim(),
    package: form.get('package'),
    message: form.get('message')?.trim() || 'No extra message'
  };

  const text = `Hello Cholocitro,
I want to book / know about your wedding photography package.

Name: ${details.name}
Phone: ${details.phone}
Event Type: ${details.eventType}
Event Date: ${details.eventDate}
Location: ${details.location}
Preferred Package: ${details.package}
Message: ${details.message}`;

  const whatsappNumber = '8801602155907';
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
