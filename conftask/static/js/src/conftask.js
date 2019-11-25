/* Javascript for ConfTaskXBlock. */
function ConfTaskXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('p', element).click(function (eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({ "hello": "world" }),
            success: updateCount
        });
    });

    ace.config.set('basePath','/static/js/src/src-min-noconflict');
    var editor = ace.edit('editor');

    editor.getSession().setMode("ace/mode/c_cpp");
    editor.getSession().setUseWorker(false);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    ace.require("/static/js/src/src-min-noconflict/ext-language_tools");

    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true
    });
    editor.setBehavioursEnabled(true);
    editor.setValue(`//put your code here.`);


    var botonDescarga = document.getElementById('btn_descargar');

    botonDescarga.addEventListener('click', function () {
        var link = document.getElementById('a_descargar');
        link.href = save(editor.getValue());
    }, false);

    //Descargar Archivos
    function save(textFile) {
        var data = new Blob([textFile], { type: 'text/plain' });
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    //Subir Archivos
    document.getElementById('file-input').addEventListener('change', readSingleFile, true);
    function readSingleFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            editor.setValue(contents);
        };
        reader.readAsText(file);
    }

    //Expandir
    $('.logo-max', element).click(function () {
        let elem = document.getElementById("editor");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    });

    //agregar filas a la tabla Entrada
    $('#agregarEntrada', element).click(function () {
        var entrada = document.getElementsByName('entrada')[0];
        if (entrada.id == "entrada") {
            var variableEnt = document.getElementById("inputBanderaEnt").value;
            var tipoEnt = document.getElementById("tipoEnt").value;
            var fila = "<tr><td>" + variableEnt + "</td><td>" + tipoEnt +
                `</td><td><div class="material-icons logo-edit" id="editar">edit</div>` +
                `</td><td><div class="material-icons logo-delete" id="delete">delete</div></td></tr>`;
            var btn = document.createElement("TR");
            btn.innerHTML = fila;
            document.getElementById("tabla1").appendChild(btn);
            document.getElementById('inputBanderaEnt').value = "";
        }
        // editar fila
        $("#tablaEntrada").on("click", "#editar", function () {
            var editar = $(this).parents("tr").find("td");
            var variable = editar[0].textContent;
            var tipo = editar[1].textContent;
            document.getElementById('inputBanderaEnt').value = variable;
            document.getElementById('tipoEnt').value = tipo;
            $(this).parents("tr").remove();
        });
        //eliminar fila
        $("#tablaEntrada").on("click", "#delete", function () {
            $(this).parents("tr").remove();
        });
    });

    //agregar filas a la tabla salida
    $('#agregarSalida', element).click(function () {
        var salida = document.getElementsByName('salida')[0];
        if (salida.id == "salida") {
            var variableSal = document.getElementById("inputBanderaSal").value;
            var tipoSal = document.getElementById("tipoSal").value;
            var fila = "<tr><td>" + variableSal + "</td><td>" + tipoSal +
                `</td><td><div class="material-icons logo-edit" id="editar">edit</div>` +
                `</td><td><div class="material-icons logo-delete" id="delete">delete</div></td></tr>`;
            var btn = document.createElement("TR");
            btn.innerHTML = fila;
            document.getElementById("tabla2").appendChild(btn);
            document.getElementById('inputBanderaSal').value = "";
        }
        // editar fila
        $("#tablaSalida").on("click", "#editar", function () {
            var editar = $(this).parents("tr").find("td");
            var variable = editar[0].textContent;
            var tipo = editar[1].textContent;
            document.getElementById('inputBanderaSal').value = variable;
            document.getElementById('tipoSal').value = tipo;
            $(this).parents("tr").remove();
        });
        //eliminar fila
        $("#tablaSalida").on("click", "#delete", function () {
            $(this).parents("tr").remove();
        });
    });
}
