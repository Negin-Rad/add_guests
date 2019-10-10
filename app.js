window.onload = init;

var res = [];
var counter = 0;
var result = document.getElementById("result");
result.classList.add("alert", "alert-light", "mt-2", "p-3", "rounded")

function check(p, ch) {
    ch.style.display = "none";
    p.classList.remove("bg-warning");
    p.classList.add("bg-primary");
    var num = Number(p.childNodes[4].innerHTML);
    counter += num;



};

function clo(p, c) {
    p.style.display = "none";
    for (var i = 0; i < res.length; i++) {
        if (res[i].name == p.childNodes[2].innerHTML) {
            res.splice(i, 1);

        }
    }
    var num = Number(p.childNodes[3].innerHTML);
    counter -= num;

};

function cl(p, c) {
    p.style.display = "none";
    for (var i = 0; i < res.length; i++) {
        if (res[i].name == p.childNodes[3].innerHTML) {
            res.splice(i, 1);

        }
    }
    if (p.classList[5] == "bg-success") {
        var num = Number(p.childNodes[4].innerHTML);
        counter -= num;

    }


};

function init() {

    var add_output = document.getElementById("add_output");
    laodJson("GET", "https://api.myjson.com/bins/1alyey", function(r) {
        build(r, "output");
    });
    document.getElementById("send").addEventListener("click", function() {
        var name = document.forms[0].name.value;
        var count = Number(document.forms[0].count.value);
        var confirmed = document.forms[0].confirmed.value;
        if (confirmed == "true") {
            confirmed = true;
        } else {
            confirmed = false;
        }
        var new_guest = { "name": name, "count": count, "confirmed": confirmed };
        if ((count + counter) <= 30) {
            add_output.innerHTML = "";
            res.push(new_guest);
            counter = 0;
            build(res, "output");
        } else {
            var t = 30 - counter;
            add_output.style.color = "red";
            add_output.innerHTML = "you can not add more than  " + t;
        }

    });




    function laodJson(m, u, c) {
        var xHR = new XMLHttpRequest;
        xHR.open(m, u, true);
        xHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.response);
                c(res);
            }
        }
        xHR.send();
    }

    function build(d, id) {
        var html = "";
        for (var i = 0; i < d.length; i++) {
            if (d[i].confirmed) {
                html += '<div class="  bg-primary text-white mt-2 p-3 rounded myclass">';
                html += '<span class="icon-cross float-right mr-2" style="font-size:18px" onclick="clo(this.parentElement,this)"></span>';
                counter += d[i].count;
            } else {
                html += '<div class=" bg-warning text-white mt-2 p-3 rounded myclass">';
                html += '<span class="icon-cross float-right mr-2" style="font-size:18px" onclick="cl(this.parentElement,this)"></span>';
                html += '<span class="icon-check float-right mr-2" style="font-size:18px" onclick="check(this.parentElement,this)"></span>';
            }
            html += "-";
            html += '<span class="n1">' + d[i].name + '</span>';
            html += '<span class="n" style="display:none">' + d[i].count + '</span>';
            html += '</div>'
        }
        document.getElementById(id).innerHTML = html;
    };


}