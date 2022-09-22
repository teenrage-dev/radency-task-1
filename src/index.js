import renderNotesList from './js/noteListMakeMarkup';
import refs from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import openStatisticsNotes from './js/openNotesStatisitcs';
import deleteItem from './js/deleteItem';
import archivedCurrentItem from './js/archivedCurrentItem';
import { unArchivedAllItems } from './js/unArchivedFn/unArchivedAllItems';
import { unArchivedItem } from './js/unArchivedFn/unArchivedItem';
import { format } from 'date-fns';
import sprite from './images/sprite.svg';

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
  id: 'random-thought',
};
const statisticsByIdea = {
  active: 0,
  archived: 0,
  id: 'idea',
};

refs.isHidden.addEventListener('click', handleOpenModal);

function openStatisticsTaskNotes(e) {
  const {
    statisticsTaskModal,
    statisticsTaskModalClose,
    statisticsArchivedListTask,
  } = refs;

  const statisticsBtnOfOpen = refs.statisticsTask.children[3].firstElementChild;
  if (statisticsByTask.archived === 0) {
    statisticsBtnOfOpen.removeEventListener('click', openStatisticsTaskNotes);
    return;
  }

  openStatisticsNotes(
    statisticsTaskModal,
    statisticsTaskModalClose,
    statisticsArchivedListTask,
    statisticsByTask,
    refs.statisticsTask,
    unArchivedItem,
    unArchivedAllItems,
    refs.statisticsArchivedAllTask,
    handleItem
  );
}

function openStatisticsThoughtNotes(e) {
  const {
    statisticsThoughtModal,
    statisticsThoughtModalClose,
    statisticsArchivedListThought,
  } = refs;
  const statisticsBtnOfOpen =
    refs.statisticsThought.children[3].firstElementChild;
  if (statisticsByThought.archived === 0) {
    statisticsBtnOfOpen.removeEventListener(
      'click',
      openStatisticsThoughtNotes
    );
    return;
  }

  openStatisticsNotes(
    statisticsThoughtModal,
    statisticsThoughtModalClose,
    statisticsArchivedListThought,
    statisticsByThought,
    refs.statisticsThought,
    unArchivedItem,
    unArchivedAllItems,
    refs.statisticsArchivedAllThought,
    handleItem
  );
}

