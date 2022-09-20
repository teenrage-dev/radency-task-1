function openStatisticsNotes(
  statisticsModal,
  statisticsModalClose,
  statisticsArchivedList,
  statisticsByCastegory,
  statisticsItem,
  unArchivedItem,
  unArchivedAllItems,
  statisticsArchivedAll,
  handleItem
) {
  statisticsModalClose.removeEventListener('click', closeModalBtn);
  statisticsModal.classList.remove('statistics-is-hidden');

  function closeModalBtn() {
    statisticsModal.classList.add('statistics-is-hidden');
  }

  statisticsModalClose.addEventListener('click', closeModalBtn);

  statisticsArchivedList
    .querySelectorAll(`.${statisticsByCastegory.id}`)
    .forEach(item => {
      const itemBtnEdit = item.querySelector('#edit');
      if (itemBtnEdit !== null) {
        itemBtnEdit.remove();
      }
      const itemBtnDelete = item.querySelector('#delete');
      if (itemBtnDelete !== null) {
        itemBtnDelete.remove();
      }
    });

  unArchivedItem(
    statisticsArchivedList,
    statisticsByCastegory,
    statisticsItem,
    statisticsModal,
    handleItem
  );
  unArchivedAllItems(
    statisticsArchivedList,
    statisticsByCastegory,
    statisticsItem,
    statisticsModal,
    handleItem,
    statisticsArchivedAll
  );
}

export default openStatisticsNotes;
