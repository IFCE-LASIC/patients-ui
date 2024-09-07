import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  GET_UNIQUE_SAMPLE,
  SAVE_LABELED_SAMPLES,
} from "../constants/endpoints";
import axios from "axios";
import {
  ERROR,
  ERROR_MESSAGE,
  SUCCESS,
  SUCCESS_MESSAGE,
} from "../constants/message";
import { showAlertError, showAlertSuccess } from "../layout/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { mountHeader } from "../constants/config";
import { defaultObject } from "../constants/defaultObjects";

export default function Details() {
  const { crm } = useParams();
  const location = useLocation();
  const [idEntity, setIdEntity] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogEmptyFields, setShowDialogEmptyFields] = useState(false);
  const [objectSave, setObjectSave] = useState(defaultObject);
  const [showDialogHash, setShowDialogHash] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let execution = 0;

  useEffect(() => {
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
    if (
      (objectSave.risco_sim || objectSave.risco_nao) &&
      !!objectSave.grau_certeza
    ) {
      setShowDialog(true);
    } else {
      mountMessageErro();
      setShowDialogEmptyFields(true);
    }
  };

  const mountMessageErro = () => {
    let messageBuild = "Por favor, ";
    if (!(objectSave.risco_sim || objectSave.risco_nao)) {
      messageBuild += 'rotular o risco cardiológico em "SIM" ou "NÃO".';

      if (!objectSave.grau_certeza) {
        messageBuild += " Insira o grau de certeza.";
      }
    } else if (!objectSave.grau_certeza) {
      messageBuild += "insira o grau de certeza.";
    }

    setMessage(messageBuild);
  };
  const saveObject = () => {
    let objectToSave = objectSave;
    objectToSave.id = idEntity;
    objectToSave.crm = crm;
    objectSave.risco = objectSave.risco_sim ? 1 : 0;
    handleClose();

    axios
      .post(
        SAVE_LABELED_SAMPLES,
        objectToSave,
        mountHeader(localStorage.getItem("hash"))
      )
      .then((response) => {
        showAlertSuccess(SUCCESS, SUCCESS_MESSAGE);
        navigate(`/patients/${crm}`);
        localStorage.setItem("saved", true);
      })
      .catch(function (error) {
        showAlertError(ERROR, ERROR_MESSAGE);
      });
  };

  const handleChange = (e) =>
    setObjectSave({
      ...objectSave,
      [e.target.name]: e.target.value.toUpperCase(),
    });

  const handleChangeNumber = (e) =>
    setObjectSave({
      ...objectSave,
      [e.target.name]: Number(e.target.value),
    });
  const handleChangeCheckBox = (e) => {
    setObjectSave({ ...objectSave, [e.target.name]: e.target.checked });
  };

  const handleRisc = (e) => {
    let isRiscYes = e.target.name === "risco_sim";
    setRelevantDefaultValues(isRiscYes);
    if (isRiscYes) {
      objectSave.risco_nao = false;
    } else {
      objectSave.risco_sim = false;
    }
    handleChangeCheckBox(e);
  };

  const getSample = () => {
    axios
      .get(GET_UNIQUE_SAMPLE, mountHeader(localStorage.getItem("hash")))
      .then((response) => {
        response.data.risc = response.data.risc == 1;
        setIdEntity(response.data._id);
        setObjectSave(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setShowDialogHash(true);
          localStorage.removeItem("hash");
        }
      });
  };

  const getTooltip = (name) => {
    return <Tooltip id="button-tooltip">{name}</Tooltip>;
  };

  const handleCloseHash = () => setShowDialogHash(false);

  const setRelevantDefaultValues = (flag) => {
    objectSave.IMC_eh_relevante = flag;
    objectSave.PRESSAO_ARTERIAL_eh_relevante = flag;
    objectSave.PRESSAO_ARTERIAL_PAD_eh_relevante = flag;
    objectSave.PRESSAO_ARTERIAL_PAS_eh_relevante = flag;
    objectSave.utiliza_medicacao_com_frequencia_eh_relevante = flag;
    objectSave.pratica_exercicios_fisicos_eh_relevante = flag;
    objectSave.fumante_eh_relevante = flag;
    objectSave.cigarros_por_dia_eh_relevante = flag;
    objectSave.anos_de_fumante_eh_relevante = flag;
    objectSave.historico_familiar_de_hipertensao_eh_relevante = flag;
    objectSave.historico_familiar_de_diabetes_eh_relevante = flag;
    objectSave.historico_familiar_de_infarto_eh_relevante = flag;
    objectSave.historico_familiar_de_infarto_agudo_do_miocardio_eh_relevante =
      flag;
  };
  return (
    <div className="container">
      <div className="back-button">
        <OverlayTrigger placement="bottom" overlay={getTooltip("Voltar")}>
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
            <thead className="t-header">
              <th scope="col">Atributo</th>
              <th scope="col" className="valor">
                Valor
              </th>
              <th scope="col" className="relevante">
                Relevante?
              </th>
              <th scope="col">Observação</th>
            </thead>
            <tbody>
              {objectSave?.features?.map((object) => (
                <tr>
                  <td>{object.label.toUpperCase()}</td>
                  <td>
                    {" "}
                    {typeof object.value === "boolean" ? (
                      object.value ? (
                        "SIM"
                      ) : (
                        "NÃO"
                      )
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
                      checked={
                        object[`${object.feature}_eh_relevante`] ||
                        objectSave[`${object.feature}_eh_relevante`]
                      }
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
            </tbody>
          </table>
        </div>
        <br />
        <div className=" row form " style={{ paddingTop: "1.5vh" }}>
          <div className="col-md-3">
            <label htmlFor="hepatite" className="required">
              Risco cardiológico?
            </label>
            <br />
            <input
              className="form-check-input checkbox-border"
              type="checkbox"
              id="risco_sim"
              name="risco_sim"
              value={objectSave.risco_sim}
              onChange={handleRisc}
              checked={objectSave.risco_sim}
            />{" "}
            &nbsp; SIM &nbsp; &nbsp;
            <input
              className="form-check-input checkbox-border"
              type="checkbox"
              id="risco_nao"
              name="risco_nao"
              value={objectSave.risco_nao}
              checked={objectSave.risco_nao}
              onChange={handleRisc}
            />{" "}
            &nbsp; NÃO
          </div>
          <div className="col-md-2">
            <label className="required">Grau de certeza:</label>
            <Form.Select name="grau_certeza" onChange={handleChangeNumber}>
              <option></option>
              <option value={1}>BAIXO</option>
              <option value={2}>MÉDIO</option>
              <option value={3}>ALTO</option>
            </Form.Select>
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
            <br />
          </div>
          <div className="col-md-1 margin-button-save">
            <OverlayTrigger placement="bottom" overlay={getTooltip("Salvar")}>
              <Button
                variant="success"
                className="button-success"
                replace
                onClick={validateFields}
              >
                {" "}
                <SaveIcon />
              </Button>
            </OverlayTrigger>
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
          Você selecionou a opção {objectSave.risco_sim ? '"SIM"' : '"NÃO"'}{" "}
          para risco cardiológico. Deseja confirmar?
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
          <Modal.Title>Validação</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
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

      <Modal
        size="md"
        show={showDialogHash}
        onHide={handleCloseHash}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Hash inválido</Modal.Title>
        </Modal.Header>
        <Modal.Body>Por favor, insira um novo hash válido.</Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button variant="success" className="button-success" replace>
              OK
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
