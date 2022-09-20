function deleteItem(e, statisticsByCastegory, statistics) {
  if (e.currentTarget.classList.contains(`${statisticsByCastegory.id}`)) {
    statisticsByCastegory.active -= 1;

    statistics.children[2].firstElementChild.textContent =
      statisticsByCastegory.active;
  }
}

export default deleteItem;
