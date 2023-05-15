function openPopup() {
    const url = '/usuarios';
    
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let Pessoa = data;
        let saida = '';
        Pessoa.map(function(Pessoa) {
          saida += '<strong> '+ `${Pessoa.Nome}` + '</strong> ' + `${Pessoa.Sobrenome}` + ' - ' +`${Pessoa.Email}`  + ' - ' +  `${Pessoa.Telefone}`;
          saida += ' - <a href="/atualizar.html?userId=' + `${Pessoa.ID}` + '">EDITAR</a>';
          saida += ' | <a href="/removeUsuario?userId='+`${Pessoa.ID}`+'">REMOVER</a></br>';
        });
        document.getElementById("popup").style.display = "block";
        document.getElementById('resultado').innerHTML = saida;
      })
      .catch(function(error) {
        console.log(error);
      });
      
  }
  
function closePopup() {
document.getElementById("popup").style.display = "none";
}
  

function showinformation() {
    const url = '/usuarios';
    
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let Pessoa = data;
        let saida = '';
        Pessoa.map(function(Pessoa) {
          saida += '<strong> '+ `${Pessoa.Nome}` + '</strong> ' + `${Pessoa.Sobrenome}` + ' - ' +`${Pessoa.Email}`  + ' - ' +  `${Pessoa.Telefone}`;
          saida += ' - <a href="/atualizar.html?userId=' + `${Pessoa.ID}` + '">EDITAR</a>';
          saida += ' | <a href="/removeUsuario?userId='+`${Pessoa.ID}`+'">REMOVER</a></br>';
        });
        document.getElementById("mensage").style.display = "block";
        document.getElementById('mensage_content').innerHTML = saida;
      })
      .catch(function(error) {
        console.log(error);
      });
      
}

function closeinformation() {
    document.getElementById("mensage").style.display = "none";
}