export function showButtonOnScrollDown(scrollYValue, buttonElement) {
    // main_container.style.transform = `translateY(${1 - valueScrollY * 0.05 + "%"})`;
    if (scrollYValue > 20 || document.documentElement.scrollTop > 20) {
        buttonElement.style.display = "block";
    } else {
        buttonElement.style.display = "none";
    }
}