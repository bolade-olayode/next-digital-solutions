const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileViewport = window.matchMedia('(max-width: 800px)');

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.hidden = mobileViewport.matches && !open;
}

setMenu(false);
mobileViewport.addEventListener('change', () => setMenu(false));
menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});

const studies = {
  commerce: {
    title: 'A more considered way to shop.',
    sections: [
      ['The opportunity', 'An online store should make it easy to understand a product, trust the business behind it, and complete a purchase. This fictional homeware concept explores that journey.'],
      ['The thinking', 'Give the products room to speak. Use clear navigation, useful product information, and a consistent visual language from the first visit through to checkout.'],
      ['What an engagement could cover', 'Discovery and customer journeys, storefront design, catalogue structure, payment integration, shipping workflows, and a clear handover to the team running the store.'],
    ],
  },
  operations: {
    title: 'Complexity, brought into focus.',
    sections: [
      ['The opportunity', 'When work is spread across spreadsheets, emails, and disconnected tools, it becomes harder to see what needs attention. This fictional workspace concept explores a shared operational view.'],
      ['The thinking', 'Start with the decisions people need to make. Surface relevant activity, connect the underlying systems, and keep routine work moving through clear workflows. The dashboard uses illustrative sample data.'],
      ['What an engagement could cover', 'Process mapping, systems assessment, API integrations, workflow automation, an internal dashboard, and documentation to support ongoing use.'],
    ],
  },
};

const dialog = document.querySelector('#study-dialog');
const studyTitle = document.querySelector('#study-title');
const studyContent = document.querySelector('#study-content');

document.querySelectorAll('[data-study]').forEach((button) => {
  button.addEventListener('click', () => {
    const study = studies[button.dataset.study];
    studyTitle.textContent = study.title;
    studyContent.replaceChildren();
    study.sections.forEach(([title, description]) => {
      const heading = document.createElement('h3');
      const paragraph = document.createElement('p');
      heading.textContent = title;
      paragraph.textContent = description;
      studyContent.append(heading, paragraph);
    });
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (
    event.clientX < rect.left || event.clientX > rect.right ||
    event.clientY < rect.top || event.clientY > rect.bottom
  )) dialog.close();
});
