$(document).ready(function() {

   var sizePlane = $("#plane").width();


   var bodyWidth = $("#plateauJeu").width();
   var bodyHeight = $("#plateauJeu").height();
   //On positionne l'avion en bas de la div au centre
   $("#plane").css('top',bodyHeight-sizePlane);
   $("#plane").css('left',bodyWidth/2);


   //variable pour arreter la comparaison de collision
   var flag = false;
   var keys = {}
   var planeMove=setInterval(movePlane, 20);
   var moveBouncers = setInterval(move, 20);
   var spawnBouncers = setInterval(spawner, 600);
   var timer = setInterval(addSeconds, 1000);
   var time = 0;
   var score = 0;

   function addSeconds(){
      time++;
      $("#timer").text("Secondes : " + time.toString() + "/120");
      if(time>=120){
         var r=confirm("Vous avez gagné ! Voulez vous recommencer ?");
         if (r == true) {
            location.reload();
         } else {
            flag=true;
            abortTimer();
         }
      }
   }

   function abortTimer() { // to be called when you want to stop the timer
      clearInterval(planeMove);
      clearInterval(moveBouncers);
      clearInterval(spawnBouncers);
      clearInterval(timer);
   }

   function move(){
      $(".bouncer").css('top', '+=3px');


      $('.bouncer').each(function() {
         if ($(this).position().top > bodyHeight) {
            $(this).remove();
         }
      });
   }
   function spawner() {

      var randPosX = Math.floor((Math.random()*bodyWidth));

      var sizeAsteroid=$(".bouncer").width();

      if(randPosX>(bodyWidth-sizeAsteroid)){
         randPosX=(randPosX-sizeAsteroid);
      }
      $("#plateauJeu").append('<img style="left: '+ randPosX +'px;" class="bouncer" src="http://sharonacademy.org/tsagame/gfx/asteroid.png"></img>');

      score++;
      $('#score').text("Score : "+score.toString());


   }

   $(document).keydown(function(e) {
      keys[e.keyCode] = true;
   });

   $(document).keyup(function(e) {
      delete keys[e.keyCode];
   });

   function movePlane() {
      checkCollisions($(".bouncer"));
      for (var direction in keys) {
         if (!keys.hasOwnProperty(direction)) continue;
         var posLeft = $("#plane").position().left;
         var bodyWidth=$("#plateauJeu").width();

         var sizePlane = $("#plane").width();
         //   console.log(posLeft);
         //   console.log(bodyWidth);


         if(posLeft>0){
            if (direction == 37 /*|| $("#clickLeft" ).click()*/) {
               $("#plane").animate({left: "-=5"}, 0);
            }
         }
         if(posLeft+sizePlane<bodyWidth){
            if (direction == 39 /*|| $("#clickRight" ).click()*/) {
               $("#plane").animate({left: "+=5"}, 0);
            }
         }
      }
   }

   function getPositions(box) {
      var $box = $(box);
      var pos = $box.position();
      var width = $box.width();
      var height = $box.height();
      return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
   }

   function checkCollisions(classObj){
      var box = $("#plane");
      var pos = getPositions(box);
      $(classObj).each(function() {

         var pos2 = getPositions($(this));
         var horizontalMatch = comparePositions(pos[0], pos2[0]);
         var verticalMatch = comparePositions(pos[1], pos2[1]);
         var match = horizontalMatch && verticalMatch;
         //console.log("match ="+match);
         if (match==true && flag==false) {
            var r=confirm("Vous avez perdu. Voulez vous recommencer ?");
            if (r == true) {
               location.reload();
            } else {
               flag=true;
               abortTimer();
               $("#restart").html('<button name="nada" onclick="location.reload()">Restart</button>');

            }
         }
      });
   }

   function comparePositions(p1, p2) {
      var x1 = p1[0] < p2[0] ? p1 : p2;
      var x2 = p1[0] < p2[0] ? p2 : p1;
      return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
   }
});
