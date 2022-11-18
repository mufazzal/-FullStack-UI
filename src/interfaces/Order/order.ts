import OrderStatuses from '@modals/common/OrderStatus'
import OrderTrackingStatuses from '@modals/common/OrderTrackStatus'
import PaymentMethodes from '@modals/common/paymentMethodes'

export interface OrderModal {
  orderId: string
  orderDate: string
  productDesc?: string
}

export interface OrderDetailModal {
  orderId: string
  orderDate: string
  latestOrderStatus: OrderStatuses
  productDetail?: OrderedProductDetailModal
  trackingDetail?: OrderTrackingDetailModal
  paymentDetail?: OrderPaymentDetailModal
}

export interface OrderedProductDetailModal {
  productId: string
  productName: string
}

export interface TrackingCheckPoint {
  milestoneName: string
  timeReached?: string
  timeLeft?: string
}

export interface OrderTrackingDetailModal {
  trackId: string
  latestTrackStatus: OrderTrackingStatuses
  lastStatusTime?: string
  commnet?: string
  coveredCheckPoint?: TrackingCheckPoint[]
}

export interface OrderPaymentDetailModal {
  payMentMode: PaymentMethodes
  paymentUid: string
}

export interface OrderSearchQuery {
  orderId?: string
}
