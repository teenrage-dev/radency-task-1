function archivedCurrentItem(
  currentItem,
  statisticsItem,
  statisticsArchivedListItem,
  statisticsByItem,
  openStatisticsItemNotes
) {
  const statisticsBtnOfOpen = statisticsItem.children[3].firstElementChild;
  statisticsByItem.archived += 1;
  statisticsByItem.active -= 1;

  statisticsItem.children[2].firstElementChild.textContent =
    statisticsByItem.active;
  statisticsBtnOfOpen.textContent = statisticsByItem.archived;

  statisticsArchivedListItem.insertAdjacentHTML(
    'beforeend',
    currentItem.outerHTML
  );
  if (statisticsByItem.archived > 0) {
    statisticsBtnOfOpen.addEventListener('click', openStatisticsItemNotes);
  }
}

export default archivedCurrentItem;
