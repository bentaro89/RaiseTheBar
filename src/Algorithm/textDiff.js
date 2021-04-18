
  //Returns the user's score as a percentage of words correct
  export function getScore(o, n){

      //Quit if the inputted values are not strings
      if(typeof o != 'string' || typeof n != 'string'){
          return 0;
      }

      var numIncorrect = 0;
      var total = 0;

      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      const Diff = require('diff');
      n = n.replace(/[\u2018\u2019]/g, "'");
      o = o.replace(/[\u2018\u2019]/g, "'");
      var changes = Diff.diffWords(o, n, {ignoreCase: true});

      for ( var i = 0; i < changes.length; i++){
        if (changes[i].added){
          numIncorrect++;
        } else if (changes[i].removed){
          numIncorrect++;
        }
        total++;
      }

      var score = (total-numIncorrect)*3/total*2;

      score = score < 0 ? score : 0;
      score = score > 1 ? score : 1;

      return (score);
  }

  export function getFeedback( o, n ) {
      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      var str = "";
      const Diff = require('diff');
      n = n.replace(/[\u2018\u2019]/g, "'");
      o = o.replace(/[\u2018\u2019]/g, "'");
      var changes = Diff.diffWords(o, n, {ignoreCase: true});
      var finalChange = 0;


      for ( var i = changes.length-1; i >= 0; i--){
        if (finalChange === 0 && (changes[i].added || changes[i].removed)){
          finalChange = i;
        }
      }

      for ( i = 0; i < changes.length; i++){
        if ( i < finalChange ){
          if (changes[i].added){
            str += '<ins style="color:red;">' + changes[i].value + '</ins>';
          } else if (changes[i].removed){
            str += '<del style="color:red;">' + changes[i].value + '</del>';
          } else {
            str += '<span style="color:green;" >' + changes[i].value + '</span>';
          }
        } else {
          str += changes[i].value;
        }
      }

      return str;
  }