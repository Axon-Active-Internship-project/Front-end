import { IProduct } from "../../interfaces";

const images = [
  "https://s1.storage.5giay.vn/image/2016/10/20161021_b84b6337cc54488264598cf7e498eeff_1477033027.jpg",
  "https://product.hstatic.net/200000598299/product/upload_2acf4bc9fe4b4f9d9086c490831f6a42_1024x1024.jpg",
  "https://www.sieuthimiennam.vn/upload/files/STMN/rong-bien-rang-me.jpg",
  "https://amthucnamchau.org/wp-content/uploads/2017/06/cach-lam-cha-ca-don-gian-thom-ngon-nhat-tai-nha.jpg",
];

const names = ["nem chả", "bánh tráng phơi sương", "rong biển sấy", "Chả cá"];

const price = ["10000", "2000", "35000", "15000"];

const sale_price = ["95000", "2000", "35000", "14000"];

const products: Array<IProduct> = [];

for (let i = 0; i < 100; i++) {
  const index = Math.floor(Math.random() * images.length);
  const object = {
    id: i,
    name: names[index],
    src: images[index],
    price: price[index],
    sale_price: sale_price[index],
  };
  products.push(object);
}

export default products;
