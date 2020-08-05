import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input/index';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';


import'./styles.css';

interface IScheduleItens {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {

  const [scheduItens, setscheduItens] = useState<IScheduleItens[]>([
    {week_day: 0, from: '8:00 AM', to: '4:00 PM'}
  ]);

  function addNewScheduleItem()
  {
    setscheduItens([
      ...scheduItens,
      {week_day: 0, from: '', to: ''}
    ]);
  }

  return (
    <div id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher este formulário de inscrição"
      />

      <main>
        <form>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome completo" />
            <Input name="avatar" label="Avatar" />
            <Input name="whatsapp" label="Whatsapp" />
            <Textarea name="bio" label="Biografia" />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              options={[
                {value: 'Artes', label: 'Artes' },
                {value: 'Biologia', label: 'Biologia' },
                {value: 'Ciências', label: 'Ciências' },
                {value: 'Educação Física', label: 'Educação Física' },
                {value: 'Geografia', label: 'Geografia' },
              ]}
            />

            <Input name="cost" label="Custo da sua hora por aula" />

          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
            </legend>

            {scheduItens.map(scheduleItem => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    options={[
                      {value: '0', label: 'Domingo' },
                      {value: '1', label: 'Segunda-feira' },
                      {value: '2', label: 'Terça-feira' },
                      {value: '3', label: 'Quarta-feira' },
                      {value: '4', label: 'Quinta-feira' },
                      {value: '5', label: 'Sexta-feira' },
                      {value: '6', label: 'Sábado' },
                    ]}
                  />

                  <Input name="from" label="Das" type="time" />
                  <Input name="to" label="Até" type="time" />
                </div>
              )
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="button">
              Salvar Cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>

  );
}

export default TeacherForm;