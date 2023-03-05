module.exports = {
    //not so important
      normalize: function ($value, $min, $max) {
          return ($value - $min) / ($max - $min);
      },
      interpolate: function ($normValue, $min, $max) {
          return $min + ($max - $min) * $normValue;
      },
    /*
      really important. It's pretty cool
  
      1. Set the boundaries
      If less, make it the lower boundary
      If more, make it the higher boundary
  
      2. Normalize figures out the percentage
         between the two first values
  
         Q: 5 is what percentage between 2 and 8?
  
         A:
         (5 - 2) / (8 - 2)
         3 / 6 = .5
         .5 * 100 = 50% (decimal form is preferred, so this step is omitted)
  
      3. Interpolate to figure out what the normalized value
         is between the second set of values
  
         Q: What is 50% beteween 30 and 100?
  
         A:
           30 + (100 - 30) * .5;
           30 + 70 * .5;
           30 + 35;
           65
  
  
  
    */
      map: function ($value, $min1, $max1, $min2, $max2) {
          if ($value < $min1) {
              $value = $min1;
          }
          if ($value > $max1) {
              $value = $max1;
          }
          var res = this.interpolate(this.normalize($value, $min1, $max1), $min2, $max2);
  
          return res;
      }
  };