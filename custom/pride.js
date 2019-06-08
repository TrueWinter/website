window.addEventListener('load', function() {
  var script = document.createElement('script');
  script.src='https://cdnjs.cloudflare.com/ajax/libs/egg.js/1.0/egg.min.js';
  document.body.appendChild(script);
  script.onload = function() {
    var pride = new Egg();
    pride.addCode("p,r,i,d,e", function() {
        document.getElementsByClassName('page-header')[0].style.backgroundImage='url("https://wd-static1.ndt3.me/img/pride.png")';
        document.getElementsByClassName('page-header')[0].style.backgroundRepeat='round';
      })
      .addHook(function(){
        console.log("Hook called for: " + this.activeEgg.keys);
        console.log(this.activeEgg.metadata);
      }).listen();
  };
});
