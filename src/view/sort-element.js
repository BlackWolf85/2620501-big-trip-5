import AbstractView from '../framework/view/abstract-view.js';

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const sortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SortType.DAY}" ${currentSortType === SortType.DAY ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.DAY}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" data-sort-type="${SortType.EVENT}" disabled>
      <label class="trip-sort__btn" for="sort-event" data-sort-type="${SortType.EVENT}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.TIME}" ${currentSortType === SortType.TIME ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE}" ${currentSortType === SortType.PRICE ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" data-sort-type="${SortType.OFFER}" disabled>
      <label class="trip-sort__btn" for="sort-offer" data-sort-type="${SortType.OFFER}">Offers</label>
    </div>
  </form>`
);

export default class SortElement extends AbstractView {
  #handleSortChange = null;
  #currentSortType = null;

  constructor({currentSortType = SortType.DAY, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortChange = onSortTypeChange;
    this.element.addEventListener('click', this.#onSortClick);
  }

  get template() {
    return sortTemplate(this.#currentSortType);
  }

  #onSortClick = (evt) => {
    const sortItem = evt.target.closest('[data-sort-type]');

    if (!sortItem){
      return;
    }

    const sortType = sortItem.dataset.sortType;
    const input = this.element.querySelector(`#sort-${sortType}`);

    if (input?.disabled) {
      evt.preventDefault();
      return;
    }

    if (sortType && sortType !== this.#currentSortType) {
      evt.preventDefault();
      this.#handleSortChange(sortType);
    }
  };
}
