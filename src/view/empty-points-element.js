import AbstractView from '../framework/view/abstract-view.js';
import {Filters} from '../constants.js';

const emptyMessages = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.PAST]: 'There are no past events now',
  [Filters.PRESENT]: 'There are no present events now',
  [Filters.FUTURE]: 'There are no future events now',
};

const createEmptyTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class EmptyPointElement extends AbstractView {
  #message = null;

  constructor({messageType = FilterType.EVERYTHING, customMessage = null} = {}) {
    super();
    if (customMessage !== null) {
      this.#message = customMessage;
    } else {
      this.#message = emptyMessages[messageType] || emptyMessages[FilterType.EVERYTHING];
    }
  }

  get template() {
    return createEmptyTemplate(this.#message);
  }
}
