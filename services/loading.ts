export const openLoading = () => {
    let elem = document.getElementById("wrapper-so-cheap-loading");
    if (elem){
        elem.style.display = "flex";
    }
}
export const closeLoading = () => {
    let elem = document.getElementById("wrapper-so-cheap-loading");
    if (elem){
        elem.style.display = "none";
    }
}