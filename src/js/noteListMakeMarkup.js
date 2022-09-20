import refs from './refs';
import sprite from '../images/sprite.svg';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';

function noteListMakeMarkup({ name, category, content, dates }) {
  const curentDay = format(new Date(), 'MMM dd, yyyy');
  let fromDay = null;
  let toDay = null;

  if (dates !== '') {
    fromDay = format(new Date(), 'd/M/yyyy');
    toDay = format(new Date(dates), 'd/M/yyyy');
  } else {
    fromDay = '';
    toDay = '';
  }

  let icon = '';
  let id = '';

  switch (category) {
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

  return `
      <li class="notes-item ${id}" id="${nanoid()}">
      <div class="notes-item-container">
        <svg class="item-icon" width="23" height="23">
          <use xlink:href="${icon}"></use>
        </svg>
      </div>
      <div class="notes-item-item">
        <h2 class="notes-title">${name}</h2>
      </div>
      <p class="notes-text notes-item-item">${curentDay}</p>
      <p class="notes-text notes-item-item">${category}</p>
      <p class="notes-text notes-item-item">
        ${content}
      </p>
      <p class="notes-text notes-item-item">
      ${fromDay}${fromDay === '' ? '' : ', '}  ${toDay} 
      </p>
      <button id="edit" class="notes-item-btn notes-item-item">
        <svg class="item-icon notes-icon" width="23" height="23">
          <use xlink:href="${sprite}#icon-edit"></use>
        </svg>
      </button>
      <button id="archived" class="notes-item-btn notes-item-item">
        <svg class="item-icon notes-icon" width="23" height="23">
          <use xlink:href="${sprite}#icon-archieved"></use>
        </svg>
      </button>
      <button id="delete" class="notes-item-btn notes-item-item">
        <svg class="item-icon notes-icon" width="23" height="23">
          <use xlink:href="${sprite}#icon-delete"></use>
        </svg>
      </button>
      </li>
  `;
}

function renderNotesList(note) {
  refs.notesList.insertAdjacentHTML('beforeend', noteListMakeMarkup(note));
}

export default renderNotesList;
