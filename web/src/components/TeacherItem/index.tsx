import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import'./styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
        <header>
            <img src="https://avatars2.githubusercontent.com/u/42554984?s=460&u=49718b7c42720af77b53df17cdbcd5a457c2a334&v=4" alt="Bruno" />
            <div>
                <strong>Bruno</strong>
                <span>Quimica</span>
            </div>
        </header>

        <p>
        asdfaçsdklfçaskdfç kasdk fçkasdkf asçdfkasd
        <br />    <br />

        asdfasdfasd fasd fasd fasdf
        </p>

        <footer>
            <p>
                Preço/hora
                <strong>R$ 1.000,00</strong>
            </p>

            <button type="button">
                <img src={whatsappIcon} alt="Whatsapp"/>
                Entrar em contato
            </button>
        </footer>
    </article>
  );
}

export default TeacherItem;