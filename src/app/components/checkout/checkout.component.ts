import { Component, OnInit } from '@angular/core';
import { ProductsServicesTsService } from '../../services/products.services.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { CheckoutServiceTsService } from '../../services/checkout.service.ts.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  activeid: any;
  product: any;
  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  totalPrice = 0;
  tax = 0;
  subtotal = 0;
  gstpercent = 18;
  states = ['Maharashtra', 'Delhi', 'Gujarat', 'Karnataka'];
  constructor(
    private productService: ProductsServicesTsService,
    private activeRoute: ActivatedRoute,
    private CheckoutService: CheckoutServiceTsService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.activeid =  this.activeRoute.snapshot.params['id'];
    // this.getProduct(this.activeid);
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, this.futureDateValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });

    //this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.getProduct();
    this.calculateTotal();
  }

  getProduct() {
    this.product = JSON.parse(localStorage.getItem('product')!); //ToDo integrate .. cart in that
    console.log('product', this.product);
  }

  get email() {
    return this.checkoutForm.get('email')!;
  }

  get phone() {
    return this.checkoutForm.get('phone')!;
  }

  get cardNumber() {
    return this.checkoutForm.get('cardNumber')!;
  }

  get expiryDate() {
    return this.checkoutForm.get('expiryDate')!;
  }

  get cvv() {
    return this.checkoutForm.get('cvv')!;
  }

  futureDateValidator(control: any) {
    const value = control.value;
    const isValid =
      moment(value, 'MM/YY', true).isValid() &&
      moment(value, 'MM/YY').isAfter(moment());
    return isValid ? null : { invalidDate: true };
  }

  calculateTotal() {
    // this.totalPrice = this.cartItems.reduce((total, item) => {
    this.subtotal =  this.product.price * this.product.quantity;
    this.tax = this.subtotal * (this.gstpercent / 100);
    this.totalPrice = this.subtotal + this.tax;
  }

  // calculateTotal() {
  //   this.totalPrice = this.cartItems.reduce((total, item) => {
  //     return total + (item.price + item.tax) * item.quantity;
  //   }, 0);
  // }

  submit() {
    if (this.checkoutForm.valid) {
      console.log('Order submitted:', this.checkoutForm.value);

      this.CheckoutService.addCheckout(
        this.checkoutForm.value,
        this.product,
        this.totalPrice,
        this.subtotal,
        this.tax,
      ).subscribe((data:any) => {
        if (data) {
          console.log('checkout added');
          console.log("data in checkout",data);

          localStorage.setItem("OrderId",data.data.order._id)
          //redirect to thank you page..
          this.router.navigate(['thankyou']);
        }
      });
    }
  }
}
