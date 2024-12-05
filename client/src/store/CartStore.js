import { makeAutoObservable } from "mobx";

export default class CartStore {
  constructor() {
    this._items = [];
    makeAutoObservable(this);
  }

  get totalPrice() {
    return this._items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  get totalItems() {
    return this._items.reduce((total, item) => total + item.quantity, 0);
  }

  get items() {
    return this._items;
  }

  addToCart(device) {
    const existingItem = this._items.find(item => item.id === device.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this._items.push({ ...device, quantity: 1 });
    }
  }

  removeFromCart(id) {
    this._items = this._items.filter(item => item.id !== id);
  }

  clearCart() {
    this._items = [];
  }
}
