$(function(){


  $('#botao').on('click', function(e){
    e.preventDefault();

    $('#ghapidata').html('<div id="loader"><img src="img/buscando.gif" class="img-fluid" alt="Responsive image"></div>');
    

    var username = $('#entrada').val();

    var requri   = 'https://api.github.com/users/'+username;

    var repouri  = requri+'/repos';

    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html('<div class="nome-usuario"><p>Usuário nao encontrado<p></div>');
      }
      
      else {
        // else we have a user and we display their info
        var nomeTodo = json.name;
        var username = json.login;
        var aviurl = json.avatar_url;
        var profileurl = json.html_url;
        var perfilbio = json.bio;
        var location = json.location;
        var seguidores = json.followers;
        var seguindo = json.following;
        var reposnum = json.public_repos;
        var repositorios = json.public_repos;
        var localizacao = json.location;
        var ultimaatividade = json.updated_at;
        var linkRepos = profileurl+'/repositories';
        var linkSeguidores = profileurl+'/followers';
        var linkSeguindo = profileurl+'/following';
        var buscaMapa = 'https://www.google.com/maps/place/'+location;
        
        
        var outhtml  ='<div id="perfiluser" class="row bloco-perfil">';
            outhtml +=  '<div class="perfil col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">';
            outhtml +=    '<img src="'+aviurl+'" class="foto img-responsive">';
            outhtml +=  '</div>';
            outhtml +='<div class="perfil col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left">';
            
            if(nomeTodo == undefined) {

              outhtml +=  '<div class="nome-completo">';
              outhtml +=    '<a target="_blank" href="'+profileurl+'"><p><p>'+username+ '</a>';
              outhtml +=  '</div>';
            }else{
              outhtml +=  '<div class="nome-completo">';
              outhtml +=    '<a target="_blank" href="'+profileurl+'"><p><p>'+nomeTodo+ '</a>';
              outhtml +=  '</div>';

              outhtml +=  '<div class="nome-usuario">';
              outhtml +=   '<a target="_blank" href="'+profileurl+'">'+username+'<p></a>';
              outhtml +=  '</div>';

            }
            

            if (perfilbio!=null) {
              outhtml +=  '<div class="texto-perfil">';
              outhtml +=    perfilbio;
              outhtml +=  '</div>';

            }
            
            outhtml +='</div>';
            outhtml +='<div class="perfil col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left">';
            outhtml +=' <p><p><div class="nome-usuario">';
            outhtml +='   <p><a target="_blank" href="'+linkSeguidores+'"><i class="fa fa-users" aria-hidden="true"> '+seguidores+' Seguidores</i></a>';
            outhtml +='   <p><a target="_blank" href="'+linkSeguindo+'"><i class="fa fa-users" aria-hidden="true"> '+seguindo+' Seguindo</i></a>';  
            outhtml +=    '<p><a target="_blank" href="'+linkRepos+'"><i class="fa fa-folder" aria-hidden="true"> '+repositorios+' Repositórios</i><p></a>';
            
            // So mostra localizacao se for diferente de null
            
            if(location!=null){
              outhtml +='<p><a target="_blank" href="'+buscaMapa+'"><i class="fa fa-map-marker" aria-hidden="true"> '+localizacao+' </i><p></a>';
            }

            outhtml += '</div></div></div>';
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;
          outputPageContent();                
        });          
        
        function outputPageContent() {

        // Se nao tiver nenhum repositorio
         if(repositories.length == 0) {
           outhtml = outhtml + '</div>'; 
         } else {

            outhtml += '<div class="card-columns">';
    
            $.each(repositories, function(index) {
              var repname = repositories[index].name;
              var linkd = repositories[index].html_url+'/archive/master.zip';
              var repdesc = repositories[index].description;
              var linkV = repositories[index].html_url;
              
              var ssh_url = repositories[index].ssh_url;
              var clone_url = repositories[index].clone_url;

              var faiconD = '<a href="'+linkd+'"><i class="fa fa-download icone" aria-hidden="true"></i></a> ';
              var faiconV = ' <a target="_blank" href="'+linkV+'"><i class="fa fa-eye icone" aria-hidden="true"></i></a>';
              outhtml += '<div class="card">';

              outhtml +=  '<div class="card-header">'+faiconD+repname+faiconV+'</div>';


              if(repdesc!=null){
                outhtml +=  '<div class="card-body text-left">'+repdesc;

              }else{
                outhtml +=  '<div class="card-body text-left"> Repositório sem descrição!';

              }
              
              outhtml +=   '<hr><a target="_blank" href="'+ssh_url+'"> <i class="fas fa-terminal icone"></i> '+ssh_url+'</a><hr><p>';
              outhtml +=   '<a target="_blank" href="'+clone_url+'"> <i class="fa fa-clone icone " aria-hidden="true"></i> '+clone_url+'</a>';
              outhtml +=  '</div>';
              outhtml +=  '<div class="card-footer">'+linkV+'</div>';
              outhtml += '</div>';

            });

            outhtml += '</div>';
            
        }

        // Coloca dados na tela
          
          $('#ghapidata').html(outhtml);


        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call

  }); // end click event handler
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }


});



