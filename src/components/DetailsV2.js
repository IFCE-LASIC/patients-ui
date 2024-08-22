import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Link, redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import {
  GET_UNIQUE_SAMPLE,
  SAVE_LABELED_SAMPLES,
} from "../constants/endpoints";
import { HEADER } from "../constants/config";
import axios from "axios";
import {
  ERROR,
  ERROR_MESSAGE,
  SUCCESS,
  SUCCESS_MESSAGE,
} from "../constants/message";
import { showAlertError, showAlertSuccess } from "../layout/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { Modal, ModalBody, OverlayTrigger, Tooltip } from "react-bootstrap";

const defaultObject = {
  id: "",
  hepatiteB: false,
  crm: "",
  hepatiteB_obs: "",
  relevant_hepatiteB: false,
  risco: 0,
  risco_sim: null,
  risco_nao: null,
  obs_geral: "",
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
  quais_valor_obtido_em_exame_sao_relevantes: "",
}
export default function DetailsV2() {
  const { crm } = useParams();
  const location = useLocation();
  const [idEntity, setIdEntity] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogEmptyFields, setShowDialogEmptyFields] = useState(false);
  const [checked, setChecked] = useState(false);
  const [objectSave, setObjectSave] = useState(defaultObject);
  const [refresh, setRefresh] = React.useState(0)
  const navigate = useNavigate();

  let execution = 0;
  const [valor, setValor] = useState("");
  useEffect(() => {
    console.log(execution)
    if (execution === 0) {
     getSample();
     execution = 1;
    }
  }, []);

  const show = () => {
    console.log(objectSave);
  };

  const handleClose = () => setShowDialog(false);

  const handleCloseEmptyFields = () => setShowDialogEmptyFields(false);

  const validateFields = () => {
    if(objectSave.risco_sim || objectSave.risco_nao){
      setShowDialog(true);
    } else {
      setShowDialogEmptyFields(true);
    }
  };
  
  const saveObject = () => {
    let objectToSave = objectSave;
    objectToSave.id = idEntity;
    objectToSave.crm = crm;
    objectSave.risco = objectSave.risco_sim ? 1 : 0;
    handleClose()
    console.log(objectSave);
    
    axios
      .post(SAVE_LABELED_SAMPLES, objectToSave, HEADER)
      .then((response) => {
        showAlertSuccess(SUCCESS, SUCCESS_MESSAGE);
        navigate(`/patients/${crm}`);
      })
      .catch(function (error) {
        showAlertError(ERROR, ERROR_MESSAGE);
      });
  }


  const handleChange = (e) =>
    setObjectSave({
      ...objectSave,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  const handleChangeCheckBox = (e) => {
    setObjectSave({ ...objectSave, [e.target.name]: e.target.checked });
  };

  const handleRisc = (e) => {
    // console.log(e.target.name);
    if(e.target.name === 'risco_sim'){
      objectSave.risco_nao = false
    } else {
      objectSave.risco_sim = false;
    }
    handleChangeCheckBox(e);
  }

  const getSample = () => {
      axios.get(GET_UNIQUE_SAMPLE, HEADER).then((response) => {
        response.data.risc = response.data.risc == 1;
        setIdEntity(response.data._id);
        setObjectSave(response.data);
      });
  }

  const afterSave = () => {
    
    redirect(`/patients`)
  //  forceUpdate();
  //   window.location.reload();
  
    // forceUpdate();
  }

  const getTooltip = (name) => {
    return <Tooltip id="button-tooltip">{name}</Tooltip>
  }
  return (
    <div className="container">
      <div className="back-button">
        <OverlayTrigger
          placement="bottom"
          overlay={getTooltip('Voltar')}
        >
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
        </OverlayTrigger>
      </div>
      <div className="save-position">
        <OverlayTrigger
          placement="bottom"
          overlay={getTooltip('Salvar')}
        >
          <Button
            variant="success"
            className="button-success"
            replace
            onClick={(validateFields)}
          >
            {" "}
            <SaveIcon />
          </Button>
        </OverlayTrigger>
      </div>
      <table className="table table-stripped margin-top-title">
        <thead>
          <th scope="col">Pessoa</th>
          <th scope="col">Idade</th>
          <th scope="col">Data</th>
          <th scope="col">Sexo</th>
        </thead>
        <tbody>
          <tr>
            <td> {objectSave.pessoa}</td>
            <td>{objectSave.idade}</td>
            <td>{objectSave.data.split("-").reverse().join("/")}</td>
            <td>{objectSave.sexo}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <form>
        <div className="table-details">
          <table className="table table-stripped">
            <thead>
              <th scope="col">Atributo</th>
              <th scope="col" className="valor">Valor</th>
              <th scope="col" className="relevante">Relevante?</th>
              <th scope="col">Observação</th>
            </thead>
            <tbody>
              {objectSave?.features?.map((object) => (
                <tr>
                  <td>{object.label.toUpperCase()}</td>
                  <td>
                    {" "}
                    {typeof object.value === "boolean" ? (
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={object.feature}
                        name={object.feature}
                        value={object.value}
                        onChange={handleChangeCheckBox}
                        defaultValue={object.value}
                        defaultChecked={object.value}
                        disabled={true}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control width-input"
                        id={object.feature}
                        name={object.feature}
                        value={object.value}
                        onChange={handleChange}
                        disabled={true}
                      />
                    )}
                  </td>
                  <td>
                    {" "}
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`${object.feature}_eh_relevante`}
                      name={`${object.feature}_eh_relevante`}
                      value={object.relevant}
                      checked={object.relevant}
                      onChange={handleChangeCheckBox}
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control uppercase"
                      id={object.feature}
                      name={`${object.feature}_obs`}
                      value={object.obs}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}

              {/* <tr>
                
                <td>aaa</td>
                <td>aaa</td>
                <td>aaa</td>
                <td>aaa</td>
                </tr>
                <tr>
                <th scope="row">1</th>
                <td>aaa</td>
                <td>aaa</td>
                <td>aaa</td>
                <td>aaa</td>
                </tr> */}
            </tbody>
          </table>
        </div>
        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-3">
            <label htmlFor="hepatite">Risco cardiológico?</label>
            <br />
            <input
              className="form-check-input checkbox-border"
              type="checkbox"
              id="risco_sim"
              name="risco_sim"
              value={objectSave.risco_sim}
              onChange={handleRisc}
              checked={objectSave.risco_sim}
            /> &nbsp; SIM
            &nbsp;
            &nbsp;
             <input
              className="form-check-input checkbox-border"
              type="checkbox"
              id="risco_nao"
              name="risco_nao"
              value={objectSave.risco_nao}
              checked={objectSave.risco_nao}
              onChange={handleRisc}
            /> &nbsp; NÃO
          </div>
          <div className="col-md-4">
            <textarea
              className="form-control textarea-size uppercase"
              placeholder="Observação geral"
              id="obs_geral"
              name="obs_geral"
              value={objectSave.obs_geral}
              onChange={handleChange}
            ></textarea>
            &nbsp;
            <br />
          </div>
        </div>
      </form>
      <Modal
       size="sm"
       show={showDialog}
       onHide={handleClose}
       backdrop="static"
       keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você selecionou a opção { objectSave.risco_sim ? '"SIM"' : '"NÃO"'} para risco cardiológico. Deseja confirmar?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
        <Button
              variant="success"
              className="button-success"
              replace
              onClick={saveObject}
            >
              Confirmar
            </Button>{" "}
        </Modal.Footer>
      </Modal>

      <Modal
       size="md"
        show={showDialogEmptyFields}
       onHide={handleCloseEmptyFields}
       backdrop="static"
       keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Validação - Risco cardiológico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por favor, rotular o risco cardiológico em "SIM" ou "NÃO".
        </Modal.Body>
        <Modal.Footer>
        <Button
              variant="success"
              className="button-success"
              replace
              onClick={handleCloseEmptyFields}
            >
              OK
            </Button>{" "}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
