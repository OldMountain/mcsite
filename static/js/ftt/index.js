;
var img = ["2.jpg", "2.png", "3.png", "4.png"];
var index = 3;
var rootPath = "static/images/banner/";
$(function () {
    $(".banner .dot").before('<img class="active" src="' + rootPath + img[0] + '">')
    $(".banner .dot").append('<span class="active"></span>')
    for (var i = 1; i < img.length; i++) {
        $(".banner .dot").before('<img src="' + rootPath + img[i] + '">')
        $(".banner .dot").append('<span></span>')
    }
    toogleBanner();
    setInterval('toogleBanner()', 5000);
})

function toogleBanner() {
    $(".banner").find("img").eq(index).animate({"opacity":"0"},600);
    if(index % img.length == 3){
        index = 0;
    }else{
        index ++ ;
    }
    $(".banner").find("img").eq(index).animate({"opacity":"1"},1000);
    $(".banner .dot").find("span").removeClass("active");
    $(".banner .dot").find("span").eq(index).addClass("active")
}