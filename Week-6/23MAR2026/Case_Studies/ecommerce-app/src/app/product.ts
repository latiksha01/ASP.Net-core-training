export class Product {
    public ProductID: number;
    public name: string;
    public price: number;

    constructor(ProductID: number, name: string, price: number) {
        this.ProductID = ProductID;
        this.name = name;
        this.price = price;
    }
}
