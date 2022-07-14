import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>()
  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(() => {
    //obter restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/') //vai retornar uma lista de restaurante
      .then(resposta => {
        setRestaurantes(resposta.data.results) //veio do console do get
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, []) //hook

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina) //obtendo a paginação do restaurante usando a url da proxima pagina
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results]) //o que ja tinha + o que voltou
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {
      proximaPagina &&
      <button onClick={verMais}>
        Ver mais
      </button>
    }
  </section>)
}

export default ListaRestaurantes