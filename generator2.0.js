generator = {
    min: -20, // диапазон чисел (Int)
    max: 20,
    round: 0, //число знаков после запятой (Int)
    shuffle: false, //перемешивание заданий (Boolean)

    getRandomNumber() {
        number = (this.min+(this.max-this.min)*Math.random()).toFixed(this.round);
        return (number!=0) ? number : this.getRandomNumber();
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
    generate: function (l) {
        var number = '[0-9+*.,-/]+';
        var math = new RegExp('\\('+number+'\\)','g');
        var variable = [new RegExp(/!A/g), new RegExp(/!B/g), new RegExp(/!C/g), new RegExp(/!D/g), new RegExp(/!E/g), new RegExp(/!F/g), new RegExp(/!G/g), new RegExp(/!H/g), new RegExp(/!I/g), new RegExp(/!J/g), new RegExp(/!K/g), new RegExp(/!L/g), new RegExp(/!M/g), new RegExp(/!N/g), new RegExp(/!P/g), new RegExp(/!Q/g), new RegExp(/!R/g), new RegExp(/!S/g), new RegExp(/!T/g), new RegExp(/!U/g), new RegExp(/!V/g), new RegExp(/!W/g), new RegExp(/!X/g), new RegExp(/!Y/g), new RegExp(/!Z/g)]
        var functions = new RegExp('(?:(?:abs)|(?:pow)|(?:sqrt)|(?:sin)|(?:cos)|(?:tan))\\('+number+'\\)','g');
        var choice = new RegExp(/\[.+?\]/g);
        while (choice.test(l)) l.match(choice).forEach(el => {k=el.substr(1,el.length-2).split(';'); l=l.replace(el,k[Math.floor( Math.random()*k.length)]);});
        variable.forEach(el => l=l.replace(el,this.getRandomNumber()));
        l = l.replace(new RegExp(/--/g),'+');
        l = l.replace(new RegExp(/\+-/g),'-');
        while (functions.test(l))  l.match(functions).forEach( el => l = l.replace(el,eval('Math.'+el)));
        while (math.test(l)) l.match(math).forEach(el => l = l.replace(el,this.roundPHP(eval(el),8)));
        l = l.replace(new RegExp(/--/g),'+');
        l = l.replace(new RegExp(/\+-/g),'-');
        return l;
    },
    generateSeries(arr) {
        var repeat = new RegExp(/^(.+)\[(\d+)\]$/);
        for (i=0;i<arr.length; i++) {
            if (repeat.test(arr[i])) {
                m=arr[i].match(repeat);
                arr.splice(i,1,...new Array(parseInt(m[2])).fill(m[1]));
            }
        }
        if (this.shuffle) arr.sort(function(a,b) {return Math.random() - 0.5});
        arr = arr.map(el => this.generate(el));
        return arr
    }
}