import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsServicesTsService } from '../../services/products.services.ts.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit,OnDestroy {
  product: any;
  selectedColor: any;
  selectedSize: any;
  quantity: any = 1;
  mainImage:any;
  maxquantity:number = 0;
  pollSub:any;
  constructor(
    private productservice: ProductsServicesTsService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getproduct();
    console.log('prd', this.product);

    this.pollSub = interval(10000).subscribe(() => {
      this.refreshStock();
    });
  }

  refreshStock(){
    if (!this.product?._id) return;

    this.productservice.getproductid(this.product._id).subscribe((res: any) => {
      this.maxquantity = res.data.quantitys;
      console.log('Updated stock:', this.maxquantity);
    });
  }

  checkquantity() {
    console.log('in check quantity');
    if (this.maxquantity > 0) {
      if (this.quantity > this.maxquantity) {
        this.quantity = this.maxquantity;
        alert(`${this.maxquantity} quantity in stock`);
      } else if (this.quantity <= 0) {
        this.quantity = 1;
        alert(`product quantity should be atleast 1`);
      }
    }
  }
  getproduct() {
    this.productservice.getproduct().subscribe((data: any) => {
      console.log('data', data['data'][0]);
      this.product = data['data'][0];
      this.selectedColor = this.product.colors[0];
      this.selectedSize = this.product.sizes[0];
      this.mainImage = this.product.images[0];
      this.refreshStock();
    });
  }
  selectImage(image: string) {
    this.product.images.unshift(
      this.product.images.splice(this.product.images.indexOf(image), 1)[0]
    );
    this.mainImage = image;
  }
  buyProduct() {
    localStorage.setItem(
      'product',
      JSON.stringify({
        ProductId: this.product._id,
        image: this.product.images[0],
        title: this.product.title,
        color: this.selectedColor,
        size: this.selectedSize,
        quantity: this.quantity,
        price: this.product.price,
      })
    );

    this.router.navigate(['checkout']);
  }

  ngOnDestroy(): void {
      if (this.pollSub) this.pollSub.unsubscribe();
  }

}
