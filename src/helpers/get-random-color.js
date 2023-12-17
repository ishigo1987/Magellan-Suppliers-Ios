export default function getRandomColor(){

     const randomColors = ["#d84315", "#ffa726", "#388e3c", "#009688", "#0277bd", "#512da8", "#1565c0", "#d32f2f", "#ad1457", "#9c27b0", "#00b8d4", "#ffb74d", "#212121", "#37474f", "#ff6f00", "#00c853", "#3f51b5", "#c51162"];

     const min = Math.ceil(0);
    
     const max = Math.floor(randomColors.length);

     const randomNumber = Math.floor(Math.random() * (max - min)) + min;

     return randomColors[randomNumber];
}