const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "JPY"
  })
  
  export default function formatCurrency(amount) {
    return formatter.format(amount)
  }