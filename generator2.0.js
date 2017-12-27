generator = {
    containerId: null, //id div'а для вывода (String)
    min: -20, // диапазон чисел (Int)
    max: 20,
    round: 0, //число знаков после запятой (Int)
    shuffle: false, // перемешивание (Boolean)
    variant: 30, //число вариантов (Int)
    cols: 5, //число вариантов в одной строке (Int)

    init: function(containerId, variant, cols) {
        this.containerId = containerId;
        this.variant = variant || this.variant;
        this.cols = cols || this.cols;
    },
    roundPHP: function(value, precision) {
        var m, f, isHalf, sgn; // helper variables
        precision |= 0; // making sure precision is integer
        m = Math.pow(10, precision);
        value *= m;
        sgn = (value > 0) | -(value < 0); // sign of the number
        isHalf = value % 1 === 0.5 * sgn;
        f = Math.floor(value);
        if (isHalf) value = f + (sgn > 0); // rounds .5 away from zero
        return (isHalf ? value : Math.round(value)) / m;
    },
    replace: function (l) {

        var number = '[0-9+*.,-/]+';
        var math = new RegExp('\\('+number+'\\)','g');
        var abs = new RegExp('abs\\('+number+'\\)','g');
        var pow = new RegExp('pow\\('+number+'\\)','g');
        var sqrt = new RegExp('sqrt\\('+number+'\\)','g');
        var sin = new RegExp('sin\\('+number+'\\)','g');
        var cos = new RegExp('cos\\('+number+'\\)','g');
        var tan = new RegExp('tan\\('+number+'\\)','g');
        var asin = new RegExp('asin\\('+number+'\\)','g');
        var acos = new RegExp('acos\\('+number+'\\)','g');
        var atan = new RegExp('atan\\('+number+'\\)','g');
        var choice = new RegExp(/\[[^\]]+\]/g);
        var variable = [new RegExp(/!A/g), new RegExp(/!B/g), new RegExp(/!C/g), new RegExp(/!D/g), new RegExp(/!E/g), new RegExp(/!F/g), new RegExp(/!G/g), new RegExp(/!H/g), new RegExp(/!I/g), new RegExp(/!J/g), new RegExp(/!K/g), new RegExp(/!L/g), new RegExp(/!M/g), new RegExp(/!N/g), new RegExp(/!P/g), new RegExp(/!Q/g), new RegExp(/!R/g), new RegExp(/!S/g), new RegExp(/!T/g), new RegExp(/!U/g), new RegExp(/!V/g), new RegExp(/!W/g), new RegExp(/!X/g), new RegExp(/!Y/g), new RegExp(/!Z/g)]
        variable.forEach((element) => {
            var number = (this.min+(this.max-this.min)*Math.random()).toFixed(this.round);
            l=l.replace(element,number);
        });
        while (choice.test(l)) l.match(choice).forEach(function(element) {k=element.substr(1,element.length-2).split(';'); l=l.replace(element,k[Math.floor( Math.random()*k.length)]);});
        while (abs.test(l)) l.match(abs).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace abs
        while (pow.test(l)) l.match(pow).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace pow
        while (sqrt.test(l)) l.match(sqrt).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace sqrt
        while (sin.test(l)) l.match(sin).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace sin
        while (cos.test(l)) l.match(cos).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace cos
        while (tan.test(l)) l.match(tan).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace tan
        while (asin.test(l)) l.match(asin).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace asin
        while (acos.test(l)) l.match(acos).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace acos
        while (atan.test(l)) l.match(atan).forEach(function(element) {l = l.replace(element,eval('Math.'+element));}); //replace atan
        while (math.test(l)) l.match(math).forEach((element) => {l = l.replace(new RegExp(/--/g),'+'); l = l.replace(new RegExp(/\+-/g),'-'); l = l.replace(element,this.roundPHP(eval(element),8)); });
        l = l.replace(new RegExp(/--/g),'+');
        l = l.replace(new RegExp(/\+-/g),'-');
        return l;
    },
    //pattern - массив с шаблонами заданий ([String])
    create: function(pattern, min, max, round, shuffle) {
        this.min = min || this.min;
        this.max = (max === undefined) ?  this.max : max;
        this.round = (round === undefined) ?  this.round : round;
        this.shuffle = (shuffle === undefined) ?  this.shuffle : shuffle;
        count = pattern.length;
        container = document.getElementById(this.containerId);
        container.innerHTML="";
        var table = document.createElement("TABLE");
        container.appendChild(table);
        var tr = document.createElement("TR");
        table.appendChild(tr);
        for (i=0;i<this.variant;i++) {
          if ((i%this.cols == 0) && (i!=0)) {
            var tr = document.createElement("TR");
            table.appendChild(tr);
          }
          var td = document.createElement("TD");
          if (this.shuffle) pattern.sort(function(a,b) {return Math.random() - 0.5});
          for (j=0;j<count;j++) td.innerHTML += this.replace(pattern[j%pattern.length])+'<br>';
          tr.appendChild(td);
          MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //delete, if you don't use MathJax
        }
    }
}