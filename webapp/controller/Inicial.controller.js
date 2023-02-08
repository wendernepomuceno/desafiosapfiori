sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    //Iniciar biblioteca 
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
                //Objetos = Equivale a estrutura no ABAP
                /************ AULA 1 *************************
                //this é equivalente o "me" no Orientação Objeto
                this.produto = {
                    nome: "margarina",
                    marca: "doriana",
                    peso: 500,
                    uom: 'G',
                    estoque: 12,
                    adicionarEstoque: function(){
                        this.estoque++;
                        return this.estoque + ' Unidades em estoque'; //+concatenar
                    }
                }
                ********************************************/

                /************ AULA 2 *************************/
                //Colchete([]) indica que variável é do tipo tabela interna do ABAP;
                //Vamos fazer um table Type dentro de uma estrutura do ABAP
                let ImageList = {
                    Imagens : []
                };

                //Criação do modelo para exibir dados na Tela
                let ImageModel = new JSONModel(ImageList); //Nova instancia de objeto, passando tabela por parametro
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");
            },

            onPressBuscar: function(){
                //Trazer para o código a intancia a classe do input
                //Instancia objeto input na variável
                let inputBusca = this.byId("inpBusca"); //this buscar função. Buscando inpBusca na App.view.xml
                //Coleta o valor
                let query = inputBusca.getValue();
                //Imprimir na tela
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //Concatenate
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                        + query //pepsi
                        + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "764bc93c3fmsh0755c267a46a112p169d3fjsned6d195517f8",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                //parentesis serve para passar parametros
                //callback: Uma função executada no final de outra função
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    //Instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    //Obter os dados do modelo para alterar
                    let oDadosImage = oImageModel.getData();

                    //Limpar tabela interna = array
                    oDadosImage.Imagens = [];

                    //Inserir registros novos.
                    //Loop que adiciona dados de uma tabela em outra tabela
                    let listaResultados = response.value;
                    let newItem;
                    
                    //vamos ao loop
                    for (var i = 0; i < listaResultados.length; i++){
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }
                    //Atualizar a tela
                    oImageModel.refresh();

                }.bind(this) //Essa variável vai enchegar variaveis acima dela                
                );

            }
        });
    });
