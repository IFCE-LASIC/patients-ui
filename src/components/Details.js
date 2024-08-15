import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";

export default function Details() {
  const { crm } = useParams();
  const location = useLocation();
  const [idEntity, setIdEntity] = useState();
  const [objectSave, setObjectSave] = useState({
    id: "",
    hepatiteB: false,
    crm: "",
    hepatiteB_obs: "",
    relevant_hepatiteB: false,
    risc: "",
    observacao_geral: "",
    pessoa: "",
    pessoa_obs: "",
    pessoa_eh_relevante: false,
    idade: "",
    idade_obs: "",
    idade_eh_relevante: "",
    sexo: "",
    sexo_obs: "",
    sexo_eh_relevante: false,
    data: "",
    data_obs: "",
    data_eh_relevante: false,
    exame: "",
    exame_obs: "",
    exame_eh_relevante: false,
    valor_obtido_em_exame: "",
    valor_obtido_em_exame_obs: "",
    valor_obtido_em_exame_eh_relevante: false,
    condicao_medica: "",
    condicao_medica_obs: "",
    condicao_medica_eh_relevante: "",
    tuberculose: false,
    tuberculose_obs: "",
    tuberculose_eh_relevante: false,
    caxumba: false,
    caxumba_obs: "",
    caxumba_eh_relevante: false,
    sarampo: false,
    sarampo_obs: "",
    sarampo_eh_relevante: false,
    hepatite_A: false,
    hepatite_A_obs: "",
    hepatite_A_eh_relevante: false,
    rubeola: false,
    rubeola_obs: "",
    rubéola_eh_relevante: false,
    herpes_zoster: false,
    herpes_zoster_obs: "",
    herpes_zoster_eh_relevante: false,
    varicela: false,
    varicela_obs: "",
    varicela_eh_relevante: false,
    covid_19: false,
    covid_19_obs: "",
    covid_19_eh_relevante: false,
    historico_de_cirurgias: false,
    historico_de_cirurgias_obs: "",
    historico_de_cirurgias_eh_relevante: false,
    numero_de_gravidezes: "",
    numero_de_gravidezes_obs: "",
    numero_de_gravidezes_eh_relevante: false,
    numero_de_partos: "",
    numero_de_partos_obs: "",
    numero_de_partos_eh_relevante: "",
    numero_de_abortos: "",
    numero_de_abortos_obs: "",
    numero_de_abortos_eh_relevante: "",
    historico_de_alergias: false,
    historico_de_alergias_obs: "",
    historico_de_alergias_eh_relevante: false,
    problema_de_audicao: false,
    problema_de_audicao_obs: "",
    problema_de_audicao_eh_relevante: false,
    utiliza_medicacao_com_frequencia: false,
    utiliza_medicacao_com_frequencia_obs: "",
    utiliza_medicacao_com_frequencia_eh_relevante: false,
    historico_de_gravidez: false,
    historico_de_gravidez_obs: "",
    historico_de_gravidez_eh_relevante: false,
    pratica_exercicios_fisicos: false,
    pratica_exercicios_fisicos_obs: "",
    pratica_exercicios_fisicos_eh_relevante: false,
    consumo_de_alcool: false,
    consumo_de_alcool_obs: "",
    consumo_de_alcool_eh_relevante: false,
    fumante: "",
    fumante_obs: "",
    fumante_eh_relevante: "",
    cigarros_por_dia: "",
    cigarros_por_dia_obs: "",
    cigarros_por_dia_eh_relevante: "",
    anos_de_fumante: "",
    anos_de_fumante_obs: "",
    anos_de_fumante_eh_relevante: "",
    historico_familiar_de_hipertensao: false,
    historico_familiar_de_hipertensao_obs: "",
    historico_familiar_de_hipertensao_eh_relevante: false,
    historico_familiar_de_diabetes: false,
    historico_familiar_de_diabetes_obs: "",
    historico_familiar_de_diabetes_eh_relevante: false,
    historico_familiar_de_cancer: false,
    historico_familiar_de_cancer_obs: "",
    historico_familiar_de_cancer_eh_relevante: false,
    historico_familiar_de_doencas_neurologicas: false,
    historico_familiar_de_doencas_neurologicas_obs: "",
    historico_familiar_de_doencas_neurologicas_eh_relevante: false,
    historico_familiar_de_infarto: "",
    historico_familiar_de_infarto_obs: "",
    historico_familiar_de_infarto_eh_relevante: "",
    historico_familiar_de_infarto_agudo_do_miocardio: false,
    historico_familiar_de_infarto_agudo_do_miocardio_obs: "",
    historico_familiar_de_infarto_agudo_do_miocardio_eh_relevante: false,
    historico_familiar_de_outras_doencas: "",
    historico_familiar_de_outras_doencas_obs: "",
    historico_familiar_de_outras_doencas_eh_relevante: "",
  });

  let execution = 0;

  useEffect(() => {
    if (execution === 0) {
      let config = {
        headers: {
          "XCARDIO-API-KEY": "658f2bb5-101a-47b0-b0d7-0e5d23212da1",
        },
      };

      axios
        .get("http://54.233.219.82/get_complete_unique_sample/", config)
        .then((response) => {
          setIdEntity(response.data._id);
          setObjectSave(response.data);
        });

      execution = 1;
    }
  }, []);

  const handleChange = (e) =>
    setObjectSave({ ...objectSave, [e.target.name]: e.target.value });
  const handleChangeCheckBox = (e) => {
    setObjectSave({ ...objectSave, [e.target.name]: e.target.checked });
  };

  const saveObject = () => {
    let config = {
      headers: {
        "XCARDIO-API-KEY": "658f2bb5-101a-47b0-b0d7-0e5d23212da1",
      },
    };

    let objectToSave = objectSave;
    objectToSave.id = idEntity;
    objectToSave.crm = crm;

    axios
      .post("http://54.233.219.82/save_labeled_samples/", objectToSave, config)
      .then((response) => {});
  };
  return (
    <div className="container">
      <div className="back-button">
        <Link to={{ pathname: `/patients/${crm}` }}>
          <Button
            variant="success"
            className="button-success"
            replace
            state={{ from: location }}
          >
            {" "}
            <ArrowBackIcon />
          </Button>{" "}
        </Link>
      </div>

      <div className="save-position">
        <Button
          variant="success"
          className="button-success"
          replace
          onClick={saveObject}
        >
          {" "}
          <CheckIcon />
        </Button>{" "}
      </div>
      <h3> Pessoa - {objectSave.pessoa} </h3>
      <form>
        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2">
            <label>Obs. geral</label>
            <input
              type="text"
              className="form-control"
              id="observacao_geral"
              name="observacao_geral"
              placeholder=" "
              value={objectSave.observacao_geral}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Pessoa </label>
            <input
              type="text"
              className="form-control"
              id="pessoa_obs"
              name="pessoa_obs"
              placeholder="OBS:"
              value={objectSave.pessoa_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="pessoa_eh_relevante"
              name="pessoa_eh_relevante"
              value={objectSave.pessoa_eh_relevante}
              onChange={handleChangeCheckBox}
              checked={objectSave.pessoa_eh_relevante}
            />{" "}
            &nbsp;
            <label htmlFor="pessoa_eh_relevante">Pessoal relev.</label>
            <br />
          </div>
          <div className="col-md-1 ">
            <label>Risco</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="risc"
              name="risc"
              placeholder=" "
              value={objectSave.risc}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1 ">
            <label>Idade</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="idade"
              name="idade"
              placeholder=" "
              value={objectSave.idade}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="idade_eh_relevante"
              name="idade_eh_relevante"
              value={objectSave.idade_eh_relevante}
              checked={objectSave.idade_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="idade_eh_relevante">Idade relev.</label>
            <br />
          </div>
          <div className="col-md-2">
            <br />
            <input
              type="text"
              className="form-control"
              id="name"
              name="idade_obs"
              placeholder=" OBS:"
              value={objectSave.idade_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <label>Sexo </label>
            <input
              type="text"
              className="form-control"
              id="sexo"
              name="sexo"
              placeholder=""
              value={objectSave.sexo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <label>Data </label>
            <input
              type="text"
              className="form-control"
              id="data"
              name="data"
              placeholder=""
              value={objectSave.data}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <label>Data obs.</label>
            <input
              type="text"
              className="form-control"
              id="data_obs"
              name="data_obs"
              placeholder=""
              value={objectSave.data_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="data_eh_relevante"
              name="data_eh_relevante"
              value={objectSave.data_eh_relevante}
              checked={objectSave.data_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="idade_eh_relevante">Data relev.</label>
            <br />
          </div>
          <div className="col-md-2 ">
            <label>Exame</label>
            <input
              type="text"
              className="form-control"
              id="exame"
              name="exame"
              placeholder=""
              value={objectSave.exame}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="exame_eh_relevante"
              name="exame_eh_relevante"
              value={objectSave.exame_eh_relevante}
              checked={objectSave.exame_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="exame_eh_relevante">Exame relev.</label>
            <br />
          </div>
        </div>
        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <label>Exame obs.</label>
            <input
              type="text"
              className="form-control"
              id="exame_obs"
              name="exame_obs"
              placeholder=""
              value={objectSave.exame_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <label>Valor exame</label>
            <input
              type="text"
              className="form-control"
              id="valor_obtido_em_exame"
              name="valor_obtido_em_exame"
              placeholder=""
              value={objectSave.valor_obtido_em_exame}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <label>Valor exame obs.</label>
            <input
              type="text"
              className="form-control"
              id="valor_obtido_em_exame_obs"
              name="valor_obtido_em_exame_obs"
              placeholder=""
              value={objectSave.valor_obtido_em_exame_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="valor_obtido_em_exame_eh_relevante"
              name="valor_obtido_em_exame_eh_relevante"
              value={objectSave.exame_eh_relevante}
              checked={objectSave.exame_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="valor_obtido_em_exame_eh_relevante">
              Val. exam relev.
            </label>
            <br />
          </div>
          <div className="col-md-2">
            <label>Nº gravidezes</label> <br />
            <input
              type="text"
              className="form-control"
              id="numero_de_gravidezes"
              name="numero_de_gravidezes"
              placeholder=" "
              value={objectSave.numero_de_gravidezes}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Nº gravidezes obs.</label> <br />
            <input
              type="text"
              className="form-control"
              id="numero_de_gravidezes_obs"
              name="numero_de_gravidezes_obs"
              placeholder=" "
              value={objectSave.numero_de_gravidezes_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="numero_de_gravidezes_eh_relevante"
              name="numero_de_gravidezes_eh_relevante"
              value={objectSave.numero_de_gravidezes_eh_relevante}
              checked={objectSave.numero_de_gravidezes_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="valor_obtido_em_exame_eh_relevante">
              Nº gravi. relev.
            </label>
            <br />
          </div>
          <div className="col-md-2 ">
            <label>Nº partos</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="numero_de_partos"
              name="numero_de_partos"
              placeholder=" "
              value={objectSave.numero_de_partos}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Nº partos obs.</label> <br />
            <input
              type="text"
              className="form-control"
              id="numero_de_partos_obs"
              name="numero_de_partos_obs"
              placeholder=" "
              value={objectSave.numero_de_partos_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="numero_de_partos_eh_relevante"
              name="numero_de_partos_eh_relevante"
              value={objectSave.numero_de_partos_eh_relevante}
              checked={objectSave.numero_de_partos_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="numero_de_partos_eh_relevante">
              Nº partos. relev.
            </label>
          </div>
          <div className="col-md-2 ">
            <label>Nº abortos</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="numero_de_abortos"
              name="numero_de_abortos"
              placeholder=" "
              value={objectSave.numero_de_abortos}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="numero_de_abortos_eh_relevante"
              name="numero_de_abortos_eh_relevante"
              value={objectSave.numero_de_abortos_eh_relevante}
              checked={objectSave.numero_de_abortos_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="numero_de_partos_eh_relevante">
              Nº abort. relev.
            </label>
            <br />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <label>Nº abortos obs.</label> <br />
            <input
              type="text"
              className="form-control"
              id="numero_de_abortos_obs"
              name="numero_de_abortos_obs"
              placeholder=" "
              value={objectSave.numero_de_abortos_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="fumante"
              name="fumante"
              value={objectSave.fumante}
              checked={objectSave.fumante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Fumante</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="fumante_eh_relevante"
              name="fumante_eh_relevante"
              value={objectSave.fumante_eh_relevante}
              checked={objectSave.fumante_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="name"
              name="fumante_obs"
              placeholder=" OBS:"
              value={objectSave.fumante_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1">
            <label htmlFor="cigarros_por_dia">Cigarros/dia</label>
            <input
              type="text"
              className="form-control"
              id="cigarros_por_dia"
              name="cigarros_por_dia"
              placeholder=""
              value={objectSave.cigarros_por_dia}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <br></br>
            <input
              type="text"
              className="form-control"
              id="cigarros_por_dia_obs"
              name="cigarros_por_dia_obs"
              placeholder="OBS:"
              value={objectSave.cigarros_por_dia_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="cigarros_por_dia_eh_relevante"
              name="cigarros_por_dia_eh_relevante"
              value={objectSave.cigarros_por_dia_eh_relevante}
              checked={objectSave.cigarros_por_dia_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="numero_de_partos_eh_relevante">
              Cigarros/dia relev.
            </label>
            <br />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <label htmlFor="anos_de_fumante">Anos de fumante</label>
            <input
              type="text"
              className="form-control"
              id="anos_de_fumante"
              name="anos_de_fumante"
              placeholder=""
              value={objectSave.anos_de_fumante}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              type="text"
              className="form-control"
              id="anos_de_fumante_obs"
              name="anos_de_fumante_obs"
              placeholder="OBS:"
              value={objectSave.anos_de_fumante_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="anos_de_fumante_eh_relevante"
              name="anos_de_fumante_eh_relevante"
              value={objectSave.anos_de_fumante_eh_relevante}
              checked={objectSave.anos_de_fumante_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="numero_de_partos_eh_relevante">
              Anos de fumante relev.
            </label>
            <br />
          </div>
          <div className="col-md-2 ">
            <label htmlFor="anos_de_fumante">Condição médica</label>
            <input
              type="text"
              className="form-control"
              id="condicao_medica"
              name="condicao_medica"
              placeholder=""
              value={objectSave.condicao_medica}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              type="text"
              className="form-control"
              id="condicao_medica_obs"
              name="condicao_medica_obs"
              placeholder="OBS:"
              value={objectSave.condicao_medica_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="condicao_medica_eh_relevante"
              name="condicao_medica_eh_relevante"
              value={objectSave.condicao_medica_eh_relevante}
              checked={objectSave.condicao_medica_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="numero_de_partos_eh_relevante">
              Condição médica relev.
            </label>
            <br />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="hepatiteB"
              name="hepatiteB"
              value={objectSave.hepatiteB}
              checked={objectSave.hepatiteB}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Hepatite B</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="relevant_hepatiteB"
              name="relevant_hepatiteB"
              value={objectSave.relevant_hepatiteB}
              checked={objectSave.relevant_hepatiteB}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="name"
              name="hepatiteB_obs"
              placeholder=" OBS:"
              value={objectSave.hepatiteB_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="caxumba"
              name="caxumba"
              value={objectSave.caxumba}
              checked={objectSave.caxumba}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Caxumba</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="caxumba_eh_relevante"
              name="caxumba_eh_relevante"
              value={objectSave.caxumba_eh_relevante}
              checked={objectSave.caxumba_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="caxumba_obs"
              name="caxumba_obs"
              placeholder=" OBS:"
              value={objectSave.caxumba_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="sarampo"
              name="sarampo"
              value={objectSave.sarampo}
              checked={objectSave.sarampo}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Sarampo</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="sarampo_eh_relevante"
              name="sarampo_eh_relevante"
              value={objectSave.sarampo_eh_relevante}
              checked={objectSave.sarampo_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="sarampo_obs"
              name="sarampo_obs"
              placeholder=" OBS:"
              value={objectSave.sarampo_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="hepatite_A"
              name="hepatite_A"
              value={objectSave.hepatite_A}
              checked={objectSave.hepatite_A}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Hepatite A</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="hepatite_A_eh_relevante"
              name="relevant_hepatiteB"
              value={objectSave.hepatite_A_eh_relevante}
              onChange={handleChangeCheckBox}
              checked={objectSave.hepatite_A_eh_relevante}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="hepatite_A_obs"
              name="hepatite_A_obs"
              placeholder=" OBS:"
              value={objectSave.hepatite_A_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="tuberculose"
              name="tuberculose"
              value={objectSave.tuberculose}
              checked={objectSave.tuberculose}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Tuberculose</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="tuberculose_eh_relevante"
              name="tuberculose_eh_relevante"
              value={objectSave.tuberculose_eh_relevante}
              checked={objectSave.tuberculose_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="tuberculose_obs"
              name="tuberculose_obs"
              placeholder=" OBS:"
              value={objectSave.tuberculose_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="herpes_zoster"
              name="herpes_zoster"
              value={objectSave.herpes_zoster}
              checked={objectSave.herpes_zoster}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Herpes Zoster</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="herpes_zoster_eh_relevante"
              name="herpes_zoster_eh_relevante"
              value={objectSave.herpes_zoster_eh_relevante}
              checked={objectSave.herpes_zoster_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="herpes_zoster_obs"
              name="herpes_zoster_obs"
              placeholder=" OBS:"
              value={objectSave.herpes_zoster_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="varicela"
              name="varicela"
              value={objectSave.varicela}
              checked={objectSave.varicela}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Varicela</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="varicela_eh_relevante"
              name="varicela_eh_relevante"
              value={objectSave.varicela_eh_relevante}
              checked={objectSave.varicela_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="varicela_obs"
              name="varicela_obs"
              placeholder=" OBS:"
              value={objectSave.varicela_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="rubeola"
              name="rubeola"
              value={objectSave.rubeola}
              checked={objectSave.rubeola}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Rubéola</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="rubeola_eh_relevante"
              name="rubeola_eh_relevante"
              value={objectSave.rubeola_eh_relevante}
              checked={objectSave.rubeola_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="rubeola_obs"
              name="rubeola_obs"
              placeholder=" OBS:"
              value={objectSave.rubeola_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="covid_19"
              name="covid_19"
              value={objectSave.covid_19}
              checked={objectSave.covid_19}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Covid-19</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="covid_19_eh_relevante"
              name="covid_19_eh_relevante"
              value={objectSave.covid_19_eh_relevante}
              checked={objectSave.covid_19_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="covid_19_obs"
              name="covid_19_obs"
              placeholder=" OBS:"
              value={objectSave.covid_19_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_de_cirurgias"
              name="historico_de_cirurgias"
              value={objectSave.historico_de_cirurgias}
              checked={objectSave.historico_de_cirurgias}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Histórico cirurg</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_de_cirurgias_eh_relevante"
              name="historico_de_cirurgias_eh_relevante"
              value={objectSave.historico_de_cirurgias_eh_relevante}
              checked={objectSave.historico_de_cirurgias_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_de_cirurgias_obs"
              name="historico_de_cirurgias_obs"
              placeholder=" OBS:"
              value={objectSave.historico_de_cirurgias_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_de_alergias"
              name="historico_de_alergias"
              value={objectSave.historico_de_alergias}
              checked={objectSave.historico_de_alergias}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="historico_de_alergias">Hist. Alergias</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_de_alergias_eh_relevante"
              name="historico_de_alergias_eh_relevante"
              value={objectSave.historico_de_alergias_eh_relevante}
              checked={objectSave.historico_de_alergias_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_de_alergias_obs"
              name="historico_de_alergias_obs"
              placeholder=" OBS:"
              value={objectSave.historico_de_alergias_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="problema_de_audicao"
              name="problema_de_audicao"
              value={objectSave.problema_de_audicao}
              checked={objectSave.problema_de_audicao}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Probl. Auditivo</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="problema_de_audicao_eh_relevante"
              name="problema_de_audicao_eh_relevante"
              value={objectSave.problema_de_audicao_eh_relevante}
              checked={objectSave.problema_de_audicao_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="problema_de_audicao_obs"
              name="problema_de_audicao_obs"
              placeholder=" OBS:"
              value={objectSave.problema_de_audicao_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="utiliza_medicacao_com_frequencia"
              name="utiliza_medicacao_com_frequencia"
              value={objectSave.utiliza_medicacao_com_frequencia}
              checked={objectSave.utiliza_medicacao_com_frequencia}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Medicação freq</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="utiliza_medicacao_com_frequencia_eh_relevante"
              name="utiliza_medicacao_com_frequencia_eh_relevante"
              value={objectSave.utiliza_medicacao_com_frequencia_eh_relevante}
              checked={objectSave.utiliza_medicacao_com_frequencia_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="utiliza_medicacao_com_frequencia_obs"
              name="utiliza_medicacao_com_frequencia_obs"
              placeholder=" OBS:"
              value={objectSave.utiliza_medicacao_com_frequencia_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_de_gravidez"
              name="historico_de_gravidez"
              value={objectSave.historico_de_gravidez}
              checked={objectSave.historico_de_gravidez}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="historico_de_alergias">Hist. Gravidez</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_de_gravidez_eh_relevante"
              name="historico_de_gravidez_eh_relevante"
              value={objectSave.historico_de_gravidez_eh_relevante}
              checked={objectSave.historico_de_gravidez_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_de_gravidez_obs"
              name="historico_de_gravidez_obs"
              placeholder=" OBS:"
              value={objectSave.historico_de_gravidez_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="pratica_exercicios_fisicos"
              name="pratica_exercicios_fisicos"
              value={objectSave.pratica_exercicios_fisicos}
              checked={objectSave.pratica_exercicios_fisicos}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Exerc. físico</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="pratica_exercicios_fisicos_eh_relevante"
              name="pratica_exercicios_fisicos_eh_relevante"
              value={objectSave.pratica_exercicios_fisicos_eh_relevante}
              checked={objectSave.pratica_exercicios_fisicos_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="pratica_exercicios_fisicos_obs"
              name="pratica_exercicios_fisicos_obs"
              placeholder=" OBS:"
              value={objectSave.pratica_exercicios_fisicos_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_cancer"
              name="historico_familiar_de_cancer"
              value={objectSave.historico_familiar_de_cancer}
              checked={objectSave.historico_familiar_de_cancer}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Hist. Câncer</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_cancer_eh_relevante"
              name="historico_familiar_de_cancer_eh_relevante"
              value={objectSave.historico_familiar_de_cancer_eh_relevante}
              checked={objectSave.historico_familiar_de_cancer_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_cancer_obs"
              name="historico_familiar_de_cancer_obs"
              placeholder=" OBS:"
              value={objectSave.historico_familiar_de_cancer_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_hipertensao"
              name="historico_familiar_de_hipertensao"
              value={objectSave.historico_familiar_de_hipertensao}
              checked={objectSave.historico_familiar_de_hipertensao}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="historico_de_alergias">Hist. Hipertens</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_hipertensao_eh_relevante"
              name="historico_familiar_de_hipertensao_eh_relevante"
              value={objectSave.historico_familiar_de_hipertensao_eh_relevante}
              checked={
                objectSave.historico_familiar_de_hipertensao_eh_relevante
              }
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_hipertensao_obs"
              name="historico_familiar_de_hipertensao_obs"
              placeholder=" OBS:"
              value={objectSave.historico_familiar_de_hipertensao_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_diabetes"
              name="historico_familiar_de_diabetes"
              value={objectSave.historico_familiar_de_diabetes}
              checked={objectSave.historico_familiar_de_diabetes}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Hist. Diabetes</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_diabetes_eh_relevante"
              name="historico_familiar_de_diabetes_eh_relevante"
              value={objectSave.historico_familiar_de_diabetes_eh_relevante}
              checked={objectSave.historico_familiar_de_diabetes_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_diabetes_obs"
              name="historico_familiar_de_diabetes_obs"
              placeholder=" OBS:"
              value={objectSave.historico_familiar_de_diabetes_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="consumo_de_alcool"
              name="consumo_de_alcool"
              value={objectSave.consumo_de_alcool}
              checked={objectSave.consumo_de_alcool}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Álcool</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="consumo_de_alcool_eh_relevante"
              name="consumo_de_alcool_eh_relevante"
              value={objectSave.consumo_de_alcool_eh_relevante}
              checked={objectSave.consumo_de_alcool_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="consumo_de_alcool_obs"
              name="consumo_de_alcool_obs"
              placeholder=" OBS:"
              value={objectSave.consumo_de_alcool_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_infarto"
              name="historico_familiar_de_infarto"
              value={objectSave.historico_familiar_de_infarto}
              checked={objectSave.historico_familiar_de_infarto}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="historico_familiar_de_infarto">Hist. Infarto</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_infarto_eh_relevante"
              name="historico_familiar_de_infarto_eh_relevante"
              value={objectSave.historico_familiar_de_infarto_eh_relevante}
              checked={objectSave.historico_familiar_de_infarto_eh_relevante}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_infarto_obs"
              name="historico_familiar_de_infarto_obs"
              placeholder=" OBS:"
              value={objectSave.historico_familiar_de_infarto_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_doencas_neurologicas"
              name="historico_familiar_de_doencas_neurologicas"
              value={objectSave.historico_familiar_de_doencas_neurologicas}
              checked={objectSave.historico_familiar_de_doencas_neurologicas}
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Hist. Neurol.</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_doencas_neurologicas_eh_relevante"
              name="historico_familiar_de_doencas_neurologicas_eh_relevante"
              value={
                objectSave.historico_familiar_de_doencas_neurologicas_eh_relevante
              }
              onChange={handleChangeCheckBox}
              checked={
                objectSave.historico_familiar_de_doencas_neurologicas_eh_relevante
              }
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_doencas_neurologicas_obs"
              name="historico_familiar_de_doencas_neurologicas_obs"
              placeholder=" OBS:"
              value={objectSave.historico_familiar_de_doencas_neurologicas_obs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_infarto_agudo_do_miocardio"
              name="historico_familiar_de_infarto_agudo_do_miocardio"
              value={
                objectSave.historico_familiar_de_infarto_agudo_do_miocardio
              }
              checked={
                objectSave.historico_familiar_de_infarto_agudo_do_miocardio
              }
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Hist. Infarto Ag.</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_infarto_agudo_do_miocardio_eh_relevante"
              name="historico_familiar_de_infarto_agudo_do_miocardio_eh_relevante"
              value={
                objectSave.historico_familiar_de_infarto_agudo_do_miocardio_eh_relevante
              }
              checked={
                objectSave.historico_familiar_de_infarto_agudo_do_miocardio_eh_relevante
              }
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_infarto_agudo_do_miocardio_obs"
              name="historico_familiar_de_infarto_agudo_do_miocardio_obs"
              placeholder=" OBS:"
              value={
                objectSave.historico_familiar_de_infarto_agudo_do_miocardio_obs
              }
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_outras_doencas"
              name="historico_familiar_de_outras_doencas"
              value={objectSave.historico_familiar_de_infarto}
              onChange={handleChangeCheckBox}
              checked={objectSave.historico_familiar_de_infarto}
            />{" "}
            &nbsp;
            <label htmlFor="historico_familiar_de_outras_doencas">
              Hist. Outras
            </label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_outras_doencas_eh_relevante"
              name="historico_familiar_de_outras_doencas_eh_relevante"
              value={
                objectSave.historico_familiar_de_outras_doencas_eh_relevante
              }
              checked={
                objectSave.historico_familiar_de_outras_doencas_eh_relevante
              }
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_outras_doencas_obs"
              name="historico_familiar_de_outras_doencas_obs"
              placeholder=" OBS:"
              value={objectSave.historico_familiar_de_outras_doencas_obs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 ">
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_doencas_neurologicas"
              name="historico_familiar_de_doencas_neurologicas"
              value={objectSave.historico_familiar_de_doencas_neurologicas}
              onChange={handleChangeCheckBox}
              checked={objectSave.historico_familiar_de_doencas_neurologicas}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Hist. Neurol.</label>
            <br />
            <input
              className="form-check-input"
              type="checkbox"
              id="historico_familiar_de_doencas_neurologicas_eh_relevante"
              name="historico_familiar_de_doencas_neurologicas_eh_relevante"
              value={
                objectSave.historico_familiar_de_doencas_neurologicas_eh_relevante
              }
              checked={
                objectSave.historico_familiar_de_doencas_neurologicas_eh_relevante
              }
              onChange={handleChangeCheckBox}
            />{" "}
            &nbsp;
            <label htmlFor="hepatite">Relevante?</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="historico_familiar_de_doencas_neurologicas_obs"
              name="historico_familiar_de_doencas_neurologicas_obs"
              placeholder=" OBS:"
              value={objectSave.historico_familiar_de_doencas_neurologicas_obs}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
