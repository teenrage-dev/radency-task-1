import refs from '../refs';

export function unArchivedItem(
  list,
  statistics,
  statisticsText,
  statisticsModal,
  handleItem
) {
  list.querySelectorAll('.visually-hidden').forEach(item => {
    item.classList.remove('visually-hidden');

    const itemBtnArchived = item.querySelector('#archived');

    itemBtnArchived.addEventListener('click', e => {
      refs.notesItem().forEach(notes => {
        if (item.id === notes.id) {
          statistics.archived -= 1;
          statistics.active += 1;
          statisticsText.children[2].firstElementChild.textContent =
            statistics.active;
          statisticsText.children[3].firstElementChild.textContent =
            statistics.archived;
          notes.classList.remove('visually-hidden');
          item.remove();
          notes.addEventListener('click', handleItem);
        }
      });

      if (statistics.archived === 0) {
        statisticsModal.classList.add('statistics-is-hidden');
      }
    });
  });
}
