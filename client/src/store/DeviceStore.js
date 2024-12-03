import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  setIsA;

  constructor() {
    this._types = [
      { id: 1, name: "Холодильники" },
      { id: 2, name: "Смартфоны" },
      { id: 3, name: "Наушники" },
      { id: 4, name: "Телевизоры" }
    ];
    this._brands = [
      { id: 1, name: "Samsung" },
      { id: 2, name: "Apple" },
      { id: 3, name: "Samsung" },
      { id: 4, name: "Apple" },
      { id: 5, name: "Samsung" },
      { id: 6, name: "Apple" }
    ];
    this._devices = [
      {
        id: 1,
        name: "IPhone 12 Pro",
        price: 85000,
        rating: 5,
        reviews: 0,
        img:
          "https://m.media-amazon.com/images/I/61DreMaVplL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        id: 2,
        name: "IPhone 12 Pro Max",
        price: 85000,
        rating: 5,
        reviews: 0,
        img:
          "https://m.media-amazon.com/images/I/61DreMaVplL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        id: 3,
        name: "IPhone 13 Pro",
        price: 85000,
        rating: 5,
        reviews: 0,
        img:
          "https://m.media-amazon.com/images/I/61DreMaVplL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        id: 4,
        name: "IPhone 13 Pro Max",
        price: 85000,
        rating: 5,
        reviews: 0,
        img:
          "https://m.media-amazon.com/images/I/61DreMaVplL._AC_UF1000,1000_QL80_.jpg"
      }
    ];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
}
