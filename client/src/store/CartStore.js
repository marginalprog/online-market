import { makeAutoObservable } from "mobx";

export default class CartStore {
  constructor() {
    this._items = [];
    this._totalItems = 0;
    this._totalPrice = 0;
    makeAutoObservable(this);

    this.loadCartFromLocalStorage();
  }

  get totalPrice() {
    return this._totalPrice;
    // this._items.reduce(
    //   (total, item) => total + item.price * item.quantity,
    //   0
    // );
  }

  get totalItems() {
    return this._totalItems;
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

    this.updateTotals();
    this.saveCartToLocalStorage();
  }

  removeFromCart(id) {
    this._items = this._items.filter(item => item.id !== id);
    this.updateTotals();
    this.saveCartToLocalStorage();
  }

  clearCart() {
    this._items.length = 0;
    this.updateTotals();
    this.saveCartToLocalStorage();
  }

  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      this._items = JSON.parse(storedCart);
      this.updateTotals();
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this._items));
  }

  updateTotals() {
    this._totalItems = this._items.length;
    this._totalPrice = this._items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