function openStatisticsIdeaNotes(e) {
  const {
    statisticsIdeaModal,
    statisticsIdeaModalClose,
    statisticsArchivedListIdea,
  } = refs;
  const statisticsBtnOfOpen = refs.statisticsIdea.children[3].firstElementChild;
  if (statisticsByIdea.archived === 0) {
    statisticsBtnOfOpen.removeEventListener('click', openStatisticsIdeaNotes);
    return;
  }

  openStatisticsNotes(
    statisticsIdeaModal,
    statisticsIdeaModalClose,
    statisticsArchivedListIdea,
    statisticsByIdea,
    refs.statisticsIdea,
    unArchivedItem,
    unArchivedAllItems,
    refs.statisticsArchivedAllIdea,
    handleItem
  );
}

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
    if (e.target.attributes[1]?.name === 'data-modal') {
      refs.modal.classList.add('is-hidden');
      removeEventListener();
    }
  }
  document.addEventListener('click', closeModalBackdrop);

  refs.name.addEventListener('change', handleChangeName);

  refs.category.addEventListener('change', handleChangeCategory);

  refs.content.addEventListener('change', handleChangeContent);

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
  if (refs.notesItem().length > 0) {
    refs.notesItem().forEach(item => {
      item.removeEventListener('click', handleItem);
    });
  }

  refs.archivedAll.removeEventListener('click', archivedAllItems);

  // refs.deleteAll.removeEventListener('click', deleteAllItems);

  refs.notesItem().forEach(item => {
    const taskItems = refs.notesList.querySelectorAll('.task');
    statisticsByTask.active = taskItems.length - statisticsByTask.archived;

    const thoughtItems = refs.notesList.querySelectorAll('.random-thought');
    statisticsByThought.active =
      thoughtItems.length - statisticsByThought.archived;

    const ideaItems = refs.notesList.querySelectorAll('.idea');
    statisticsByIdea.active = ideaItems.length - statisticsByIdea.archived;

    item.addEventListener('click', handleItem);
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
  note.name = '';
  note.category = '';
  note.content = '';
  note.dates = '';
  refs.modal.classList.add('is-hidden');

  refs.archivedAll.addEventListener('click', archivedAllItems);

  refs.deleteAll.addEventListener('click', deleteAllItems);
}

function archivedAllItems(e) {
  console.log(e);
  refs.notesItem().forEach(item => {
    if (item.classList.contains('task')) {
      console.dir(item.id);

      if (item.classList.contains('visually-hidden')) {
        return;
      } else {
        item.classList.add('visually-hidden');
        archivedCurrentItem(
          item,
          refs.statisticsTask,
          refs.statisticsArchivedListTask,
          statisticsByTask,
          openStatisticsTaskNotes
        );
      }
    }

    if (item.classList.contains('random-thought')) {
      console.dir(item.id);
      if (item.classList.contains('visually-hidden')) {
        return;
      } else {
        item.classList.add('visually-hidden');

        archivedCurrentItem(
          item,
          refs.statisticsThought,
          refs.statisticsArchivedListThought,
          statisticsByThought,
          openStatisticsThoughtNotes
        );
      }
    }
    if (item.classList.contains('idea')) {
      console.dir(item.id);
      if (item.classList.contains('visually-hidden')) {
        return;
      } else {
        item.classList.add('visually-hidden');

        item.classList.add('visually-hidden');

        archivedCurrentItem(
          item,
          refs.statisticsIdea,
          refs.statisticsArchivedListIdea,
          statisticsByIdea,
          openStatisticsIdeaNotes
        );
      }
    }
  });
}

function deleteAllItems(e) {
  const statisticsTaskBtnOfOpen =
    refs.statisticsTask.children[3].firstElementChild;
  const statisticsThoughtBtnOfOpen =
    refs.statisticsThought.children[3].firstElementChild;
  const statisticsIdeaBtnOfOpen =
    refs.statisticsIdea.children[3].firstElementChild;

  refs.notesList.innerHTML = '';
  refs.statisticsArchivedListTask.innerHTML = '';
  refs.statisticsArchivedListThought.innerHTML = '';
  refs.statisticsArchivedListIdea.innerHTML = '';

  statisticsByTask.active = 0;
  statisticsByTask.archived = 0;

  statisticsByThought.active = 0;
  statisticsByThought.archived = 0;

  statisticsByIdea.active = 0;
  statisticsByIdea.archived = 0;

  refs.statisticsTask.children[2].firstElementChild.textContent = 0;
  statisticsTaskBtnOfOpen.textContent = 0;

  refs.statisticsThought.children[2].firstElementChild.textContent = 0;
  statisticsThoughtBtnOfOpen.textContent = 0;

  refs.statisticsIdea.children[2].firstElementChild.textContent = 0;
  statisticsIdeaBtnOfOpen.textContent = 0;

  statisticsTaskBtnOfOpen.removeEventListener('click', openStatisticsTaskNotes);
  statisticsThoughtBtnOfOpen.removeEventListener(
    'click',
    openStatisticsThoughtNotes
  );
  statisticsIdeaBtnOfOpen.removeEventListener('click', openStatisticsIdeaNotes);
  refs.archivedAll.removeEventListener(
    'click',
    archivedAllItems,
    console.log('addEventListener')
  );
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

function handleItem(e) {
  const btnEdit = e.target.closest('#edit');
  const btnArchived = e.target.closest('#archived');
  const btnDelete = e.target.closest('#delete');

  if (btnEdit) {
    refs.formEdit.removeEventListener('submit', handleEditSubmit);
    refs.modalEdit.classList.remove('is-hidden');
    current = e.currentTarget;

    function removeEventListener() {
      refs.modalEditCLose.removeEventListener('click', closeModalBtn);
      document.removeEventListener('keydown', closeModalKey);
      document.removeEventListener('click', closeModalBackdrop);
      refs.nameEdit.removeEventListener('change', handleChangeName);

      refs.categoryEdit.removeEventListener('change', handleChangeCategory);

      refs.contenEdit.removeEventListener('change', handleChangeContent);

      refs.datesEdit.removeEventListener('change', handleChangeDates);

      refs.formEdit.removeEventListener('submit', handleEditSubmit);
    }

    function closeModalBtn() {
      refs.modalEdit.classList.add('is-hidden');
      removeEventListener();
    }

    refs.modalEditCLose.addEventListener('click', closeModalBtn);

    function closeModalKey(e) {
      if (e.key === 'Escape') {
        refs.modalEdit.classList.add('is-hidden');
        removeEventListener();
      }
    }

    document.addEventListener('keydown', closeModalKey);

    function closeModalBackdrop(e) {
      if (e.target.attributes[1]?.name === 'data-edit-modal') {
        refs.modalEdit.classList.add('is-hidden');
        removeEventListener();
      }
    }
    document.addEventListener('click', closeModalBackdrop);

    refs.nameEdit.addEventListener('change', handleChangeName);

    refs.categoryEdit.addEventListener('change', handleChangeCategory);

    refs.contenEdit.addEventListener('change', handleChangeContent);

    refs.datesEdit.addEventListener('change', handleChangeDates);

    refs.formEdit.addEventListener('submit', handleEditSubmit);

    function handleEditSubmit(event) {
      event.preventDefault();
      // if (note.name === '') {
      //   Notify.warning('Write Note Name!');
      //   return;
      // }

      if (note.category === '') {
        note.category = 'Task';
      }

      // if (note.content === '') {
      //   Notify.warning('Write your message!');
      //   return;
      // }

      let fromDay = null;
      let toDay = null;
      let icon = '';
      let id = '';

      if (note.dates !== '') {
        fromDay = format(new Date(), 'd/M/yyyy');
        toDay = format(new Date(note.dates), 'd/M/yyyy');
      } else {
        fromDay = '';
        toDay = '';
      }

      switch (note.category) {
        case 'Task':
          icon = `${sprite}#icon-shop`;
          id = 'task';
          break;
        case 'Random Thought':
          icon = `${sprite}#icon-thought`;
          id = 'random-thought';
          break;
        case 'Idea':
          icon = `${sprite}#icon-idea`;
          id = 'idea';
          break;
        default:
          return;
      }
      if (current?.classList[1] !== id) {
        if (current.classList[1] === statisticsByTask.id) {
          statisticsByTask.active -= 1;
          refs.statisticsTask.children[2].firstElementChild.textContent =
            statisticsByTask.active;
        }
        if (current.classList[1] === statisticsByThought.id) {
          statisticsByThought.active -= 1;
          refs.statisticsThought.children[2].firstElementChild.textContent =
            statisticsByThought.active;
        }
        if (current.classList[1] === statisticsByIdea.id) {
          statisticsByIdea.active -= 1;
          refs.statisticsIdea.children[2].firstElementChild.textContent =
            statisticsByIdea.active;
        }
        if (id === statisticsByTask.id) {
          statisticsByTask.active += 1;
          refs.statisticsTask.children[2].firstElementChild.textContent =
            statisticsByTask.active;
        }
        if (id === statisticsByThought.id) {
          statisticsByThought.active += 1;
          refs.statisticsThought.children[2].firstElementChild.textContent =
            statisticsByThought.active;
        }
        if (id === statisticsByIdea.id) {
          statisticsByIdea.active += 1;
          refs.statisticsIdea.children[2].firstElementChild.textContent =
            statisticsByIdea.active;
        }
        current.classList.remove(current.classList[1]);

        current.classList.add(id);
        current.children[0].firstElementChild.innerHTML = `<svg class="item-icon" width="23" height="23">
              <use xlink:href="${icon}"></use>
            </svg>`;
        current.children[3].textContent = note.category;
      }
      current.children[1].textContent = note.name;
      current.children[4].textContent = note.content;
      current.children[5].textContent = `${fromDay}${
        fromDay === '' ? '' : ', '
      }  ${toDay}`;

      event.currentTarget.reset();
      note.name = '';
      note.category = '';
      note.content = '';
      note.dates = '';

      refs.modalEdit.classList.add('is-hidden');
    }
  }

  if (btnArchived) {
    e.currentTarget.classList.add('visually-hidden');
    e.currentTarget.removeEventListener('click', handleItem);
    if (e.currentTarget.classList.contains('task')) {
      archivedCurrentItem(
        e.currentTarget,
        refs.statisticsTask,
        refs.statisticsArchivedListTask,
        statisticsByTask,
        openStatisticsTaskNotes
      );
    }
    if (e.currentTarget.classList.contains('random-thought')) {
      archivedCurrentItem(
        e.currentTarget,
        refs.statisticsThought,
        refs.statisticsArchivedListThought,
        statisticsByThought,
        openStatisticsThoughtNotes
      );
    }
    if (e.currentTarget.classList.contains('idea')) {
      archivedCurrentItem(
        e.currentTarget,
        refs.statisticsIdea,
        refs.statisticsArchivedListIdea,
        statisticsByIdea,
        openStatisticsIdeaNotes
      );
    }
  }

  if (btnDelete) {
    e.currentTarget.remove();
    deleteItem(e, statisticsByTask, refs.statisticsTask);
    deleteItem(e, statisticsByThought, refs.statisticsThought);
    deleteItem(e, statisticsByIdea, refs.statisticsIdea);
    e.currentTarget.removeEventListener('click', handleItem);
  }
}
