(function(window, document, undefined){

    // code that should be taken care of right away
    var countDownDate = new Date("Aug 21, 2022 00:00:00").getTime();

    const names = ["cutie", "babe", "beautiful", "erin"]

    const colors = ['black', 'white', 'pink']

    window.onload = init;
    
    function init()
    {
        var name = Math.floor(Math.random() * names.length);
        document.getElementById("name").innerHTML = names[name];

        var color = Math.floor(Math.random() * colors.length);
        var p = document.getElementsByClassName("pwords");
        for (let i = 0; i < p.length; i++)
        {
            p[i].style.color = colors[color];
        }
        var t = document.getElementsByClassName("timerWords");
        t[0].style.color = colors[color];
        var h = document.getElementsByClassName("heart");
        h[0].style.color = colors[color];

        //TIMER

        // the code to be called when the dom has loaded
        // #document has its nodes
        var x = setInterval(function() 
        {
            var now = new Date().getTime();

            var distance = countDownDate - now;
    
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            document.getElementById("time").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    
            if (distance < 0)
            {
                clearInterval(x);
                document.getElementById("time").innerHTML = "any second now";
            }
        }, 1000);
    }
    
})(window, document, undefined);