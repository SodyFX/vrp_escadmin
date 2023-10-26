    window.addEventListener('message', function( event ) {
        //Reset html items
        $('#grupos').empty()
        $('#escolhas').empty()
        document.getElementById("playerId").value = ""

        var item = event.data;
        if ( item.conce == true ) {
            $('.container').css('display','block');
            $('.box').css('display','block');
            criarLista(item.data, item.cats);
        } else if ( item.conce == false ) {
            $('.conteudo').html("");
            $('.container').css("display","none");
            $('.box').css('display','none');
        } 
    })
    
    function criarLista(data, cats) {
        document.getElementById("playerId").value = data[2].toString();

        const arr = Object.keys(cats);
        arr.forEach( (item, key) => {
            var divmain = `<button type='button' class='collapsible'>${item}</button>\n<div class="content"><p>`

            data[1].forEach( (item2, key2) => {
                item2["category"].forEach( (item3, key3) => {
                    if (item3 == item) {
                        divmain = divmain + `<div class='grupo' onClick='javasript:atribuir("${key2}${item2['group']}")' id='${key2}${item2['group']}' data-value='${item2['group']}'>${item2['group']}</div>`;
                    }
                })
            })

            divmain = divmain + "</p></div>";

            $('#grupos').append(divmain)
        })
    
        data[0].forEach( (item, key) => {
            let div = `<div class='player' onClick='javasript:atribuir("${key}${item}")' id='${key}${item}' data-value='${item}'>${item}</div>`
            $('#escolhas').append(div)
        })


        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
    }
    
    function atribuir(id) {
        let item = document.getElementById(id)
        if (item.className == "grupo") {
            item.classList.add("player");
            item.classList.remove("grupo");
            $('#escolhas').append(item)
        } else {
            item.classList.add("grupo");
            item.classList.remove("player");
            $('#grupos').append(item)
        }
    }

    $('.btn-info').click(function() {

        let valores = []
        let grupos = $('.player')
        grupos.get().forEach(item => {
            valores.push($(item).data('value'))
        });

        let player = document.getElementById("playerId").value

        Swal.fire({
            title: 'Warning!',
            text: "Wolud you like change groups of the player?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'YES'
          }).then((result) => {
            if (result.value) {
                $('.container').css("display","none");
                $.post('http://vrp_escadmin/aceitar', JSON.stringify({valores, player}));
            }
          })
    })
    
    $('.fa-sign-out-alt').click(function() {
        $('.container').css("display", "none");
        $.post('http://vrp_escadmin/close', JSON.stringify({}));
    })