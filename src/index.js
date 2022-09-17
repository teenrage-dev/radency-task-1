import renderNotesList from './js/noteListMakeMarkup';
import refs from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const note = {
  name: '',
  created: '',
  category: '',
  content: '',
  dates: '',
};

const statisticsByTask = {
  active: 0,
  archived: 0,
  id: 'task',
};
const statisticsByThought = {
  active: 0,
  archived: 0,
  id: 'thought',
};
const statisticsByIdea = {
  active: 0,
  archived: 0,
  id: 'idea',
};

refs.isHidden.addEventListener('click', handleOpenModal);

function handleOpenModal(e) {
  refs.modal.classList.remove('is-hidden');

  function removeEventListener() {
    refs.modalCLose.removeEventListener('click', closeModalBtn);
    document.removeEventListener('keydown', closeModalKey);
    document.removeEventListener('click', closeModalBackdrop);
  }

  function closeModalBtn() {
    refs.modal.classList.add('is-hidden');
    removeEventListener();
  }

  refs.modalCLose.addEventListener('click', closeModalBtn);

  function closeModalKey(e) {
    if (e.key === 'Escape') {
      refs.modal.classList.add('is-hidden');
      removeEventListener();
    }
  }

  document.addEventListener('keydown', closeModalKey);

  function closeModalBackdrop(e) {
    if (e.target.attributes[1].name === 'data-modal') {
      refs.modal.classList.add('is-hidden');
      removeEventListener();
    }
  }
  document.addEventListener('click', closeModalBackdrop);

  refs.name.addEventListener('change', handleChangeName);

  refs.category.addEventListener('change', handleChangeCategory);

  refs.content.addEventListener('change', handleChangeContent);

  refs.dates.addEventListener('change', handleChangeDates);

  refs.form.addEventListener('submit', handleSubmitForm);
}

function handleSubmitForm(e) {
  e.preventDefault();

  if (note.name === '') {
    Notify.warning('Write Note Name!');
    return;
  }

  if (note.category === '') {
    note.category = 'Task';
  }

  if (note.content === '') {
    Notify.warning('Write your message!');
    return;
  }
  renderNotesList(note);
  if (refs.notesItem().length > 1) {
    refs.notesItem().forEach(item => {
      item.removeEventListener('click', handleDeleteItem);
    });
  }

  refs.notesItem().forEach(item => {
    const taskItems = document.querySelectorAll('#task');
    statisticsByTask.active = taskItems.length - statisticsByTask.archived;

    const thoughtItems = document.querySelectorAll('#random-thought');
    statisticsByThought.active =
      thoughtItems.length - statisticsByThought.archived;

    const ideaItems = document.querySelectorAll('#idea');
    statisticsByIdea.active = ideaItems.length - statisticsByIdea.archived;

    item.addEventListener('click', handleDeleteItem);
  });
  if (statisticsByTask.active > 0 || statisticsByTask.archived > 0) {
    refs.statisticsTask.children[2].firstElementChild.textContent =
      statisticsByTask.active;
    refs.statisticsTask.children[3].firstElementChild.textContent =
      statisticsByTask.archived;
  }

  if (statisticsByThought.active > 0 || statisticsByThought.archived > 0) {
    refs.statisticsThought.children[2].firstElementChild.textContent =
      statisticsByThought.active;
    refs.statisticsThought.children[3].firstElementChild.textContent =
      statisticsByThought.archived;
  }

  if (statisticsByIdea.active > 0 || statisticsByIdea.archived > 0) {
    refs.statisticsIdea.children[2].firstElementChild.textContent =
      statisticsByIdea.active;
    refs.statisticsIdea.children[3].firstElementChild.textContent =
      statisticsByIdea.archived;
  }
  e.currentTarget.reset();

  refs.deleteAll.addEventListener('click', e => {
    refs.notesList.innerHTML = '';

    refs.statisticsTask.children[2].firstElementChild.textContent = 0;
    refs.statisticsTask.children[3].firstElementChild.textContent = 0;

    refs.statisticsThought.children[2].firstElementChild.textContent = 0;
    refs.statisticsThought.children[3].firstElementChild.textContent = 0;

    refs.statisticsIdea.children[2].firstElementChild.textContent = 0;
    refs.statisticsIdea.children[3].firstElementChild.textContent = 0;
  });
}

function handleChangeName(e) {
  note.name = e.target.value;
}

function handleChangeCategory(e) {
  note.category = e.target.value;
}

function handleChangeContent(e) {
  note.content = e.target.value;
}

function handleChangeDates(e) {
  note.dates = e.target.value;
}

function handleDeleteItem(e) {
  const btn = e.target.parentNode.classList.contains('notes-icon');
  if (e.target === e.currentTarget) {
    console.log(e.target);
  }
  if (btn) {
    console.log(e.target, e.currentTarget);
    e.currentTarget.remove();
    e.currentTarget.removeEventListener('click', handleDeleteItem);
  }
}
