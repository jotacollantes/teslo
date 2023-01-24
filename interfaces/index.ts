import { ShippingAddress } from './paypal';
export * from './products'
export * from './cart'
export * from './user'
export * from './order'
//*Como la interface de paypal incluye shippingaddress se puede confundir con nuestra interfaz ShippingAddress por eso lo delcaramos de la siguiente manera:
export * as IPaypal from './paypal'