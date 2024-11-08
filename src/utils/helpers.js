export function calculateTotalPrice(dishes) {
    return dishes.reduce((total, dish) => total + dish.price, 0);
  }
  
  export function calculateAverageHealthScore(dishes) {
    const totalHealthScore = dishes.reduce((total, dish) => total + dish.healthScore, 0);
    return totalHealthScore / dishes.length;
  } 