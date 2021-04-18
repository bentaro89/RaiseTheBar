    //Basic diff function
    function diff( o, n ) {
      var ns = {};
      var os = {};
      
      for ( var i = 0; i < n.length; i++ ) {
        if ( ns[ n[i] ] == null )
          ns[ n[i] ] = { rows: [], o: null };
        ns[ n[i] ].rows.push( i );
      }
      
      for ( i = 0; i < o.length; i++ ) {
        if ( os[ o[i] ] == null )
          os[ o[i] ] = { rows: [], n: null };
        os[ o[i] ].rows.push( i );
      }
      
      for ( i in ns ) {
        if ( ns[i].rows.length === 1 && typeof(os[i]) != "undefined" && os[i].rows.length === 1 ) {
          n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
          o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
        }
      }
      
      for ( i = 0; i < n.length - 1; i++ ) {
        if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
             n[i+1] === o[ n[i].row + 1 ] ) {
          n[i+1] = { text: n[i+1], row: n[i].row + 1 };
          o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
        }
      }
      
      for ( i = n.length - 1; i > 0; i-- ) {
        if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
             n[i-1] === o[ n[i].row - 1 ] ) {
          n[i-1] = { text: n[i-1], row: n[i].row - 1 };
          o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
        }
      }
      
      return { o: o, n: n };
  }

  //Returns the user's score as a percentage of words correct
  export function getScore(o, n){

      //Quit if the inputted values are not strings
      if(typeof o != 'string' || typeof n != 'string'){
          return 0;
      }

      var numIncorrect = 0;
      var total = o.match(/\s+/g).length;

      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      var out = diff(o === "" ? [] : o.split(/\s+/), n === "" ? [] : n.split(/\s+/) );

      if (out.n.length === 0) {
          for (var i = 0; i < out.o.length; i++) {
            numIncorrect++;
          }
      } else {
        if (out.n[0].text == null) {
          for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
            numIncorrect++;
          }
        }
    
        for ( i = 0; i < out.n.length; i++ ) {
          if (out.n[i].text == null) {
          } else {
            for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
              numIncorrect++;
            }
          }
        }
      }

      return ((total-numIncorrect)/total);
  }

  export function getFeedback( o, n ) {
      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      var out = diff(o === "" ? [] : o.split(/\s+/), n === "" ? [] : n.split(/\s+/) );
      var str = "";
    
      var oSpace = o.match(/\s+/g);
      if (oSpace === null) {
        oSpace = ["\n"];
      } else {
        oSpace.push("\n");
      }
      var nSpace = n.match(/\s+/g);
      if (nSpace === null) {
        nSpace = ["\n"];
      } else {
        nSpace.push("\n");
      }
    
      if (out.n.length === 0) {
          for (var i = 0; i < out.o.length; i++) {
            str += escape(out.o[i]) + oSpace[i];
          }
      } else {
        if (out.n[0].text == null) {
          for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
            str += escape(out.o[n]) + oSpace[n];
          }
        }
    
        for ( i = 0; i < out.n.length; i++ ) {
          if (out.n[i].text == null) {
            str += '<ins style=\"color:red;\">' + escape(out.n[i]) + nSpace[i] + "</ins>";
          } else {
            var pre = "";
    
            for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
              if(n<i){
                pre += '<del style=\"color:red;\">' + escape(out.o[n]) + oSpace[n] + "</del>";
              }else{
                pre += escape(out.o[n]) + oSpace[n];
              }
            }
            str += "<span style=\"color:green;\" > " + out.n[i].text + "</span>" + nSpace[i] + pre;
          }
        }
      }
      
      str = str.replaceAll("%u2019","\'");
      str = str.replaceAll("%27","\'");
      return str;
  }