const refs = {
  isHidden: document.querySelector('#create'),
  modal: document.querySelector('[data-modal]'),
  modalCLose: document.querySelector('[data-modal-close]'),
  form: document.querySelector('.modal-form'),
  name: document.querySelector('#name-input'),
  category: document.querySelector('#category'),
  content: document.querySelector('#content-text'),
  dates: document.querySelector('#dates-input'),
  notesList: document.querySelector('#notes-list'),
  notesItem: function () {
    return this.notesList.querySelectorAll('.notes-item');
  },
  statisticsTask: document.querySelector('#statistics-task'),
  statisticsThought: document.querySelector('#statistics-thought'),
  statisticsIdea: document.querySelector('#statistics-idea'),
  statisticsBtn: document.querySelectorAll('.statistics-btn'),
  deleteAll: document.querySelector('#delete-all'),
};

export default refs;
