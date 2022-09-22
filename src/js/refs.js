const refs = {
  isHidden: document.querySelector('#create'),
  modal: document.querySelector('[data-modal]'),
  modalCLose: document.querySelector('[data-modal-close]'),
  form: document.querySelector('#modal-form'),
  name: document.querySelector('#name-input'),
  category: document.querySelector('#category'),
  content: document.querySelector('#content-text'),
  dates: document.querySelector('#dates-input'),

  modalEdit: document.querySelector('[data-edit-modal]'),
  modalEditCLose: document.querySelector('[data-edit-modal-close]'),
  formEdit: document.querySelector('#modal-edit-form'),
  editBtnForm: document.querySelector('#edit-btn-form'),
  nameEdit: document.querySelector('#name-edit-input'),
  categoryEdit: document.querySelector('#category-edit'),
  contenEdit: document.querySelector('#content-edit-text'),
  datesEdit: document.querySelector('#dates-edit-input'),

  notesList: document.querySelector('#notes-list'),
  notesItem: function () {
    return this.notesList.querySelectorAll('.notes-item');
  },
  deleteAll: document.querySelector('#delete-all'),
  archivedAll: document.querySelector('#archived-all'),

  statisticsArchivedAllTask: document.querySelector(
    '#statistics-archived-all-task'
  ),
  statisticsArchivedAllThought: document.querySelector(
    '#statistics-archived-all-thought'
  ),
  statisticsArchivedAllIdea: document.querySelector(
    '#statistics-archived-all-idea'
  ),

  statisticsArchivedListTask: document.querySelector(
    '#statistics-archived-list-task'
  ),
  statisticsArchivedListThought: document.querySelector(
    '#statistics-archived-list-thought'
  ),
  statisticsArchivedListIdea: document.querySelector(
    '#statistics-archived-list-idea'
  ),

  statisticsTask: document.querySelector('#statistics-task'),
  statisticsThought: document.querySelector('#statistics-thought'),
  statisticsIdea: document.querySelector('#statistics-idea'),
  statisticsBtn: document.querySelectorAll('.statistics-btn'),
  statisticsTaskModal: document.querySelector('[data-statistics-task-modal]'),
  statisticsTaskModalClose: document.querySelector(
    '[data-statistics-task-modal-close]'
  ),
  statisticsThoughtModal: document.querySelector(
    '[data-statistics-thougth-modal]'
  ),
  statisticsThoughtModalClose: document.querySelector(
    '[data-statistics-thougth-modal-close]'
  ),
  statisticsIdeaModal: document.querySelector('[data-statistics-idea-modal]'),
  statisticsIdeaModalClose: document.querySelector(
    '[data-statistics-idea-modal-close]'
  ),
};

export default refs;
