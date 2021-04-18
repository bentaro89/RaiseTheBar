
  //Returns the user's score as a percentage of words correct
  export function getScore(o, n){

      //Quit if the inputted values are not strings
      if(typeof o != 'string' || typeof n != 'string'){
          return 0;
      }
      //keep track of player performace
      var numIncorrect = 0;
      var correction = 0;

      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      // Preparing the data and running Diff
      const Diff = require('diff');
      n = n.replace(/[\u2018\u2019]/g, "'");
      o = o.replace(/[\u2018\u2019]/g, "'");
      var changes = Diff.diffWords(o, n, {ignoreCase: true});

      // Recording each mistake
      for ( var i = 0; i < changes.length; i++){
        if (changes[i].added || changes[i].removed){
          numIncorrect++;
        } else {
          correction++;
        }
      }

      return (correction/changes.length);
  }

  export function getFeedback( o, n ) {
      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      // Prepare the data for feedback
      var str = "";
      const Diff = require('diff');
      n = n.replace(/[\u2018\u2019]/g, "'");
      o = o.replace(/[\u2018\u2019]/g, "'");
      var changes = Diff.diffWords(o, n, {ignoreCase: true});
      var finalChange = 0;


      // Find the final change so that we do not give feedback on portions the player has not gotten to
      for ( var i = changes.length-1; i >= 0; i--){
        if (finalChange === 0 && (changes[i].added || changes[i].removed)){
          finalChange = i;
        }
      }

      // Put together HTML containing corrections
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